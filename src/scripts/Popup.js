export default class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }
  open() {
    this._popupElement.classList.add('dialog_open');
    document.addEventListener('keyup', this._handleEscClose);
  }

  close() {
    this._popupElement.classList.remove('dialog_open');
    document.removeEventListener('keyup', this._handleEscClose);
  }

  _handleEscClose(e) {
    const ESC_KEY = 27;

    if (e.which === ESC_KEY) {
      this.close();
    }
  }

  setEventListeners() {
    this._popupElement.addEventListener('click', (e) => {
      if (e.target.classList.contains('dialog__close-button') || !e.target.closest('.dialog__container')) {
        this.close();
      }
    })
  }
}