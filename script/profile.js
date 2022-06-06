const profileName = document.querySelector('.profile__nickname');
const profileJob = document.querySelector('.profile__description');

function editProfile(nameValue, jobValue) { //функция редактирования профиля
  profileName.textContent = nameValue;  //замена текстового значения на значения из попапа
  profileJob.textContent = jobValue;
}

export {editProfile, profileName, profileJob};