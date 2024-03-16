const submitButton = document.getElementById('submit-quote');
const newQuoteContainer = document.getElementById('new-quote');

submitButton.addEventListener('click', () => {
  const id = document.getElementById('id').value;
  const quote = document.getElementById('quote').value;
  const person = document.getElementById('person').value;
  const year = document.getElementById('year').value;

  let endpoint = '/api/quotes/' + id + '?';
  if (quote) {
    endpoint += ('quote=' + quote + '&');
  }
  if (person) {
    endpoint += ('person=' + person + '&'); 
  }
  if (year) {
    endpoint += ('year=' + year + '&');
  }

  if (endpoint[endpoint.length - 1] === '&') {
    endpoint = endpoint.slice(0, endpoint.length - 1);
  }

  fetch(endpoint, {
    method: 'PUT',
  })
  .then(response => response.json())
  .then(({quote}) => {
    const newQuote = document.createElement('div');
    if (quote.year) {
      newQuote.innerHTML = `
      <h3>Congrats, your quote was added!</h3>
      <div class="quote-text">${quote.quote}</div>
      <div class="attribution">-  ${quote.person}, ${quote.year}</div>
      <p>Go to the <a href="index.html">home page</a> to request and view all quotes.</p>
      `
    } else {
      newQuote.innerHTML = `
      <h3>Congrats, your quote was added!</h3>
      <div class="quote-text">${quote.quote}</div>
      <div class="attribution">-  ${quote.person}</div>
      <p>Go to the <a href="index.html">home page</a> to request and view all quotes.</p>
      `
    }
    newQuoteContainer.appendChild(newQuote);
  });
});