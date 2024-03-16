const getRandomElement = arr => {
  if (!Array.isArray(arr)) throw new Error('Expected an array');
  return arr[Math.floor(Math.random() * arr.length)];
};

const toTitleCase = str => {
  const strArr = str.split(' ');
  let strInTitleCase = '';
  for (let i of strArr) {
    strInTitleCase += (i[0].toUpperCase() + i.slice(1, i.length).toLowerCase() + ' ');
  }
  return strInTitleCase.trim();
};

const getIndexById = (id, data) => {
  for (let i = 0; i < data.length; i++) {
    if (data[i].id === id) {
      return i;
    }
  }
  return -1;
}

/*const removeElement = (index, elArr) => {
  if (index === 0) {
    elArr = elArr.slice(1, elArr.length);
  } else if (index === elArr.length - 1) {
    elArr = elArr.slice(0, elArr.length -1);
  } else {
    elArr = elArr.slice(0, index).concat(elArr.slice(index+1, elArr.length)); 
  }
  return elArr;
};*/

const resetIndex = (elArr) => {
  for (let i = 0; i < elArr.length; i++) {
    elArr[i].id = i;
  }
  return elArr;
}

module.exports = {
  getRandomElement,
  toTitleCase,
  getIndexById,
  resetIndex
};
