

const showInputError = (form, input, {errorClass, inputErrorClass, ...rest}) => {
  const error = document.querySelector(`#${input.id}_error`);
  input.classList.add(inputErrorClass);

  if (error) {
    error.textContent = input.validationMessage;
    error.classList.add(errorClass);
  }
  
};

const hideInputError = (form, input, {errorClass, inputErrorClass, ...rest}) => {
  const error = document.querySelector(`#${input.id}_error`);
  input.classList.remove(inputErrorClass);

  if (error) {
    error.classList.remove(errorClass);
    error.textContent = '';
  }
};

const isValid = (form, input, rest) => {
  if (!input.validity.valid) {
    showInputError(form, input, rest);
  } else {
    hideInputError(form, input, rest);
  }
};

const toggleButtonState = (button, inputs, {inactiveButtonClass}) => {
  const hasInvalidInput = inputs.every((input) => input.validity.valid);

  if (hasInvalidInput) {
    button.classList.remove(inactiveButtonClass);
  } else {
    button.classList.add(inactiveButtonClass);
  }
};

function enableValidation ({formSelector, inputSelector, submitButtonSelector, ...rest}) {

  const forms = Array.from(document.querySelectorAll(formSelector)); 

  forms.forEach((form) => {
    form.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    const inputs = Array.from(form.querySelectorAll(inputSelector));
    const button = form.querySelector(submitButtonSelector);

    inputs.forEach((input) => {
      input.addEventListener("input", () => {
        isValid(form, input, rest);
        toggleButtonState(button, inputs, rest);
      });
    });
  });
} 

enableValidation({
  formSelector: ".dialog__form",
  inputSelector: ".dialog__input",
  submitButtonSelector: ".dialog__save-button",
  inactiveButtonClass: "dialog__save-button_disabled",
  inputErrorClass: "dialog__input_type_error",
  errorClass: "dialog__error_visible"
});