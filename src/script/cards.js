import {openPopup, closePopup} from './modals.js';
const cardTemplate = document.querySelector('#card__template').content; 
const cardContain = document.querySelector('.elements__card-container');
const popupZoom = document.querySelector('.popup__zoom');
const zoomImage = popupZoom.querySelector('.popup__image');
const zoomName = popupZoom.querySelector('.popup__name-zoom');
import {displayLike, switchLike} from './index.js';
import {getInfo} from './api.js';
import {deletePhotocard} from './api.js';
import {addLike, deliteLike, initialCards} from './api.js';



function createCard(placeValue, placeImg, cardId, ownerId, likeLen, card, myId) {
  const cardElement = cardTemplate.querySelector('#card_template').cloneNode(true);//функция выбирает template потом клонирует содержимое во 2 переменную
  const cardElementImage = cardElement.querySelector('#image');
  const cardLike = cardElement.querySelector('.card__like-counter');
  const likeButton = cardElement.querySelector('.card__like');
  cardElement.querySelector('#titleCard').textContent = placeValue;//передает параметр из строки с названием
  cardElementImage.src = placeImg;
  cardElementImage.alt = placeValue;// тут создаете карточку и возвращаете ее
  cardLike.textContent = likeLen;
  card.likes.forEach(el => {
    if(el._id == myId) {
      cardElement.querySelector('.card__like').classList.add('card__like_active');
    }
  })
    if(myId !== ownerId) {
      cardElement.querySelector('.card__trash').style.display = 'none'
    }

    switchLike(likeButton, cardId, cardLike)


  cardElement.querySelector('.card__trash').addEventListener('click', (evt) => {//удаление карточек
    deletePhotocard(cardId)
    .then(res => {
      evt.target.closest('.card').remove();
    })
    .catch((err) => {
      console.log(err.message)
    })
    
  });
  cardElementImage.addEventListener('click', () => {//реализация попапа зума в добавленных карточках
    zoomImage.src = placeImg;//передача значений
    zoomName.textContent = placeValue;//передача значений
    zoomImage.alt =  placeValue;
    openPopup(popupZoom)//открытие попапа
  });
return cardElement
}

function addCard(placeValue, placeImg, cardId, ownerId, likeLen, card, myId) {
  const cardElement = createCard(placeValue, placeImg, cardId, ownerId, likeLen, card, myId);
  cardContain.append(cardElement);
}

export {addCard};