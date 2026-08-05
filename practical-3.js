// practical-3.js - API Integration.
//
// Everything here is fetch, which is built into the browser - no packages
// needed.

import { setupTabs, setupCodeButtons, setupCopyButtons } from './shared.js'

// Prism does the syntax colouring on the editable code block below. The core
// knows no languages on its own, and javascript itself extends clike.
import Prism from 'prismjs'
import 'prismjs/components/prism-clike'
import 'prismjs/components/prism-javascript'

// Chart.js draws the chart in Step 3, the same way Practical 4 does it.
// Exposed as a global too, so the runnable code block below can use it -
// new Function bodies run in the global scope, not this module's scope.
import Chart from 'chart.js/auto'
window.Chart = Chart


// ---------------------------------------------------------------
// 1. The page furniture: tabs and the "Show code" button
// ---------------------------------------------------------------
setupTabs()
setupCodeButtons()
setupCopyButtons()


// ---------------------------------------------------------------
// 2. Editable, runnable code blocks - Tab 2's widget and Tab 3's chart
//
//    Both are real, runnable JavaScript rather than just an illustration, so
//    instead of showing what a run would look like, the page can actually
//    run whatever ends up in the box.
// ---------------------------------------------------------------
function setupRunnableCode(codeId, resetId, runId, statusId) {
  const codeElement = document.querySelector('#' + codeId + ' code')
  const originalCode = codeElement.textContent
  const status = document.getElementById(statusId)

  function colour() {
    Prism.highlightElement(codeElement)
  }

  colour()

  // contenteditable is all it takes to make an element typable
  codeElement.contentEditable = 'true'
  codeElement.spellcheck = false

  // Clicking away means the edit is finished, so it is safe to re-colour
  codeElement.addEventListener('blur', colour)

  document.getElementById(resetId).addEventListener('click', () => {
    codeElement.textContent = originalCode
    colour()
  })

  document.getElementById(runId).addEventListener('click', async () => {
    status.textContent = 'Running your code...'

    try {
      // new Function gives the pasted code a fresh scope every time, so
      // running it twice never trips over "already declared" from the first run
      const run = new Function(
        'return (async () => {\n' + codeElement.textContent + '\n})()'
      )
      await run()
      status.textContent = 'Ran without error - see above.'

    } catch (error) {
      status.textContent = 'Your code did not run: ' + error.message
    }
  })
}

setupRunnableCode('widget-code', 'widget-reset', 'widget-run', 'widget-status')
setupRunnableCode('chart-code', 'chart-reset', 'chart-run', 'try-status-3')


// ---------------------------------------------------------------
// 3. Tab 3 - call any URL
//
//    One function for each step's box, since both do exactly the same
//    thing: fetch whatever address is in their input, and show the reply as
//    JSON if it can be parsed as JSON, or as plain text if it cannot.
// ---------------------------------------------------------------
function setupUrlCaller(id) {
  const urlBox = document.getElementById('try-url-' + id)
  const status = document.getElementById('try-status-' + id)
  const output = document.getElementById('try-json-' + id)

  document.getElementById('try-button-' + id).addEventListener('click', async () => {
    status.textContent = 'Asking the API...'
    output.hidden = true

    try {
      const response = await fetch(urlBox.value.trim())

      if (!response.ok) {
        throw new Error('the server replied ' + response.status)
      }

      const text = await response.text()

      try {
        output.querySelector('code').textContent = JSON.stringify(JSON.parse(text), null, 2)
      } catch {
        output.querySelector('code').textContent = text
      }

      output.hidden = false
      status.textContent = 'Got a reply.'

    } catch (error) {
      status.textContent = 'Could not reach that URL: ' + error.message
    }
  })
}

setupUrlCaller('1')
setupUrlCaller('2')


// ---------------------------------------------------------------
// 4. Tab 3, Step 3 - the same data, drawn as a chart
//
//    Loads as soon as the page opens, the same way Practical 4's Tide Gauge
//    Data tab does - see the "Show code" button for the four lines that do it.
// ---------------------------------------------------------------
const CHART_URL = 'https://ocean-obs-api.spc.int/insitu/get_data/station/auasi?limit=1000'

async function drawChart(url) {
  const status = document.getElementById('try-status-3')
  const canvas = document.getElementById('try-chart-3')

  try {
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error('the server replied ' + response.status)
    }

    const result = await response.json()

    document.getElementById('try-station-name-3').textContent = result.display_name

    // Oldest first, so the line reads left to right in time
    const records = result.data.slice().sort((a, b) => a.time < b.time ? -1 : 1)

    // Tide gauges mark error readings with a fixed bad-data value - drop them
    const badValue = Number(result.bad_data)
    const good = records.filter(r => r['sea_level (m)'] !== badValue && r['sea_level (m)'] !== null)

    const labels = good.map(r => r.time.slice(0, 16).replace('T', ' '))
    const values = good.map(r => r['sea_level (m)'])

    canvas.hidden = false

    new Chart(canvas, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Sea level (m)',
          data: values,
          borderColor: '#2a78d6',
          borderWidth: 2,
          pointRadius: 0,   // up to 1000 points, so no dots
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
            title: { display: true, text: 'Sea level (m)' },
            grid: { color: '#e1e0d9' }
          }
        }
      }
    })

    status.textContent = good.length + ' readings plotted.'

  } catch (error) {
    status.textContent = 'Could not load the data: ' + error.message
  }
}

drawChart(CHART_URL)
