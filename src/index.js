import Card from './Card.js';

import { toggleDialog, imagePopup } from "./utils.js";

import FormValidator from './FormValidator.js';

const defaultConfig = {
  formSelector: ".dialog__form",
  inputSelector: ".dialog__input",
  submitButtonSelector: ".dialog__save-button",
  inactiveButtonClass: "dialog__save-button_disabled",
  inputErrorClass: "dialog__input_type_error",
  errorClass: "dialog__error_visible"
};

//Wrappers
const addGridItemDialog = document.querySelector('.page__dialog_type_add-grid-item');
const editProfileDialog = document.querySelector('.page__dialog_type_edit-profile');
//const imagePopup = document.querySelector('.page__dialog_type_image');

const addCardForm = addGridItemDialog.querySelector('.dialog__form');
const editProfileForm = editProfileDialog.querySelector('.dialog__form');

const editFormValidator = new FormValidator(defaultConfig, editProfileForm);
const addFormFormValidator = new FormValidator(defaultConfig, addCardForm);

editFormValidator.enableValidation();
addFormFormValidator.enableValidation();

//Open Buttons
const editDialogButton = document.querySelector('.profile__edit-button');
const addGridItemDialogButton = document.querySelector('.profile__add-button');

//Close Buttons
const closeEditDialogButton = editProfileDialog.querySelector('.dialog__close-button');
const closeGridItemDialogButton = addGridItemDialog.querySelector('.dialog__close-button');
const closeGridImageDialogButton = imagePopup.querySelector('.dialog__close-button');


//Buttons and other DOM elements
const dialogForm = document.querySelector('.dialog__form_type_update-profile');
const dialogImageForm = document.querySelector('.dialog__form_type_add-image');

//Profile
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

//Profile Inputs
const nameInput = document.querySelector('.dialog__input_type_name');
const aboutMeInput = document.querySelector('.dialog__input_type_about-me');

const gridTemplate = document.querySelector('.grid-template').content.querySelector('.elements__grid-item');
const list = document.querySelector('.elements__grid');

//Image Inputs
const gridItemTitleInput = document.querySelector('.dialog__input_type_grid-title');
const gridItemImageInput = document.querySelector('.dialog__input_type_url');

// Initial Cards Array
const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg"
  },
  {
    name: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg"
  },
  {
    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg"
  },
  {
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg"
  },
  {
    name: "Vanoise National Park",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg"
  },
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg"
  }
];

dialogImageForm.addEventListener('submit', e => {
  e.preventDefault();

  const gridItem = new Card(
    {
      name: gridItemTitleInput.value,
      link: gridItemImageInput.value
    },
    '.grid-template'
  );

  toggleDialog(addGridItemDialog);

  gridItemImageInput.value = "";
  gridItemTitleInput.value = "";

  list.prepend(gridItem.addGridItem());
});

initialCards.forEach(data => {
  const gridItem = new Card(
    {
      name: data.name,
      link: data.link
    },
    '.grid-template'
  );
  list.prepend(gridItem.addGridItem());
});

editDialogButton.addEventListener('click', () => {

  nameInput.value = profileName.textContent;
  aboutMeInput.value = profileJob.textContent;

  toggleDialog(editProfileDialog);
});

closeEditDialogButton.addEventListener('click', () => {
  toggleDialog(editProfileDialog);
});

dialogForm.addEventListener('submit', e => {
  e.preventDefault();

  profileName.textContent = nameInput.value;
  profileJob.textContent = aboutMeInput.value;

  toggleDialog(editProfileDialog);
});

addGridItemDialogButton.addEventListener('click', () => {
  toggleDialog(addGridItemDialog);
});

closeGridItemDialogButton.addEventListener('click', () => {
  toggleDialog(addGridItemDialog);
});

closeGridImageDialogButton.addEventListener('click', () => {
  toggleDialog(imagePopup);
});
