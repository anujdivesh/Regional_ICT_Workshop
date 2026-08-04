// index.js - the landing page.
//
// The cards are plain links, so they need no JavaScript. The only job here is
// the year in the footer: getFullYear() reads it from the computer's clock, so
// the copyright line is right next year without anyone editing this file.

document.getElementById('year').textContent = new Date().getFullYear()
