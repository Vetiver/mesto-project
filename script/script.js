function openPopup(popup) {
  popup.classList.add('popup_opened');
};//функция открытия любого попапа

function closePopup(popup) {
  popup.classList.remove('popup_opened');
};//функция закрытия любого попапа


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


  const cardTemplate = document.querySelector('#card__template').content; 
  const cardContain = document.querySelector('.elements__card-container');//контейнер карточек
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
const zoomImage = popupZoom.querySelector('.popup__image');
const zoomName = popupZoom.querySelector('.popup__name-zoom');
function cardAdd(placeValue, placeImg) {
  const cardElement = cardTemplate.querySelector('#card_template').cloneNode(true);//функция выбирает template потом клонирует содержимое во 2 переменную
  const cardElementImage = cardElement.querySelector('#image');
  cardElement.querySelector('#titleCard').textContent = placeValue;//передает параметр из строки с названием
  cardElementImage.src = placeImg;
  cardElementImage.alt = placeValue;
  cardContain.prepend(cardElement);
  cardElement.querySelector('.card__like').addEventListener('click', (evt) => { //лайк 
    evt.target.classList.toggle('card__like_active');
  });
  cardElement.querySelector('.card__trash').addEventListener('click', (evt) => {//удаление карточек
    evt.target.closest('.card').remove();
  });
  cardElementImage.addEventListener('click', () => {//реализация попапа зума в добавленных карточках
    zoomImage.src = placeImg;//передача значений
    zoomName.textContent = placeValue;//передача значений
    zoomImage.alt =  placeValue;
    openPopup(popupZoom)//открытие попапа
  });

  popupZoom.querySelector('#close-zoom').addEventListener('click', () => {//закрытие попапа 
    closePopup(popupZoom);
  });
  
};
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

const profileName = document.querySelector('.profile__nickname');
const profileJob = document.querySelector('.profile__description');
const formElement = document.querySelector('.popup__profile-edit');
const profileButton = document.querySelector('.popup__submit-button');
const nameInput = formElement.querySelector('#profile-nick');
const jobInput = formElement.querySelector('#profile-descriptions');


function editProfile(nameValue, jobValue) { //функция редактирования профиля
  profileName.textContent = nameValue;  //замена текстового значения на значения из попапа
  profileJob.textContent = jobValue;
}
  
profileButton.addEventListener('click', (evt) => {
  editProfile(nameInput.value, jobInput.value);
  evt.preventDefault();
  closePopup(popupProfileEdit);
});
//-------------------------------------------------------РЕДАКТИРОВАНИЕ ПРОФИЛЯ---------------------------------------------------------------------- 
//---------------------------------------------------------------------------------------------------------------------------------------------------

const profileSubButt = document.querySelector('#prof-but')
const profileErrorLow = document.querySelector('#inputLowName');
const profileErrorZero = document.querySelector('#inputZeroName');
const profileErrorNone = document.querySelector('#inputZeroJob');
const profileErrorLowJob = document.querySelector('#inputLowJob')

/*nameInput.addEventListener('input', (evt) => {
  profileValid()
  if (nameInput.value.length == 0) {
    profileErrorZero.classList.add('popup__profile-error_active')
  } else {
    profileErrorZero.classList.remove('popup__profile-error_active')
  }
  if((nameInput.value.length < 2 & nameInput.value.length !== 0) || nameInput.value.length > 40) {
    profileErrorLow.classList.add('popup__profile-error_active');
  } else {
    profileErrorLow.classList.remove('popup__profile-error_active');
  }
})

jobInput.addEventListener('input', (evt) => {
  profileValid()
  if (jobInput.value.length == 0) {
    profileErrorNone.classList.add('popup__profile-error_active')
  } else {
    profileErrorNone.classList.remove('popup__profile-error_active')
  }
  if((jobInput.value.length < 2 & jobInput.value.length !== 0) || jobInput.value.length > 200) {
    profileErrorLowJob.classList.add('popup__profile-error_active');
  } else {
    profileErrorLowJob.classList.remove('popup__profile-error_active');
  }
})*/

function profileValid() {
  if(nameInput.validity.valid & jobInput.validity.valid) {
    profileSubButt.classList.remove('popup__submit-button_disabled')
    profileSubButt.classList.add('popup__submit-button')
    profileSubButt.disabled = false;
  } else {
    profileSubButt.classList.add('popup__submit-button_disabled')
    profileSubButt.classList.remove('popup__submit-button')
    profileSubButt.disabled = true;
  }
 }

 const formProfile = document.querySelector('.popup__form-profile');
 const inputProfile = formProfile.querySelectorAll('.popup__field');
 inputProfile.forEach(target => {
   target.addEventListener('input', evt => {
     
   })
 });
  
function showError () {
  if (nameInput.value.length == 0) {
    profileErrorZero.classList.add('popup__profile-error_active')
  } else {
    profileErrorZero.classList.remove('popup__profile-error_active')
  }
  if((nameInput.value.length < 2 & nameInput.value.length !== 0) || nameInput.value.length > 40) {
    profileErrorLow.classList.add('popup__profile-error_active');
  } else {
    profileErrorLow.classList.remove('popup__profile-error_active');
  }
}






