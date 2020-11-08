class Api {
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


  // other methods for working with the API
}

/*const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-5",
  headers: {
    authorization: "0b0810cc-19b7-4496-ab2f-26f1fe242520",
    "Content-Type": "application/json"
  }
});*/

export default Api;