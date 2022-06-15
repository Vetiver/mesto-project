import {openPopup, closePopup, closeByEscape} from './modals.js';
import {addCard} from './cards.js';
import {editProfile, profileName, profileJob} from './profile.js';
import {enableValidation} from './validation.js';
import '../pages/index.css';
import {initialCards, postCards, profileChange, avatarChange, addLike, deliteLike, getInfo, deletePhotocard} from './api.js';
//---------------------------------------------------------------------Функции открытия и закрытия-----------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------------------------------------
//Добавление дефолтных карточек

/*const initialCards = [
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
  ];*/

  const popupZoom = document.querySelector('.popup__zoom');
  initialCards()
  .then(res => {
    console.log(res)
  res.forEach((element) => {
    addCard(element.name, element.link, element.owner._id, element._id, element.likes.length)
    element.likes.forEach((like) => {
    //addCard(element.name, element.link, element.owner._id, element._id, element.likes.length, like._id) пытался сделать чтоб лайки горели, если в массиве лайков есть мой id, но не смог
    })
  });
  })
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
const avatarBut = document.querySelector('.profile__avatar-button');
const popupAvatar = document.querySelector('.popup__avatar-sub');
const popupCloseAvatar = document.querySelector('#avatar-close');


avatarBut.addEventListener('click', () => {
  openPopup(popupAvatar);
});

popupCloseAvatar.addEventListener('click', (evt) => {
  closePopup(popupAvatar);
});

popupAvatar.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('popup')) {
    closePopup(popupAvatar);
  }
});

//реализация открытия и закрытия двух форм

profileEdit.addEventListener('click', () => {
  nameInput.value = profileName.textContent; //Жак записан в поле input
  jobInput.value = profileJob.textContent; //Работа (р)жака записана в поле input
  openPopup(popupProfileEdit);
});
//для формы профиля, обращение к индивидуальному классу для каждой формы, открытие



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

//функция выбирает template потом клонирует содержимое во 2 переменную
const formPlace = document.querySelector('.popup__form-place');
const place = document.querySelector('#place_name');//считывает строку и передает содержимое параметром(название карточки)
const img = document.querySelector('#place_src');//считывает строку и передает содержимое параметром(ссылка)
//событие нажатия на кнопку и добавление карточки 
formPlace.addEventListener('submit', (evt) => {
  addCard(place.value, img.value);
  postCards(place.value, img.value)
  .then((res) => {
    console.log(res)
  })
  closePopup(popupPlace);//сразу закрывает диалоговое окно
  place.value = '';
  img.value = '';
  if (place.value.length == 0 && img.value.length == 0) {
    const placeButton = formPlace.querySelector('.popup__submit-button');
    placeButton.disabled = true;
  }
});
//-------------------------------------------------------ДОБАВЛЕНИЕ КАРТОЧКИ-------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------------------------------

const profileForm = document.querySelector('.popup__profile-edit');
const nameInput = profileForm.querySelector('#profile-nick');
const jobInput = profileForm.querySelector('#profile-descriptions');
const avatar = document.querySelector('.profile__avatar');


profileForm.addEventListener('submit', (evt) => {
  profileChange(nameInput.value, jobInput.value)
  .then((res) => {
    profileName.textContent = res.name; 
    profileJob.textContent = res.about;
    console.log(res)
    closePopup(popupProfileEdit)
  })
  
});

const avatarForm = document.querySelector('.popup__form-avatar');
const avatarInput = avatarForm.querySelector('.popup__field');

avatarForm.addEventListener('submit', (evt) => {
  avatarChange(avatarInput.value)
  .then((res) => {
    avatar.src = res.avatar;
    console.log(res)
    closePopup(popupAvatar);
  })
})



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
//-------------------------------------------------------РЕДАКТИРОВАНИЕ АВАТАРКИ---------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------------------------------

getInfo() 

.then((res) => {
  profileName.textContent = res.name;
  profileJob.textContent = res.about;
  avatar.src = res.avatar;
  res._id
})

export {getInfo, deletePhotocard, addLike, deliteLike}//закинуть в api.js и убрать из cards

