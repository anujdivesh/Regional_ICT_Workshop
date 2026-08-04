// practical-1.js - System Maintenance and Planning.

import { setupTabs, setupCodeButtons } from './shared.js'

// The logs are plain .txt files sitting next to this one. Adding ?raw asks the
// bundler for their contents as a string, so each log stays a real file that
// participants can open in an editor rather than being pasted into the page.
import serverLog from './sample_system_log.txt?raw'
import backupLog from './sample_backup_log.txt?raw'


// ---------------------------------------------------------------
// 1. The page furniture: tabs and the "Show code" buttons
// ---------------------------------------------------------------
setupTabs()
setupCodeButtons()


// ---------------------------------------------------------------
// 2. Show a log, with the severity of each line coloured
//
//    Colour is the only thing we add. Every word stays exactly as it is in the
//    file, because the reading is the exercise. Both logs go through the same
//    function, which is why it takes the view's id as an argument.
// ---------------------------------------------------------------
const LEVELS = ['OK', 'WARNING', 'ERROR']

function renderLog(text, viewId) {
  const view = document.getElementById(viewId)

  // Start empty, then add one line at a time
  view.textContent = ''

  text.split('\n').forEach(line => {
    const row = document.createElement('div')

    // Which severity, if any, does this line carry? The day headings and the
    // banner at the top have none.
    const level = LEVELS.find(name => line.includes(' ' + name + ' '))

    if (level) {
      // Split the line around the severity word, so only it gets the colour.
      // Using textContent rather than innerHTML means the log's own text can
      // never be mistaken for HTML - a habit worth keeping everywhere.
      const at = line.indexOf(level)

      const before = document.createElement('span')
      before.textContent = line.slice(0, at)

      const word = document.createElement('span')
      word.className = 'level-' + level.toLowerCase()
      word.textContent = level

      const after = document.createElement('span')
      after.textContent = line.slice(at + level.length)

      row.append(before, word, after)
    } else {
      // A heading, a blank line or the closing note: show it as it is
      row.className = 'log-aside'
      row.textContent = line
    }

    view.append(row)
  })
}

renderLog(serverLog, 'log-view')
renderLog(backupLog, 'backup-log-view')


// ---------------------------------------------------------------
// 3. The plan in tab 2, typed straight into the page
//
//    contenteditable is a plain HTML attribute: put it on an element and the
//    browser lets people type in it. Nothing else is needed to make a
//    worksheet - no form, no input boxes.
//
//    localStorage then keeps what they typed in this browser, so a reload
//    partway through the session does not throw the work away. It holds text
//    only, which is why the cells are saved as a list of strings.
// ---------------------------------------------------------------
function setupWorksheet(table) {
  const key = table.dataset.sheet
  const cells = table.querySelectorAll('tbody td')

  // Bring back anything typed earlier in this browser
  const saved = localStorage.getItem(key)
  if (saved) {
    JSON.parse(saved).forEach((text, i) => {
      if (cells[i] && text) {
        cells[i].textContent = text
      }
    })
  }

  cells.forEach(cell => {
    cell.contentEditable = 'true'

    // input fires on every keystroke, so the work is never more than a
    // character behind what is on screen
    cell.addEventListener('input', () => {
      const texts = [...cells].map(c => c.textContent)
      localStorage.setItem(key, JSON.stringify(texts))
    })
  })
}

document.querySelectorAll('.worksheet').forEach(setupWorksheet)
