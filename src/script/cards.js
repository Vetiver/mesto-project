import {openPopup, closePopup} from './modals.js';
const cardTemplate = document.querySelector('#card__template').content; 
const cardContain = document.querySelector('.elements__card-container');
const popupZoom = document.querySelector('.popup__zoom');
const zoomImage = popupZoom.querySelector('.popup__image');
const zoomName = popupZoom.querySelector('.popup__name-zoom');
import {getInfo} from './api.js';
import {deletePhotocard} from './api.js';
import {addLike, deliteLike} from './api.js';


function createCard(placeValue, placeImg, placeId, cardId, likeCounter, likeId) {
  const cardElement = cardTemplate.querySelector('#card_template').cloneNode(true);//функция выбирает template потом клонирует содержимое во 2 переменную
  const cardElementImage = cardElement.querySelector('#image');
  const cardLike = cardElement.querySelector('.card__like-counter');
  cardElement.querySelector('#titleCard').textContent = placeValue;//передает параметр из строки с названием
  cardElementImage.src = placeImg;
  cardElementImage.alt = placeValue;// тут создаете карточку и возвращаете ее
  cardLike.textContent = likeCounter;
  cardElement.querySelector('.card__like').addEventListener('click', (evt) => { //лайк 
    evt.target.classList.toggle('card__like_active');
    if (evt.target.classList.contains('card__like_active') == true) {
      addLike(cardId)
    } else {
      deliteLike(cardId)
    }

  });
  
  getInfo()
  .then(res => {
    if (res._id !== placeId) {
      cardElement.querySelector('.card__trash').style.display = 'none';
    }
    if (res._id == likeId) {
      cardElement.querySelector('.card__like').classList.add('card__like_active');
    }
  })
  cardElement.querySelector('.card__trash').addEventListener('click', (evt) => {//удаление карточек
    evt.target.closest('.card').remove();
    deletePhotocard(cardId)
  });
  cardElementImage.addEventListener('click', () => {//реализация попапа зума в добавленных карточках
    zoomImage.src = placeImg;//передача значений
    zoomName.textContent = placeValue;//передача значений
    zoomImage.alt =  placeValue;
    openPopup(popupZoom)//открытие попапа
  });
return cardElement
}

function addCard(placeValue, placeImg, placeId, cardId, likeCounter,likeId) {
  const cardElement = createCard(placeValue, placeImg, placeId, cardId, likeCounter, likeId);
  cardContain.append(cardElement);
}

export {addCard};