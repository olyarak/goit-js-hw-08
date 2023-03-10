import throttle from 'lodash.throttle';

const formEl = document.querySelector('.feedback-form');
const LOCALSTORAGE_KEY = 'feedback-form-state';
const currentFormData = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY));
let formData;
if (currentFormData) {
  formData = { ...currentFormData };
} else {
  formData = {};
}

formEl.addEventListener('input', throttle(onChangeData, 500));
formEl.addEventListener('submit', onSubmit);
onRefreshPage(currentFormData);

function onChangeData(event) {
  formData[event.target.name] = event.target.value.trim();
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(formData));
}

function onSubmit(event) {
  event.preventDefault();
  console.log(currentFormData);
  localStorage.removeItem(LOCALSTORAGE_KEY);
  event.currentTarget.reset();
}

function onRefreshPage({ email = '', message = '' }) {
  formEl.email.value = email;
  formEl.message.value = message;
}
