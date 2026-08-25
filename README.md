# 03 - Embedding Content to Web

A small web page with five tabs, showing four ways to put content from another
website on your own page: fetch **data** and draw a chart, show a finished
**picture**, embed a **PDF**, or embed a whole **web page**.

## Setup

Run these once, in this folder:

```
npm install
npm start
```

Then open the address it prints, normally <http://localhost:5173>.

Leave it running while you work. Every time you save `main.js` the browser
reloads on its own.

To stop the server, press `Ctrl` + `C` in the terminal.

## The six tabs

1. **Tide Gauge Data** - a chart of sea level at Fongafale, Tuvalu. Built by
   fetching JSON from the ocean-obs API and drawing it with Chart.js. This is
   the only tab that parses anything.
2. **Ocean Map Image** - a finished map picture from the ocean-plotter service,
   shown in an `<img>`. No fetch: setting `src` is the whole job.
3. **Tide Calendar** - a PDF, shown twice over: as a link that opens in a new
   tab, and embedded in the page with an `<iframe>`.
4. **Embed a Web Page** - the Ocean Portal explorer running inside an
   `<iframe>`, still fully clickable.
5. **Metadata practical** - participants complete a simple metadata record for
   one automatic weather station, including location, time coverage, variables,
   organisation, access and licence. The completed record can be downloaded as
   JSON.
6. **Practical** - the hands-on part, set apart in green. Four boxes where
   participants paste their own URL and press a button to see it there and
   then. No code editing needed.

Each of tabs 1 to 4 has a **Show code** button holding the few lines that make
that tab work, with the packages needed named at the top. Useful for walking
through one tab at a time without switching to an editor.

Tabs 1 to 4 all load as soon as the server starts, so you have something to
show before the exercises begin.

## The exercises

On the **Practical** tab:

| Exercise | What participants do |
|----------|----------------------|
| 1 | Change the station code in the data URL and press **Plot data** |
| 2 | Change the date or country in the map URL and press **Show image** |
| 3 | Paste a tide calendar PDF address and press **Show PDF** |
| 4 | Paste any page address and press **Show page** |

Station codes that work: `fong` (Tuvalu), `viti` (Fiji, Suva), `tara`
(Kiribati, Tarawa), `luga` (Vanuatu, Luganville), `lomb` (PNG, Manus Is),
`nuku` (French Polynesia, Marquesas).

Country numbers for the `region=` part of the map URL are listed at
<https://ocean-middleware.spc.int/middleware/api/country/?format=json>.

The four URLs that tabs 1 to 4 display live at the top of `main.js`
(`DATA_URL`, `IMAGE_URL`, `PDF_URL` and `PAGE_URL`), for anyone who wants to
change what the page shows on load.

## The files

| File | What it is |
|------|------------|
| `index.html` | The page: the five tabs, their contents and the code blocks |
| `main.js` | The four default URLs, tab switching, the chart and the iframes |
| `style.css` | The styling |
| `package.json` | The npm commands and the one dependency, Chart.js |

## Commands

| Command | What it does |
|---------|--------------|
| `npm start` | Start the development server (same as `npm run dev`) |
| `npm run build` | Make a production copy in `dist/` |
| `npm run preview` | Serve the built copy from `dist/` |

## Troubleshooting

**`npm error Missing script: "vite"`** - the command is `npm start` or
`npm run dev`, not `npm run vite`.

**`command not found: npm`** - Node.js is not installed. Get it from
<https://nodejs.org>.

**"Could not load the data: the server replied 404"** - that station code does
not exist. Use one from the list above.

**The map stays blank** - the plotter can take several seconds for a large map.
Wait before trying another URL.

**An embedded web page stays blank** - that site has told the browser it will
not be framed, using `X-Frame-Options` or `Content-Security-Policy:
frame-ancestors`. Nothing in your page can override it, which is why tabs 3, 4
and the Practical also offer a plain link. Worth demonstrating on purpose.

**Port already in use** - another copy is still running. Stop it with
`Ctrl` + `C`, or use a different port: `npm start -- --port 5199`.
