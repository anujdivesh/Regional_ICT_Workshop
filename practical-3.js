// practical-3.js - API Integration.
//
// One API is used throughout: the SPC ocean observations service. Everything
// here is fetch, which is built into the browser - no packages needed.

import { setupTabs, setupCodeButtons } from './shared.js'


// ============================================================
// The API address, in the two parts that change: the station, and how many
// readings to ask for.
// ============================================================
const API = 'https://ocean-obs-api.spc.int/insitu/get_data/station/'

function buildUrl(station, limit) {
  return API + station + '?limit=' + limit
}


// ------------- nothing below here needs changing -------------


// ---------------------------------------------------------------
// 1. The page furniture: tabs and the "Show code" button
// ---------------------------------------------------------------
setupTabs()
setupCodeButtons()


// ---------------------------------------------------------------
// 2. Ask the API for a station's readings
//
//    One function for both tabs. It returns the reply rather than putting
//    anything on the page, so each tab can do what it likes with it - and the
//    error handling lives in one place.
// ---------------------------------------------------------------
async function getReadings(station, limit) {
  const response = await fetch(buildUrl(station, limit))

  // A reply arrived, but that does not mean it is the data. 404 means no such
  // station, 500 means the service is unwell - both arrive as replies.
  if (!response.ok) {
    throw new Error('the server replied ' + response.status)
  }

  return response.json()
}


// ---------------------------------------------------------------
// 3. Show one reading as a sentence a person can read
//
//    Tide gauges send newest first, so data[0] is the latest reading.
// ---------------------------------------------------------------
function showReading(result, widgetId) {
  const latest = result.data[0]
  const seaLevel = latest['sea_level (m)']

  // The time comes back as 2026-08-04T21:00:00 - swapping the T for a space
  // and dropping the seconds is enough to make it readable
  const when = latest.time.slice(0, 16).replace('T', ' ')

  const widget = document.getElementById(widgetId)
  widget.textContent = ''

  const value = document.createElement('p')
  value.className = 'widget-value'
  value.textContent = seaLevel + ' m'

  const where = document.createElement('p')
  where.className = 'widget-label'
  where.textContent = result.display_name

  const time = document.createElement('p')
  time.className = 'widget-label'
  time.textContent = 'at ' + when + ' UTC'

  widget.append(value, where, time)
}


// ---------------------------------------------------------------
// 4. Tab 2 - the live widget, filled in as soon as the page opens
// ---------------------------------------------------------------
async function loadWidget() {
  const status = document.getElementById('widget-status')

  try {
    const result = await getReadings('auasi', 1)
    showReading(result, 'sea-level-widget')
    status.textContent = 'Read from the API when this page opened.'

  } catch (error) {
    document.querySelector('#sea-level-widget .widget-value').textContent = '--'
    status.textContent = 'Could not reach the API: ' + error.message
  }
}

loadWidget()


// ---------------------------------------------------------------
// 5. Tab 3 - the practical
//
//    The URL box updates as the dropdowns change, so the address and the
//    result are never out of step with each other.
// ---------------------------------------------------------------
const stationBox = document.getElementById('try-station')
const limitBox = document.getElementById('try-limit')

function showUrl() {
  document.querySelector('#try-url code').textContent =
    buildUrl(stationBox.value, limitBox.value)
}

stationBox.addEventListener('change', showUrl)
limitBox.addEventListener('change', showUrl)
showUrl()   // fill it in before anything is touched

document.getElementById('try-button').addEventListener('click', async () => {
  const status = document.getElementById('try-status')
  const result = document.getElementById('try-result')

  status.textContent = 'Asking the API...'

  try {
    const data = await getReadings(stationBox.value, limitBox.value)

    showReading(data, 'try-widget')

    // JSON.stringify turns the reply back into text. The 2 is how many spaces
    // to indent by - without it the whole thing arrives on one line.
    document.querySelector('#try-json code').textContent = JSON.stringify(data, null, 2)

    result.hidden = false
    status.textContent = `${data.data.length} reading(s) came back.`

  } catch (error) {
    result.hidden = true
    status.textContent = 'Could not reach the API: ' + error.message
  }
})
