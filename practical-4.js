// practical-4.js - Embedding Ocean Products in your website.
//
// The four URLs used by tabs 1 to 4 are right below. Change them and save the
// file, and the browser will reload with your URL.
// To try a URL without editing code, use the Practical tab instead.

// Chart.js is installed by npm, so we import it from node_modules.
import Chart from 'chart.js/auto'

// The tabs, the "Show code" buttons and the "Open in new tab" buttons work the
// same way on every practical page, so they live in shared.js.
import { setupTabs, setupCodeButtons, setupOpenButtons } from './shared.js'


// ============================================================
// STEP 1 - the URL used by the "Tide Gauge Data" tab
// ============================================================
const DATA_URL = 'https://ocean-obs-api.spc.int/insitu/get_data/station/fong?limit=1000'


// ============================================================
// STEP 2 - the URL used by the "Ocean Map Image" tab
// ============================================================
const IMAGE_URL = 'https://ocean-plotter.spc.int/plotter/getMap?region=6&layer_map=5&time=2026-08-02T00:00:00Z&unit=metric&use_cache=True&token=null'


// ============================================================
// STEP 3 - the URL used by the "Tide Calendar" tab
// ============================================================
const PDF_URL = 'https://ocean-library.spc.int/library/media/b4da9347d92b480e882f63fc583d680e_pdf.pdf'


// ============================================================
// STEP 4 - the URL used by the "Embed a Web Page" tab
//          The share= part is a saved explorer view, so the map opens on the
//          layers and place we chose. Make your own by using the Ocean Portal
//          explorer, then copying its share link out of the address bar.
// ============================================================
const PAGE_URL = 'https://oceanportal.spc.int/explorer?share=N4IgNghgngpgTgZxALgNqgJYBMUGYA0408A+hgHYBmA9nALYQAuG15KmOyALIZLHCWaMwMFCAByMCHAAEAJSlgZAFQx0YMgD4yAwrQhKAQiIgBjABYUA5jICCIuIxC9iAxlAAOo5CADqAWQBlZxAAVzgwMXNGRg8EZAB6BOpTKXIAWkZzOBgsLAQABgBGADoED1MSikYErJy8hASAdzpGgAUAeTaEumosGDAEnKsWcgME8moICAnHBKwIDDAoBNN9MBIAIxMLawTIRhgERhLyUzpI3hgrGHIsEnDIn2jY+KSUtPSPMGoY+DKKlVyDVvr9DnAEgBxGCMAAy11uWEhcAgHkspgA-HxSAwPABeLgAMl6-TxaxRG22Ul25CsxIoJDWPzgeNwACYSgBWYkQAAejOozNZAHYSgVCccYPiClzCUzaHiAFYwwmhcgYRh4jweJyEW4QKmcRhwUIwQgIAYwUyHLCBaiUaTKTxHFCoAC65q8pgwlAwpkEaiOhzocRQ5FCYDAhGq8AAbgYSJKPGIiiEvHAWJwQDoOv5-LYQsx1ABJYFxgyBRjSJw+IoATgAHJz0gVcOk2ZzlAUCshu72CgAtQuB0vg+NgACidzEbIKbIAbC2Gy2il2e33u0PCEWYKPy2BK9WOhmRmMniB602W22O2v+-2tyAd3u4OOp1hjxhTwYZ3PFwVl2KO8N0HEIMAQAN1AtDMXWQB0wAtaMILWENqAQDVvHgxCiH4EgxnUMQqTMSxaRIAx4EYMicggEJjigEQxHJAx0nIxx0l9M8EjiUJ0ljDAMywcCQmoDwzA1KAUCKQh5XoCgUAKaTBVoBheRQTlCANahYxgFSZLEGBeUOadCE2AZqBaCg9J8AyjJwQhwzoGTNggO4kGQDsFPAagrAQUxyJQY1TUIAAvahqDoZRqFhVwApNM0QAWQ4dxIGh6CYMQABFbGLWEAE0QhyY4M2tXIUCw+Kd2gjAjgeCIwwjKMQBQjw0IwkhsQEbB6sjPUxipEgbko3FYtNABfXqDREI04sIESxPcSTzUtErbXtR1nTc91Ro9EBhuQUBUjLOBXXSXAxXnIpOSKYV52FYU2SbB6CnnfB0iKec6y5btvp+775x20LwpQHgQE2ag1XydgQAQcGshQdsOVwYUmyKethVbDs6wIEAmiDeHZzOht505NlcC4JGuDrKm7vs2g4eQd6SnnZ77rugCHtwbGpGOeGilwTkSj5rgbs5ecPO7a7RvGkB7UoHQXPjNzMAQAA1cCMCpMqDGw0xwhyYFi04cMeuh5abWUA0AGkYAknwq02LgQGltZaEEsZDiV6XhlGMR52HKCqxDX8FyXFsuC7IpezrZBcFKWPOSHUagA'


