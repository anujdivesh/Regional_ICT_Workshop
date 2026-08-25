// practical-2.js - Data Formats and Storage.

import { setupTabs } from './shared.js'

// Prism does the syntax colouring. It is installed by npm, like Chart.js:
//   npm install prismjs
// The core knows no languages on its own, so Python is imported separately.
import Prism from 'prismjs'
import 'prismjs/components/prism-python'

// Two ways of importing the same file, for the two jobs on tab 2:
//
//   ?raw  gives the file's text, to print inside the page
//   ?url  gives the address the finished file will live at, for the download
//         button - the bundler copies the file into the build and hands back
//         its address, so the button works in a build as well as in dev
//
// Doing it this way keeps the four files where they are, next to this one, so
// they can still be opened in an editor or in Python.
import csvText from './sample_wave_buoy.csv?raw'
import csvUrl from './sample_wave_buoy.csv?url'

import jsonText from './sample_forecast_snippet.json?raw'
import jsonUrl from './sample_forecast_snippet.json?url'

import geojsonText from './sample_stations.geojson?raw'
import geojsonUrl from './sample_stations.geojson?url'

import xmlText from './sample_station_metadata.xml?raw'
import xmlUrl from './sample_station_metadata.xml?url'

// The Python script, and the chart it produces when you run it
import scriptText from './plot_wave_buoy.py?raw'
import scriptUrl from './plot_wave_buoy.py?url'
import plotUrl from './wave_buoy_plot.png?url'


// ---------------------------------------------------------------
// 1. The page furniture: the tabs
// ---------------------------------------------------------------
setupTabs()


// ---------------------------------------------------------------
// 1b. The automatic weather station metadata exercise
// ---------------------------------------------------------------
const metadataForm = document.getElementById('metadata-form')
const metadataOutput = document.getElementById('metadata-output')
const metadataJson = document.querySelector('#metadata-json code')
let metadataDownloadUrl

const metadataAnswers = {
  stationId: 'AWS-VUT-001',
  stationName: 'Port Vila Automatic Weather Station',
  country: 'Vanuatu',
  countryCode: 'VUT',
  title: 'Port Vila automatic weather station observations',
  abstract: 'Hourly weather observations from an automatic weather station at Port Vila, Vanuatu, supporting climate monitoring and local forecasting.',
  latitude: '-17.7333',
  longitude: '168.3273',
  elevationM: '20',
  crs: 'EPSG:4326',
  startDate: '2024-01-01',
  endDate: '',
  updateFrequency: 'Every hour',
  timeZone: 'Pacific/Efate',
  variables: 'air temperature, relative humidity, rainfall, wind speed, wind direction, pressure',
  dataFormat: 'CSV and JSON',
  organisation: 'Vanuatu Meteorology and Geohazards Department',
  contactName: 'Workshop data contact',
  contactEmail: 'data@example.org',
  access: 'Open',
  license: 'CC BY 4.0',
  keywords: 'weather, automatic weather station, climate, rainfall, Vanuatu'
}

function makeMetadataRecord() {
  const values = Object.fromEntries(new FormData(metadataForm).entries())
  const record = {
    station_id: values.stationId,
    station_name: values.stationName,
    title: values.title,
    abstract: values.abstract,
    country: values.country,
    country_code: values.countryCode.toUpperCase(),
    location: {
      latitude: Number(values.latitude),
      longitude: Number(values.longitude),
      elevation_m: Number(values.elevationM),
      crs: values.crs
    },
    temporal_coverage: {
      from: values.startDate,
      to: values.endDate || null,
      update_frequency: values.updateFrequency,
      time_zone: values.timeZone
    },
    variables: values.variables.split(',').map(variable => variable.trim()).filter(Boolean),
    data_format: values.dataFormat,
    organisation: values.organisation,
    contact: {
      name: values.contactName,
      email: values.contactEmail
    },
    access: values.access,
    licence: values.license,
    keywords: values.keywords.split(',').map(keyword => keyword.trim()).filter(Boolean)
  }

  return record
}

