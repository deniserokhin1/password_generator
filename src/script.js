import './style/style.css';
import Swal from 'sweetalert2';

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: false,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer);
    toast.addEventListener('mouseleave', Swal.resumeTimer);
  },
});

const buttonGeneratorPassword = document.querySelector('.settings__button');
const checkboxes = document.querySelectorAll('.checkbox');
const password = document.querySelector('.result-box__input');
const lengthPass = document.querySelector('.settings-item__input');
const buttonCoppy = document.querySelector('.button-coppy');

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

window.addEventListener('keydown', (event) => {
  event.key === 'Enter' ? getFunction() : false;
});

buttonCoppy.addEventListener('click', () => {
  if (!password.value) {
    return;
  }
  navigator.clipboard.writeText(password.value);
  Toast.fire({
    icon: 'success',
    title: 'Пароль скопирован',
  });
  password.value = '';
});

function getFunction() {
  const arrCheckboxTrue = [];

  checkboxes.forEach((checkbox) => {
    checkbox.checked ? arrCheckboxTrue.push(Number(checkbox.id)) : false;
  });

  arrCheckboxTrue.sort(() => Math.random() - 0.5);
  for (let i = 0; i < lengthPass.value; i++) {
    arrCheckboxTrue.forEach((id) => {
      id in functions ? resultArr.push(functions[id]()) : false;
    });
  }
  passwordGenerator();
}

const passwordGenerator = () => {
  password.value = resultArr.slice(0, lengthPass.value).join('');
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
