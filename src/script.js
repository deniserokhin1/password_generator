const buttonGeneratorPassword = document.querySelector('.settings__button');
const checkboxes = document.querySelectorAll('.checkbox');
const password = document.querySelector('.result-box__input');
const lengthPass = document.querySelector('.settings-item__input');

const resultArr = [];

const functions = {
  0: getRandomLower,
  1: getRandomUpper,
  2: getRandomNumber,
  3: getRandomSymbol,
};

buttonGeneratorPassword.addEventListener('click', () => {
  getFunction();
});

function getFunction() {
  const arrCheckboxTrue = [];

  checkboxes.forEach((checkbox) => {
    checkbox.checked ? arrCheckboxTrue.push(Number(checkbox.id)) : false;
  });

  for (let i = 0; i < lengthPass.value; i++) {
    arrCheckboxTrue.forEach((id) => {
      id in functions ? resultArr.push(functions[id]()) : false;
    });
  }
  passwordGenerator();
}

const passwordGenerator = () => {
  password.value = resultArr
    .slice(0, lengthPass.value)
    .sort(() => Math.random() - 0.5)
    .join('');

  resultArr.length = 0;
};

function getRandomLower() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber() {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
  return String.fromCharCode(Math.floor(Math.random() * 15) + 33);
}