metadataForm.addEventListener('submit', event => {
  event.preventDefault()
  const record = makeMetadataRecord()
  metadataJson.textContent = JSON.stringify(record, null, 2)
  metadataOutput.hidden = false
  document.getElementById('metadata-status').textContent = 'Record created. Review the JSON with the group.'

  if (metadataDownloadUrl) URL.revokeObjectURL(metadataDownloadUrl)
  metadataDownloadUrl = URL.createObjectURL(new Blob([JSON.stringify(record, null, 2)], { type: 'application/json' }))
})

document.getElementById('metadata-download').addEventListener('click', () => {
  if (!metadataDownloadUrl) return
  const link = document.createElement('a')
  link.href = metadataDownloadUrl
  link.download = 'automatic-weather-station-metadata.json'
  link.click()
})

document.getElementById('metadata-reset').addEventListener('click', () => {
  metadataForm.reset()
  metadataOutput.hidden = true
  document.getElementById('metadata-status').textContent = ''
  document.getElementById('metadata-answers-toggle').textContent = 'See answers'
})

document.getElementById('metadata-answers-toggle').addEventListener('click', event => {
  const showingAnswers = event.currentTarget.textContent === 'See answers'

  Object.entries(metadataAnswers).forEach(([name, value]) => {
    metadataForm.elements[name].value = showingAnswers ? value : ''
  })

  event.currentTarget.textContent = showingAnswers ? 'Clear answers' : 'See answers'
  document.getElementById('metadata-status').textContent = showingAnswers
    ? 'Example answers are shown in the form.'
    : ''
})


// ---------------------------------------------------------------
// 2. Fill in each file's tab: its text, and its download button
//
//    textContent, not innerHTML: the XML file is full of angle brackets, and
//    textContent shows them as the characters they are instead of letting the
//    browser read them as tags. It is also the habit that keeps someone else's
//    file from ever running as code in your page.
// ---------------------------------------------------------------
function showFile(text, url, contentId, downloadId) {
  document.querySelector('#' + contentId + ' code').textContent = text
  document.getElementById(downloadId).href = url
}

showFile(csvText, csvUrl, 'csv-content', 'csv-download')
showFile(jsonText, jsonUrl, 'json-content', 'json-download')
showFile(geojsonText, geojsonUrl, 'geojson-content', 'geojson-download')
showFile(xmlText, xmlUrl, 'xml-content', 'xml-download')

// The script gets the same download button, plus colouring and editing below.
// The CSV is offered beside it, because the script will not run without it.
document.getElementById('script-download').href = scriptUrl
document.getElementById('script-csv-download').href = csvUrl


// ---------------------------------------------------------------
// 3. The Python script: coloured, and editable
//
//    Prism turns the plain text into coloured <span>s. Because it works on the
//    text, it has to run again after someone edits - but re-colouring on every
//    keystroke would rebuild the element under the cursor and lose your place.
//    So we colour on the way in, and again on blur, when the typing has stopped.
// ---------------------------------------------------------------
const scriptCode = document.querySelector('#script-content code')

function colour(element) {
  Prism.highlightElement(element)
}

function loadScript() {
  // textContent, so the script's own characters are never read as HTML
  scriptCode.textContent = scriptText
  colour(scriptCode)
}

loadScript()

// contenteditable is all it takes to make an element typable
scriptCode.contentEditable = 'true'
scriptCode.spellcheck = false

// Clicking away means the edit is finished, so it is safe to re-colour
scriptCode.addEventListener('blur', () => colour(scriptCode))

document.getElementById('script-reset').addEventListener('click', loadScript)


// ---------------------------------------------------------------
// 4. The "Run and show the plot" button on the Practical tab
//
//    Nothing is really run here - a browser cannot run Python. The chart is the
//    PNG the script saves, so this shows what a successful run looks like
//    before, or instead of, running it in the terminal.
// ---------------------------------------------------------------
document.getElementById('run-button').addEventListener('click', () => {
  const image = document.getElementById('run-plot')
  const status = document.getElementById('run-status')

  status.textContent = 'Loading wave_buoy_plot.png...'
  image.hidden = false

  // The printed output belongs with the chart, so it appears at the same time
  document.getElementById('run-output').hidden = false

  image.onload = () => {
    status.textContent = 'This is wave_buoy_plot.png, saved by the script.'
  }

  image.onerror = () => {
    status.textContent = 'Could not load wave_buoy_plot.png.'
    image.hidden = true
  }

  image.src = plotUrl
})
