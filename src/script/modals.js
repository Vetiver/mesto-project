function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
    document.removeEventListener('keydown', closeByEscape);
  }
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscape);
};//функция открытия любого попапа

function closePopup(popup) {
  popup.classList.remove('popup_opened');
};//функция закрытия любого попапа

export{openPopup, closePopup, closeByEscape};