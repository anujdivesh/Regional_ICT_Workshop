// shared.js - the small bits of page furniture every practical uses.
//
// Each practical page imports the ones it needs, so the plumbing lives in one
// place and the practical's own file stays about its own subject.

// ---------------------------------------------------------------
// Tab switching
// Clicking a button hides all panels, then shows the matching one.
// A button says which panel it belongs to with data-tab="panel-id".
// ---------------------------------------------------------------
export function setupTabs() {
  const buttons = document.querySelectorAll('.tab-button')
  const panels = document.querySelectorAll('.panel')

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove "active" from every button and panel
      buttons.forEach(b => b.classList.remove('active'))
      panels.forEach(p => p.classList.remove('active'))

      // Add it back to the one that was clicked
      button.classList.add('active')
      document.getElementById(button.dataset.tab).classList.add('active')
    })
  })
}


// ---------------------------------------------------------------
// The "Show code" buttons
// Each button carries data-code, the id of the code block it belongs to.
// The code itself is written in the HTML, so there is nothing to load.
// ---------------------------------------------------------------
export function setupCodeButtons() {
  document.querySelectorAll('.code-button').forEach(button => {
    button.addEventListener('click', () => {
      const block = document.getElementById(button.dataset.code)

      block.hidden = !block.hidden
      button.textContent = block.hidden ? 'Show code' : 'Hide code'
    })
  })
}


// ---------------------------------------------------------------
// The "Open in new tab" buttons
// data-link says which link to read the address from, so the button and the
// link beside it can never drift apart.
// ---------------------------------------------------------------
export function setupOpenButtons() {
  document.querySelectorAll('.open-button').forEach(button => {
    button.addEventListener('click', () => {
      const url = document.getElementById(button.dataset.link).href

      // '_blank' is the new tab; 'noopener' matches rel="noopener" on the link
      if (url) {
        window.open(url, '_blank', 'noopener')
      }
    })
  })
}