// ------------- nothing below here needs changing -------------


// ---------------------------------------------------------------
// 1. The page furniture: tabs, "Show code" and "Open in new tab" buttons
// ---------------------------------------------------------------
setupTabs()
setupCodeButtons()
setupOpenButtons()


// ---------------------------------------------------------------
// 2. Draw a chart from one of the observation stations
//
//    This one function is used by tab 1 on page load and by the Plot data
//    button on the Practical tab, so the ids it writes into are arguments.
//
//    Tide gauges and wave buoys name their measurements differently, so
//    "field" says which one to draw. These are the names the API uses:
// ---------------------------------------------------------------
const AXIS_LABELS = {
  'sea_level (m)': 'Sea level (m)',
  'significant_wave_height': 'Significant wave height (m)',
  'peak_wave_period': 'Peak wave period (s)'
}

// Chart.js will not draw twice on the same canvas, so we keep each chart we
// make and throw the old one away before drawing a new one.
const existingCharts = {}

async function drawTideChart(url, field, canvasId, statusId, titleId) {
  const status = document.getElementById(statusId)
  status.textContent = 'Loading data...'

  try {
    // Ask the API for the data and read it as JSON
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error('the server replied ' + response.status)
    }
    const result = await response.json()

    // Show the station name that came back with the data
    document.getElementById(titleId).textContent = result.display_name

    // Sort oldest first so the line reads left to right in time.
    // (Tide gauges send newest first, wave buoys send oldest first.)
    const records = result.data.slice().sort((a, b) => a.time < b.time ? -1 : 1)

    // If this station does not have the measurement we asked for - because
    // someone typed a different station into the box - use its first one.
    let column = field
    if (records[0][column] === undefined) {
      const ignore = ['time', 'lon_deg', 'lat_deg']
      column = Object.keys(records[0]).find(k => !ignore.includes(k))
    }

    // Throw away error readings (tide gauges mark these as -999)
    const badValue = Number(result.bad_data)
    const good = records.filter(r => r[column] !== badValue && r[column] !== null)

    // Split into labels (x axis) and values (y axis)
    const labels = good.map(r => r.time.slice(0, 16).replace('T', ' '))
    const values = good.map(r => r[column])

    // Remove the previous chart from this canvas, if there was one
    if (existingCharts[canvasId]) {
      existingCharts[canvasId].destroy()
    }

    // On the Practical tab the canvas starts hidden, so reveal it
    document.getElementById(canvasId).hidden = false

    // Draw the line chart and remember it
    existingCharts[canvasId] = new Chart(document.getElementById(canvasId), {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: AXIS_LABELS[column] || column,
          data: values,
          borderColor: '#2a78d6',
          borderWidth: 2,
          pointRadius: 0,          // up to 1000 points, so no dots
          tension: 0.1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false }   // only one line, the heading names it
        },
        scales: {
          x: {
            title: { display: true, text: 'Time (UTC)' },
            ticks: { maxTicksLimit: 10 },
            grid: { color: '#e1e0d9' }
          },
          y: {
            title: { display: true, text: AXIS_LABELS[column] || column },
            grid: { color: '#e1e0d9' }
          }
        }
      }
    })

    status.textContent = `${good.length} readings loaded.`

  } catch (error) {
    // If the URL is wrong or the network fails, say so on the page
    status.textContent = 'Could not load the data: ' + error.message
  }
}


// ---------------------------------------------------------------
// 3. Show a map picture
//    Setting the image's src makes the browser fetch that URL for us.
//    That is all it takes to put another website's picture on our page.
// ---------------------------------------------------------------
function showMapImage(url, imageId, statusId) {
  const image = document.getElementById(imageId)
  const status = document.getElementById(statusId)

  status.textContent = 'Loading image, this can take a few seconds...'

  // On the Practical tab the image starts hidden, so reveal it
  image.hidden = false

  // The load event tells us the picture has arrived
  image.onload = () => {
    status.textContent = 'Image loaded from the plotter service.'
  }

  // If the URL is wrong the picture never arrives, so say so
  image.onerror = () => {
    status.textContent = 'Could not load that image. Check the URL.'
    image.hidden = true
  }

  image.src = url
}


