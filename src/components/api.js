const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-11',
  headers: {
    authorization: '6f872e3b-157b-48f6-844b-86e70eaad5cc',
    'Content-Type': 'application/json',
  },
};

function checkResponse(res) {
  if (res.ok) {
    return res.json();
}
return Promise.reject(`Ошибка ${res.status}`);
}


function initialCards() { return fetch(`${config.baseUrl}/cards`, {
  headers: config.headers,
})
.then(checkResponse)
}

function postCards(name, link) { return fetch(`${config.baseUrl}/cards`, {
  method: 'POST',
  headers: config.headers,
  body: JSON.stringify({
    name: name,
    link: link
  })
})
.then(checkResponse)
}

  const profileChange = (name, about) => {
  return fetch(`${config.baseUrl}/users/me`, {
  method: 'PATCH',
  headers: config.headers,
  body: JSON.stringify({
    name: name,
    about: about
  })
})
.then(checkResponse)
}

const avatarChange = (avatar) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
  method: 'PATCH',
  headers: config.headers,
  body: JSON.stringify({
   avatar: avatar
  })
})
.then(checkResponse)
}

const addLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers,
  })
  .then(checkResponse)
}

const deliteLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  })
  .then(checkResponse)
}

const getInfo = () => {
return fetch(`${config.baseUrl}/users/me`, {
  method: 'GET',
  headers: config.headers,
})
  .then(checkResponse)
}

const deletePhotocard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  })
  .then(checkResponse)
}

function cardsLikes() { return fetch(`${config.baseUrl}/cards/likes`, {
  headers: config.headers,
})
.then(checkResponse)
}





export {initialCards, postCards, profileChange, avatarChange, addLike, deliteLike, getInfo, deletePhotocard, config}//закинуть в api.js и убрать из cards

