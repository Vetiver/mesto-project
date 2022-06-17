import {openPopup, closePopup, closeByEscape} from './modals.js';
import {addCard} from './cards.js';
import {editProfile, profileName, profileJob} from './profile.js';
import {enableValidation} from './validation.js';
import '../pages/index.css';
import {initialCards, postCards, profileChange, avatarChange, addLike, deliteLike, getInfo, deletePhotocard, config} from './api.js';
//---------------------------------------------------------------------Функции открытия и закрытия-----------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------------------------------------
//Добавление дефолтных карточек
function displayLike(place, card) {
  place.textContent = card.likes.length;
}
function renderLoading(button) {
  button.value = 'Сохранить...'
}

function switchLike(button, cardId, place) {
  button.addEventListener('click',() => {
    if(button.classList.contains('card__like_active')) {
      deliteLike(cardId)
      .then((res) => {
        button.classList.remove('card__like_active')
        displayLike(place, res)
      })
      .catch(err => {
        console.error(err.message)
      });
    } else {
      addLike(cardId)
      .then(res => {
        button.classList.add('card__like_active')
        displayLike(place, res)
      })
      .catch(err => {
        console.error(err.message)
      });
    }
  }) 
}




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
  Promise.all([getInfo(), initialCards()])
  .then(([userData, cards]) => {
    cards.forEach((element) => {
      addCard(element.name, element.link, element._id, element.owner._id, element.likes.length, element, userData._id)
    });
  })
  .catch(err => {
    console.error(err.message)
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
const buttonPlace = formPlace.querySelector('.popup__submit-button')
const place = document.querySelector('#place_name');//считывает строку и передает содержимое параметром(название карточки)
const img = document.querySelector('#place_src');//считывает строку и передает содержимое параметром(ссылка)
//событие нажатия на кнопку и добавление карточки 
formPlace.addEventListener('submit', (evt) => {
  postCards(place.value, img.value)
  .then((res) => {
    renderLoading(buttonPlace)
    place.reset();
    img.reset();
    closePopup(popupPlace);//сразу закрывает диалоговое окно
  })
  .catch((err) => {
   console.log(err.message)
  })
  
});
//-------------------------------------------------------ДОБАВЛЕНИЕ КАРТОЧКИ-------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------------------------------

const profileForm = document.querySelector('.popup__profile-edit');
const profileButton = profileForm.querySelector('.popup__submit-button')
const nameInput = profileForm.querySelector('#profile-nick');
const jobInput = profileForm.querySelector('#profile-descriptions');
const avatar = document.querySelector('.profile__avatar');


profileForm.addEventListener('submit', (evt) => {
  profileChange(nameInput.value, jobInput.value)
  .then((res) => {
    renderLoading(profileButton)
    profileName.textContent = res.name; 
    profileJob.textContent = res.about;
    closePopup(popupProfileEdit)
  })
  .catch((err) => {
    console.log(err.message)
  })
});

const avatarForm = document.querySelector('.popup__form-avatar');
const avatarInput = avatarForm.querySelector('.popup__field');

avatarForm.addEventListener('submit', (evt) => {
  avatarChange(avatarInput.value)
  .then((res) => {
    avatar.src = res.avatar;
    closePopup(popupAvatar);
  })
  .catch((err) =>{
    console.log(err.message)
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
.catch((err) => {
  console.log(err.message)
})


export {getInfo, deletePhotocard, addLike, deliteLike, displayLike, switchLike}//закинуть в api.js и убрать из cards

