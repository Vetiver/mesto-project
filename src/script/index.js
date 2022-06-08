import {openPopup, closePopup} from './modals.js';
import {cardAdd} from './cards.js';
import {editProfile, profileName, profileJob} from './profile.js';
import {enableValidation} from './validation.js';
import '../pages/index.css';
//---------------------------------------------------------------------Функции открытия и закрытия-----------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------------------------------------
//Добавление дефолтных карточек
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
  ];

  const popupZoom = document.querySelector('.popup__zoom');
  
  initialCards.forEach((el) => {
    cardAdd(el.name, el.link);
});
  popupZoom.querySelector('#close-zoom').addEventListener('click', () => {//закрытие
    closePopup(popupZoom);
});

//-------------------------------------------------------ДОБАВЛЕНИЕ ДЕФОЛТНЫХ КАРТОЧЕК-------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------------------------------

const popupProfileEdit = document.querySelector('.popup__profile-edit');//выбор индивидуального класса для формы редактирования профиля
const profileEdit = document.querySelector('.profile__edit-button');//выбор кнопки вызова формы профиля
const cardsAddButton = document.querySelector('.profile__add-button');//выбор кнопки для добавления карточки места
const popupPlace = document.querySelector('.popup__place');//выбор индивидуального класса для формы места
const popupContainerProfile = popupProfileEdit.querySelector('.popup__container');
const popupCloseProfile = popupContainerProfile.querySelector('.popup__first-close');//выбор кнопки закрытия для формы профиля
const popupClosePlace = document.querySelector('.popup__second-close');//выбор кнопки закрытия для формы места



//реализация открытия и закрытия двух форм

profileEdit.addEventListener('click', () => {
  nameInput.value = profileName.textContent; //Жак записан в поле input
  jobInput.value = profileJob.textContent; //Работа (р)жака записана в поле input
  openPopup(popupProfileEdit);
});
//для формы профиля, обращение к индивидуальному классу для каждой формы, открытие

document.addEventListener('keydown', (evt) => {
  if(evt.key === 'Escape') {
    closePopup(popupProfileEdit);
    closePopup(popupPlace);
    closePopup(popupZoom);
  }
});

popupProfileEdit.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('popup')) {
    closePopup(popupProfileEdit);
  }
})

popupPlace.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('popup')) {
    closePopup(popupPlace);
  }
})

popupZoom.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('popup__zoom')) {
    closePopup(popupZoom);
  }
})

popupCloseProfile.addEventListener('click', () => {
  closePopup(popupProfileEdit);
});
//для формы профиля закрытие
cardsAddButton.addEventListener('click', () => {
  openPopup(popupPlace);
});
//для формы места открытие
popupClosePlace.addEventListener('click', () => {
  closePopup(popupPlace);
});


//для формы места закрытие
//-------------------------------------------------------ОТКРЫТИЕ И ЗАКРЫТИЕ 2 ФОРМ-----------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------------------------------------
  popupZoom.querySelector('#close-zoom').addEventListener('click', () => {//закрытие попапа 
    closePopup(popupZoom);
  });
//функция выбирает template потом клонирует содержимое во 2 переменную
const place = document.querySelector('#place_name');//считывает строку и передает содержимое параметром(название карточки)
const img = document.querySelector('#place_src');//считывает строку и передает содержимое параметром(ссылка)
//событие нажатия на кнопку и добавление карточки 
addEventListener('submit', (evt) => {
  evt.preventDefault();
  cardAdd(place.value, img.value);
  closePopup(popupPlace);//сразу закрывает диалоговое окно
  place.value = '';
  img.value = '';
});
//-------------------------------------------------------ДОБАВЛЕНИЕ КАРТОЧКИ-------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------------------------------

const formElement = document.querySelector('.popup__profile-edit');
const profileButton = document.querySelector('.popup__submit-button');
const nameInput = formElement.querySelector('#profile-nick');
const jobInput = formElement.querySelector('#profile-descriptions');

profileButton.addEventListener('click', (evt) => {
  editProfile(nameInput.value, jobInput.value);
  evt.preventDefault();
  closePopup(popupProfileEdit);
});
//-------------------------------------------------------РЕДАКТИРОВАНИЕ ПРОФИЛЯ---------------------------------------------------------------------- 
//---------------------------------------------------------------------------------------------------------------------------------------------------

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__field_tipe_error',
  errorClass: 'popup__profile-error_active'
}); 



