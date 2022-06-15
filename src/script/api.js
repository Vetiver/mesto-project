function initialCards() { return fetch('https://nomoreparties.co/v1/plus-cohort-11/cards', {
  headers: {
    authorization: '6f872e3b-157b-48f6-844b-86e70eaad5cc'
  }
})
.then((res) => {
  if (res.ok) {
    return res.json()
  }
})
}

function postCards(name, link) { return fetch('https://nomoreparties.co/v1/plus-cohort-11/cards', {
  method: 'POST',
  headers: {
    authorization: '6f872e3b-157b-48f6-844b-86e70eaad5cc',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: name,
    link: link
  })
})
.then((res) => {
  if (res.ok) {
    return res.json()
  }
})
}

  const profileChange = (name, about) => {
  return fetch('https://nomoreparties.co/v1/plus-cohort-11/users/me', {
  method: 'PATCH',
  headers: {
    authorization: '6f872e3b-157b-48f6-844b-86e70eaad5cc',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: name,
    about: about
  })
})
  .then((res) => {
    if (res.ok) {
      return res.json()
    }
  })
}

const avatarChange = (avatar) => {
  return fetch('https://nomoreparties.co/v1/plus-cohort-11/users/me/avatar', {
  method: 'PATCH',
  headers: {
    authorization: '6f872e3b-157b-48f6-844b-86e70eaad5cc',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
   avatar: avatar
  })
})
  .then((res) => {
    if (res.ok) {
      return res.json()
    }
  })
}

const addLike = (cardId) => {
  return fetch(`https://nomoreparties.co/v1/plus-cohort-11/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: {
      authorization: '6f872e3b-157b-48f6-844b-86e70eaad5cc',
      'Content-Type': 'application/json'
    }
  })
  .then(res => {
    return res.json()
  })
}

const deliteLike = (cardId) => {
  return fetch(`https://nomoreparties.co/v1/plus-cohort-11/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: '6f872e3b-157b-48f6-844b-86e70eaad5cc',
      'Content-Type': 'application/json'
    }
  })
  .then(res => {
    return res.json()
  })
}

const getInfo = () => {
return fetch('https://nomoreparties.co/v1/plus-cohort-11/users/me', {
  method: 'GET',
  headers: {
    authorization: '6f872e3b-157b-48f6-844b-86e70eaad5cc',
    'Content-Type': 'application/json'
  }
})
.then(res => {
  return res.json()
})
}

const deletePhotocard = (cardId) => {
  return fetch(`https://nomoreparties.co/v1/plus-cohort-11/cards/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: '6f872e3b-157b-48f6-844b-86e70eaad5cc',
      'Content-Type': 'application/json'
    }
  })
  .then(res => {
    return res.json()
  })
}







export {initialCards, postCards, profileChange, avatarChange, addLike, deliteLike, getInfo, deletePhotocard}//закинуть в api.js и убрать из cards

