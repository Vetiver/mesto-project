function openPopup(popup) {
  popup.classList.add('popup_opened');
};//функция открытия любого попапа

function closePopup(popup) {
  popup.classList.remove('popup_opened');
};//функция закрытия любого попапа

export{openPopup, closePopup};