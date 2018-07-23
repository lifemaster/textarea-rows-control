const textarea = document.querySelector('textarea');

let minRows = parseInt(textarea.getAttribute('minRows')) || 2;
let maxRows = parseInt(textarea.getAttribute('maxRows')) || 2;

if (minRows <= 0) {
  minRows = 2;
}

if (maxRows <= 0 || maxRows < minRows) {
  maxRows = minRows;
}

textarea.setAttribute('rows', minRows);

textarea.addEventListener('input', () => {
  if (minRows === maxRows) {
    return;
  }

  tryToIncreaseRows();
  tryToDecreaseRows();
});

function tryToIncreaseRows() {
  if (textarea.scrollHeight > textarea.clientHeight && textarea.getAttribute('rows') < maxRows) {
    incrementRows();
    tryToIncreaseRows();
  }
}

function tryToDecreaseRows() {
  if (textarea.scrollHeight === textarea.clientHeight && textarea.getAttribute('rows') > minRows) {
    decrementRows();
    (textarea.scrollHeight > textarea.clientHeight) ? tryToIncreaseRows() : tryToDecreaseRows();
  }
}

function incrementRows() {
  textarea.setAttribute('rows', parseInt(textarea.getAttribute('rows')) + 1);
}

function decrementRows() {
  textarea.setAttribute('rows', parseInt(textarea.getAttribute('rows')) - 1);
}