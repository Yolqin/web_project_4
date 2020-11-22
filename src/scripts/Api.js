export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  getInitialCards() {
    return fetch(this._baseUrl + '/cards', {
      headers: this._headers
    })
      .then(res => res.ok ? res.json() : Promise.reject('Error!' + res.statusText))
      .catch(err => console.log(err))
  }

  getUserInfo() {
    return fetch(this._baseUrl + '/users/me', {
      headers: this._headers
    })
      .then(res => res.ok ? res.json() : Promise.reject('Error!' + res.statusText))
      .catch(err => console.log(err))
  }

  getAppInfo() {
    return Promise.all([this.getUserInfo(), this.getInitialCards()])
  }

  addCard({ name, link }) {
    return fetch(this._baseUrl + '/cards', {
      headers: this._headers,
      method: "POST",
      body: JSON.stringify({
        name,
        link
      })
    })
      .then(res => res.ok ? res.json() : Promise.reject('Error!' + res.statusText))
      .catch(err => console.log(err))
  }

  removeCard(cardId) {
    return fetch(this._baseUrl + '/cards/' + cardId, {
      headers: this._headers,
      method: "DELETE"
    })
      .then(res => res.ok ? res.json() : Promise.reject('Error!' + res.statusText))
      .catch(err => console.log(err))
  }

  addLike(cardId) {
    return fetch(this._baseUrl + '/cards/likes/' + cardId, {
      headers: this._headers,
      method: "PUT"
    })
      .then(res => res.ok ? res.json() : Promise.reject('Error!' + res.statusText))
      .catch(err => console.log(err))
  }

  removeLike(cardId) {
    return fetch(this._baseUrl + '/cards/likes/' + cardId, {
      headers: this._headers,
      method: "DELETE"
    })
      .then(res => res.ok ? res.json() : Promise.reject('Error!' + res.statusText))
      .catch(err => console.log(err))
  }

  setUserInfo({ name, job }) {
    return fetch(this._baseUrl + '/users/me', {
      headers: this._headers,
      method: "PATCH",
      body: JSON.stringify({
        name,
        about: job
      })
    })
      .then(res => res.ok ? res.json() : Promise.reject('Error!' + res.statusText))
      .catch(err => console.log(err))
  }

  setUserAvatar(avatar) {
    return fetch(this._baseUrl + '/users/me/avatar', {
      headers: this._headers,
      method: "PATCH",
      body: JSON.stringify({
        avatar
      })
    })
      .then(res => res.ok ? res.json() : Promise.reject('Error!' + res.statusText))
      .catch(err => console.log(err))
  }
}