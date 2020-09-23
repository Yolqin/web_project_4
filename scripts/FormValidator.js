class FormValidator {
  constructor(settings, formElement) {
    this._settings = settings;
    this._formElement = formElement;
  }

  _showInputError(input) {
    const error = this._formElement.querySelector(`#${input.id}_error`);

    input.classList.add(this._settings.inputErrorClass);

    error.textContent = input.validationMessage;
    error.classList.add(this._settings.errorClass);
  }

  _hideInputError(input) {
    const error = this._formElement.querySelector(`#${input.id}_error`);
    input.classList.remove(this._settings.inputErrorClass);

    error.classList.remove(this._settings.errorClass);
    error.textContent = '';
  }

  _isValid(input) {
    if (!input.validity.valid) {
      this._showInputError(input);
    } else {
      this._hideInputError(input);
    }
  }

  _toggleButtonState(button, inputs, { inactiveButtonClass }) {
    const hasInvalidInput = inputs.every((input) => input.validity.valid);

    if (hasInvalidInput) {
      button.classList.remove(inactiveButtonClass);
      this._formElement.querySelector(".dialog__save-button").disabled = false;
    } else {
      button.classList.add(inactiveButtonClass);
      this._formElement.querySelector(".dialog__save-button").disabled = true;
    }
  }

  _setEventListeneres() {
    const inputs = Array.from(this._formElement.querySelectorAll(this._settings.inputSelector));
    const button = this._formElement.querySelector(this._settings.submitButtonSelector);

    inputs.forEach((input) => {
      input.addEventListener("input", () => {
        this._isValid(input);
        this._toggleButtonState(button, inputs, this._settings);
      });
    });
  }

  enableValidation() {

    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    this._setEventListeneres();
  }
}

export default FormValidator;