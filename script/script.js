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
  const card_contain = document.querySelector('.elements__card-container');//контейнер карточек
  const popupZoom = document.querySelector('.popup__zoom');



  initialCards.forEach( (el) => {
    const cardElement = cardTemplate.querySelector('#card_template').cloneNode(true);
    cardElement.querySelector('#titleCard').textContent = el.name;
    cardElement.querySelector('#image').src = el.link;
    card_contain.append(cardElement);
    cardElement.querySelector('.card__like').addEventListener('click', (evt) => { //лайк для добавленных карточек
      evt.target.classList.toggle('card__like_active');//лайк дефолтных карточек
    });

    cardElement.querySelector('.card__trash').addEventListener('click', (evt) => {//удаление карточек
      evt.target.closest('.card').remove();
    });

    cardElement.querySelector('#image').addEventListener('click', () => {//реализация попапа зума
      popupZoom.classList.add('popup_open');//открытие попапа
      popupZoom.querySelector('.popup__image').src = el.link;//передата значений
      popupZoom.querySelector('.popup__name-zoom').textContent = el.name;//передата значений
    });

    popupZoom.querySelector('#close-zoom').addEventListener('click', () => {//закрытие
      popupZoom.classList.remove('popup_open');
    });

  });

//-------------------------------------------------------ДОБАВЛЕНИЕ ДЕФОЛТНЫХ КАРТОЧЕК-------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------------------------------

const popup__profile_edit = document.querySelector('.popup__profile-edit');//выбор индивидуального класса для формы редактирования профиля
const edit_profile = document.querySelector('.profile__edit-button');//выбор кнопки вызова формы профиля
const add_card = document.querySelector('.profile__add-button');//выбор кнопки для добавления карточки места
const popup__place = document.querySelector('.popup__place');//выбор индивидуального класса для формы места
const popup__container_profile = popup__profile_edit.querySelector('.popup__container');
const popup__close_profile = popup__container_profile.querySelector('.popup__first-close');//выбор кнопки закрытия для формы профиля
const popup__close_place = document.querySelector('.popup__second-close');//выбор кнопки закрытия для формы места



//реализация открытия и закрытия двух форм

edit_profile.addEventListener('click', () => {
  popup__profile_edit.classList.add('popup_open');
});
//для формы профиля, обращение к индивидуальному классу для каждой формы, открытие

popup__close_profile.addEventListener('click', () => {
  popup__profile_edit.classList.remove('popup_open');
});
//для формы профиля закрытие
add_card.addEventListener('click', () => {
  popup__place.classList.add('popup_open');
});
//для формы места открытие
popup__close_place.addEventListener('click', () => {
  popup__place.classList.remove('popup_open');
});
//для формы места закрытие
//-------------------------------------------------------ОТКРЫТИЕ И ЗАКРЫТИЕ 2 ФОРМ-----------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------------------------------------

const button_sub = document.getElementById('but_sub');//кнопка сохранения 2 формы

function addCard(placeValue, placeImg) {
  const cardElement = cardTemplate.querySelector('#card_template').cloneNode(true);//функция выбирает template потом клонирует содержимое во 2 переменную
  cardElement.querySelector('#titleCard').textContent = placeValue;//передает параметр из строки с названием
  cardElement.querySelector('#image').src = placeImg;
  card_contain.prepend(cardElement);
  cardElement.querySelector('.card__like').addEventListener('click', (evt) => { //лайк 
    evt.target.classList.toggle('card__like_active');
  });
  cardElement.querySelector('.card__trash').addEventListener('click', (evt) => {//удаление карточек
    evt.target.closest('.card').remove();
  });
  cardElement.querySelector('#image').addEventListener('click', () => {//реализация попапа зума в добавленных карточках
    popupZoom.classList.add('popup_open');//открытие попапа
    popupZoom.querySelector('.popup__image').src = placeImg;//передача значений
    popupZoom.querySelector('.popup__name-zoom').textContent = placeValue;//передача значений
  });

  popupZoom.querySelector('#close-zoom').addEventListener('click', () => {//закрытие попапа 
    popupZoom.classList.remove('popup_open');
  });
}
//функция выбирает template потом клонирует содержимое во 2 переменную

//событие нажатия на кнопку и добавление карточки 
button_sub.addEventListener('click', (evt) => {
  const place = document.querySelector('#place_name').value;//считывает строку и передает содержимое параметром(название карточки)
  const img = document.querySelector('#place_src').value;//считывает строку и передает содержимое параметром(ссылка)
  evt.preventDefault();
  addCard(place, img);
  popup__place.classList.remove('popup_open');//сразу закрывает диалоговое окно
  
});
//-------------------------------------------------------ДОБАВЛЕНИЕ КАРТОЧКИ-------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------------------------------

const profileName = document.querySelector('.profile__nickname');
const profileJob = document.querySelector('.profile__description');
const formElement = document.querySelector('.popup__profile-edit');
const profBut = document.querySelector('.popup__submit-button');
const nameInput = formElement.querySelector('#profile-nick')
const jobInput = formElement.querySelector('#profile-descriptions')

nameInput.value = profileName.textContent; //Жак записан в поле input
jobInput.value = profileJob.textContent; //Работа (р)жака записана в поле input

function editProf(nameValue, jobValue) { //функция редактирования профиля
  profileName.textContent = nameValue;  //замена текстового значения на значения из попапа
  profileJob.textContent = jobValue;
}
  
profBut.addEventListener('click', (evt) => {
  const nameInput = formElement.querySelector('#profile-nick').value;
  const jobInput = formElement.querySelector('#profile-descriptions').value;
  editProf(nameInput, jobInput);
  evt.preventDefault();
  popup__profile_edit.classList.remove('popup_open');
});
//-------------------------------------------------------РЕДАКТИРОВАНИЕ ПРОФИЛЯ---------------------------------------------------------------------- 
//---------------------------------------------------------------------------------------------------------------------------------------------------





 
  




