const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement, toTitleCase, getIndexById,
        resetIndex } = require('./utils');

const PORT = process.env.PORT || 4001;

let quoteIdCounter = 12;

app.use(express.static('public'));

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

// Get random quote
app.get('/api/quotes/random', (req, res, next) => {
  const randomQuote = {
    quote: getRandomElement(quotes)
  }
  res.send(randomQuote);
});

// Get all quotes
app.get('/api/quotes', (req, res, next) => {
  const person = req.query.person;
  if (person) {
    let quotesArr = [];
    for (let quote of quotes) {
      if (quote.person.toLowerCase() === person.toLowerCase()) {
        quotesArr.push(quote);
      } 
    }
    res.send({
      quotes: quotesArr
    });
  } else {
    res.send({
      quotes
    });
  }
});

// Create a quote
app.post('/api/quotes', (req, res, next) => {
  quoteIdCounter += 1;
  const newQuote = {
    id:  quoteIdCounter,
    quote: req.query.quote
  };
  if (req.query.person) {
    newQuote.person = toTitleCase(req.query.person);
  }
  if (req.query.year) {
    newQuote.year = req.query.year;
  }
  if (newQuote.quote && newQuote.person) {
    quotes.push(newQuote);
    res.status(201).send({
      quote: newQuote
    });
  } else {
    quoteIdCounter -= 1;
    res.status(400).send('Invalid request. Please include both the quote and the author of the quote.');
  }
});

// Edit a quote
app.put('/api/quotes/:id', (req, res, next) => {
  const id = req.params.id;
  const index = getIndexById(Number(id), quotes);
  if (index !== -1) {
    if (req.query.quote) {
      quotes[index].quote = req.query.quote;
    }
    if (req.query.person) {
      quotes[index].person = toTitleCase(req.query.person);
    }
    if (req.query.year) {
      quotes[index].year = req.query.year;
    }
    res.send({quote: quotes[index]});
  } else {
    res.status(404).send('Quote not found. Please enter a valid Quote ID.');
  }
});

// Delete a quote
app.delete('/api/quotes', (req, res, next) => {
  if (!req.query.id && !req.query.person && !req.query.year) {
    res.status(404).send('Invalid request. Info required to complete deletion.');
  } else {
    let quotesDeleted =  [];
    if (req.query.id) {
      if ((Number(req.query.id) < 0) || (Number(req.query.id) > quotes.length-1)) {
        res.status(404).send('Invalid request. Quote not found.');
      } else {
        quotesDeleted.push(quotes[Number(req.query.id)]);
        quotes.splice(Number(req.query.id), 1);
        resetIndex(quotes);
        res.status(200).send({
          numQuotesDeleted: quotesDeleted.length,
          quotes: quotesDeleted
        });
      }
    } else if (req.query.person) {
      let i = 0;
      if (req.query.year) {
        while (i < quotes.length) {
          if ((quotes[i].person.toLowerCase() === req.query.person.toLowerCase()) && 
            (quotes[i].year === req.query.year)) {
            quotesDeleted.push(quotes[i]);
            quotes.splice(i, 1);
          } else {
            i += 1;
          }
        }
        if (quotesDeleted.length === 0) {
          res.status(404).send('Invalid request. No quotes found.');
        } else {
          resetIndex(quotes);
          res.status(200).send({
            numQuotesDeleted: quotesDeleted.length,
            quotes: quotesDeleted
          });
        }
      } else {
        while (i < quotes.length){
          if (quotes[i].person.toLowerCase() === req.query.person.toLowerCase()) {
            quotesDeleted.push(quotes[i]);
            quotes.splice(i, 1);
          } else {
            i += 1;
          }
        }
        if (quotesDeleted.length === 0) {
          res.status(404).send('Invalid request. No quotes found.');
        } else {
          resetIndex(quotes);
          res.status(200).send({
            numQuotesDeleted: quotesDeleted.length,
            quotes: quotesDeleted
          });
        }
      }
    } else if (req.query.year) {
      let i = 0;
      while (i < quotes.length) {
        if (quotes[i].year === req.query.year) {
          quotesDeleted.push(quotes[i]);
          quotes.splice(i, 1);
        } else {
          i += 1;
        }
      }
      if (quotesDeleted.length === 0) {
        res.status(404).send('Invalid request. No quotes found.');
      } else {
        resetIndex(quotes);
        res.status(200).send({
          numQuotesDeleted: quotesDeleted.length,
          quotes: quotesDeleted
        });
      }
    }
  }
});