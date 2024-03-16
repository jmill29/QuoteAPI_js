let { quotes } = require('./data');
const { getIndexById, resetIndex } = require('./utils');

const newArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

const toTitleCase = str => {
  const strArr = str.split(' ');
  let strInTitleCase = '';
  for (let i of strArr) {
    strInTitleCase += (i[0].toUpperCase() + i.slice(1, i.length) + ' ');
  }
  return strInTitleCase.trim();
};

const removeElement = (index, elArr) => {
  if (index === 0) {
    elArr = elArr.slice(1, elArr.length);
  } else if (index === elArr.length - 1) {
    elArr = elArr.slice(0, elArr.length -1);
  } else {
    elArr = elArr.slice(0, index).concat(elArr.slice(index+1, elArr.length)); 
  }
  return elArr;
};

/*console.log(`'${toTitleCase('new user')}'`);
console.log(getIndexById(1, quotes));
//console.log(removeElement(9, quotes));
for (i = 0; i < 10; i++) {
  console.log(i);
}*/


/*const id = '1';
const index = getIndexById(Number(id), quotes);
let quotesDeleted = [];

if (index === -1) {
  console.log('Invalid request. No quotes found.');
} else {
  quotesDeleted.push(quotes[index]);
  quotes = removeElement(index, quotes);
  quotes = resetIndex(quotes);
  console.log({numQuotesDeleted: quotesDeleted.length, 
               quotes: quotesDeleted});
  console.log(quotes);
}*/

let i = 0;
while (i < newArr.length) {
  console.log(i, newArr.length);
  if ((newArr[i] % 2) == 0) {
    newArr.splice(i, 1);
  } else {
    i += 1;
  }
}
console.log(newArr);