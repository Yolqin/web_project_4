import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._dialogForm = document.querySelector(".dialog__form");
  }

  _getInputValues() {
    this._inputList = this._popupElement.querySelectorAll(".dialog__input");

    this._formValues = {};
    this._inputList.forEach(input => this._formValues[input.name] = input.value);
    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._dialogForm.reset();
    this._popupElement.addEventListener("submit", (e) => {
      e.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      //this.close();
    })
  }

  handleSubmitEvent(event) {
    this._handleFormSubmit = event;
  }
}