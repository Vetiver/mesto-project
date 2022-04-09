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

  initialCards.forEach( (el) => {
    const cardElement = cardTemplate.querySelector('#card_template').cloneNode(true);
    cardElement.querySelector('#titleCard').textContent = el.name;
    cardElement.querySelector('#image').src = el.link;
    cardElement.querySelector('#image').alt = el.name;
    cardContain.prepend(cardElement);
    cardElement.querySelector('.card__like').addEventListener('click', (evt) => { //лайк для добавленных карточек
      evt.target.classList.toggle('card__like_active');//лайк дефолтных карточек
    });

    cardElement.querySelector('.card__trash').addEventListener('click', (evt) => {//удаление карточек
      evt.target.closest('.card').remove();
    });

    cardElement.querySelector('#image').addEventListener('click', () => {
      popupZoom.querySelector('.popup__image').src = el.link;//передата значений
      popupZoom.querySelector('.popup__name-zoom').textContent = el.name;//передата значений//реализация попапа зума
      popupZoom.querySelector('.popup__image').alt = el.name;
      openPopup(popupZoom)//открытие попапа
    });
});
popupZoom.querySelector('#close-zoom').addEventListener('click', () => {//закрытие
  closePopup(popupZoom);
});

//-------------------------------------------------------ДОБАВЛЕНИЕ ДЕФОЛТНЫХ КАРТОЧЕК-------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------------------------------

const popupProfileEdit = document.querySelector('.popup__profile-edit');//выбор индивидуального класса для формы редактирования профиля
const ProfileEdit = document.querySelector('.profile__edit-button');//выбор кнопки вызова формы профиля
const addCards = document.querySelector('.profile__add-button');//выбор кнопки для добавления карточки места
const popupPlace = document.querySelector('.popup__place');//выбор индивидуального класса для формы места
const popupContainerProfile = popupProfileEdit.querySelector('.popup__container');
const popupCloseProfile = popupContainerProfile.querySelector('.popup__first-close');//выбор кнопки закрытия для формы профиля
const popupClosePlace = document.querySelector('.popup__second-close');//выбор кнопки закрытия для формы места



//реализация открытия и закрытия двух форм

ProfileEdit.addEventListener('click', () => {
  openPopup(popupProfileEdit);
});
//для формы профиля, обращение к индивидуальному классу для каждой формы, открытие

popupCloseProfile.addEventListener('click', () => {
  closePopup(popupProfileEdit);
});
//для формы профиля закрытие
addCards.addEventListener('click', () => {
  openPopup(popupPlace);
});
//для формы места открытие
popupClosePlace.addEventListener('click', () => {
  closePopup(popupPlace);
});
//для формы места закрытие
//-------------------------------------------------------ОТКРЫТИЕ И ЗАКРЫТИЕ 2 ФОРМ-----------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------------------------------------

function addCard(placeValue, placeImg) {
  const cardElement = cardTemplate.querySelector('#card_template').cloneNode(true);//функция выбирает template потом клонирует содержимое во 2 переменную
  cardElement.querySelector('#titleCard').textContent = placeValue;//передает параметр из строки с названием
  cardElement.querySelector('#image').src = placeImg;
  cardElement.querySelector('#image').alt = placeValue;
  cardContain.prepend(cardElement);
  cardElement.querySelector('.card__like').addEventListener('click', (evt) => { //лайк 
    evt.target.classList.toggle('card__like_active');
  });
  cardElement.querySelector('.card__trash').addEventListener('click', (evt) => {//удаление карточек
    evt.target.closest('.card').remove();
  });
  cardElement.querySelector('#image').addEventListener('click', () => {//реализация попапа зума в добавленных карточках
    popupZoom.querySelector('.popup__image').src = placeImg;//передача значений
    popupZoom.querySelector('.popup__name-zoom').textContent = placeValue;//передача значений
    popupZoom.querySelector('.popup__image').alt =  placeValue;
    openPopup(popupZoom)//открытие попапа
  });

  popupZoom.querySelector('#close-zoom').addEventListener('click', () => {//закрытие попапа 
    closePopup(popupZoom);
  });
  document.querySelector('#place_name').value = '';
  document.querySelector('#place_src').value = '';
};
//функция выбирает template потом клонирует содержимое во 2 переменную

//событие нажатия на кнопку и добавление карточки 
addEventListener('submit', (evt) => {
  const place = document.querySelector('#place_name').value;//считывает строку и передает содержимое параметром(название карточки)
  const img = document.querySelector('#place_src').value;//считывает строку и передает содержимое параметром(ссылка)
  evt.preventDefault();
  addCard(place, img);
  closePopup(popupPlace);//сразу закрывает диалоговое окно
  
});
//-------------------------------------------------------ДОБАВЛЕНИЕ КАРТОЧКИ-------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------------------------------

const profileName = document.querySelector('.profile__nickname');
const profileJob = document.querySelector('.profile__description');
const formElement = document.querySelector('.popup__profile-edit');
const profileButton = document.querySelector('.popup__submit-button');
const nameInput = formElement.querySelector('#profile-nick');
const jobInput = formElement.querySelector('#profile-descriptions');


function editProf(nameValue, jobValue) { //функция редактирования профиля
  profileName.textContent = nameValue;  //замена текстового значения на значения из попапа
  profileJob.textContent = jobValue;
}
  
profileButton.addEventListener('click', (evt) => {
  nameInput.value = profileName.textContent; //Жак записан в поле input
  jobInput.value = profileJob.textContent; //Работа (р)жака записана в поле input

  editProf(nameInput.value, jobInput.value);
  evt.preventDefault();
  closePopup(popupProfileEdit);
});
//-------------------------------------------------------РЕДАКТИРОВАНИЕ ПРОФИЛЯ---------------------------------------------------------------------- 
//---------------------------------------------------------------------------------------------------------------------------------------------------





 
  




