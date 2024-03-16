const deleteButton = document.getElementById('delete-quote');
const delConfirmContainer = document.getElementById('delete-confirmation');

deleteButton.addEventListener('click', () => {
  const quote_id = document.getElementById('id').value;
  const person = document.getElementById('person').value;
  const year = document.getElementById('year').value;

  let endpoint = '/api/quotes?';
  if (quote_id) {
    endpoint += ('id=' + quote_id + '&');
  }
  if (person) {
    endpoint += ('person=' + person + '&');
  } 
  if (year) {
    endpoint += ('year=' + year); 
  }

  if (endpoint[endpoint.length - 1] === '&') {
    endpoint = endpoint.slice(0, endpoint.length - 1);
  }

  fetch(endpoint, {
    method: 'DELETE'
  })
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      return response.text().then(errorMessage => {
        throw new Error(errorMessage);
      });
    }
  })
  .then(response => {
    delConfirmContainer.innerHTML = '';
    const delConfirmation = document.createElement('div');
    delConfirmation.innerHTML = `${response.numQuotesDeleted} quotes successfully deleted.`;
    delConfirmation.style.textAlign = 'center';
    delConfirmation.style.marginTop = '10px';
    delConfirmContainer.appendChild(delConfirmation);
    response.quotes.forEach(quote => {
      const innerQuoteContainer = document.createElement('div');
      innerQuoteContainer.className = 'inner-container';
      const newQuote = document.createElement('div');
      newQuote.className = 'single-quote';
      if (quote.year) {
        newQuote.innerHTML = `<div class="quote-text">${quote.quote}</div>
        <div class="attribution">- ${quote.person}, ${quote.year}</div>`;
      } else {
        newQuote.innerHTML = `<div class="quote-text">${quote.quote}</div>
        <div class="attribution">- ${quote.person}</div>`;
      }
      const quoteId = document.createElement('div');
      quoteId.className = 'quote-id';
      quoteId.innerHTML = `<p>${quote.id}</p>`;
      innerQuoteContainer.appendChild(quoteId);
      innerQuoteContainer.appendChild(newQuote);
      delConfirmContainer.appendChild(innerQuoteContainer);
    });
  })
  .catch(error => {
    delConfirmContainer.innerHTML = `<p>Your request encountered an error: ${error.message}</p>`;
  });
});