// ---------------------------------------------------------------
// 4. Show a PDF two ways: as a link, and embedded in the page
//
//    The link needs target="_blank" in the HTML to open in a new tab.
//    Here we only fill in where it points.
// ---------------------------------------------------------------
function showPdf(url, frameId, linkId, statusId) {
  const frame = document.getElementById(frameId)
  const link = document.getElementById(linkId)
  const status = document.getElementById(statusId)

  // Way 1 - point the link at the PDF
  link.href = url
  link.hidden = false

  // The button beside the link reads its href, so reveal it at the same time
  const openButton = document.querySelector(`.open-button[data-link="${linkId}"]`)
  if (openButton) {
    openButton.hidden = false
  }

  // Way 2 - put the PDF inside an iframe. The browser's own PDF viewer
  // takes over from there, which is why this one is not an <img>.
  frame.hidden = false
  frame.src = url

  status.textContent = 'Tide calendars are large files, so give it a moment to appear.'
}


// ---------------------------------------------------------------
// 5. Embed a whole web page
//
//    Deliberately the same shape as showPdf above, because to the browser it
//    is the same job: an iframe is given an address and loads whatever is
//    there. The one difference worth teaching is at the end.
// ---------------------------------------------------------------
function showWebPage(url, frameId, linkId, statusId) {
  const frame = document.getElementById(frameId)
  const link = document.getElementById(linkId)
  const status = document.getElementById(statusId)

  // A link out, for the same reason as the PDF - and see the note below
  link.href = url
  link.hidden = false

  const openButton = document.querySelector(`.open-button[data-link="${linkId}"]`)
  if (openButton) {
    openButton.hidden = false
  }

  frame.hidden = false
  frame.src = url

  status.textContent = 'Loading the page...'

  // A site can refuse to be embedded: it sends a header (X-Frame-Options, or
  // Content-Security-Policy: frame-ancestors) naming who may frame it, and
  // the browser obeys. The refusal is silent - the load event still fires and
  // we are not allowed to look inside the frame to check - so we cannot detect
  // it in code. That is why the wording below is careful, and why the link
  // above matters: it is the way through when framing is refused.
  frame.onload = () => {
    status.textContent = 'Page loaded. If the box below is blank, this site does '
                       + 'not allow being embedded - use the link instead.'
  }
}


// ---------------------------------------------------------------
// 6. Tabs 1 to 4 - show the four URLs from the top of this file
// ---------------------------------------------------------------
drawTideChart(DATA_URL, 'sea_level (m)', 'tide-chart', 'chart-status', 'station-name')
showMapImage(IMAGE_URL, 'ocean-map', 'map-status')
showPdf(PDF_URL, 'calendar-pdf', 'calendar-link', 'calendar-status')
showWebPage(PAGE_URL, 'ocean-explorer', 'explorer-link', 'webpage-status')


// ---------------------------------------------------------------
// 7. Practical tab - the buttons that show whatever URL was typed
// ---------------------------------------------------------------

// Step 1: read the dropdown and the box, then draw the chart
document.getElementById('try-data-button').addEventListener('click', () => {
  const url = document.getElementById('try-data-url').value.trim()

  // The dropdown value is the name of the measurement to plot
  const field = document.getElementById('try-type').value

  if (url === '') {
    document.getElementById('try-data-status').textContent = 'Please paste a URL first.'
    return
  }

  drawTideChart(url, field, 'try-chart', 'try-data-status', 'try-station-name')
})

// Step 2: read the box, then show the picture
document.getElementById('try-image-button').addEventListener('click', () => {
  const url = document.getElementById('try-image-url').value.trim()

  if (url === '') {
    document.getElementById('try-image-status').textContent = 'Please paste a URL first.'
    return
  }

  showMapImage(url, 'try-map', 'try-image-status')
})

// Step 3: read the box, then show the PDF as a link and embedded
document.getElementById('try-pdf-button').addEventListener('click', () => {
  const url = document.getElementById('try-pdf-url').value.trim()

  if (url === '') {
    document.getElementById('try-pdf-status').textContent = 'Please paste a URL first.'
    return
  }

  showPdf(url, 'try-pdf', 'try-pdf-link', 'try-pdf-status')
})

// Step 4: read the box, then show the whole page embedded
document.getElementById('try-page-button').addEventListener('click', () => {
  const url = document.getElementById('try-page-url').value.trim()

  if (url === '') {
    document.getElementById('try-page-status').textContent = 'Please paste a URL first.'
    return
  }

  showWebPage(url, 'try-page', 'try-page-link', 'try-page-status')
})
