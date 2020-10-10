import "../pages/index.css";
import Section from './Section.js';
import Card from './Card.js';
import PopupWithForm from './PopupWithForm.js';
import PopupWithImage from './PopupWithImage.js';
import UserInfo from './UserInfo.js';
import FormValidator from './FormValidator.js';
import { initialCards, defaultConfig } from "./utils.js";

const imagePopup = new PopupWithImage('.page__dialog_type_image');
imagePopup.setEventListeners();

const profile = new UserInfo({ profileName: ".profile__name", profileJob: ".profile__job" });

const editProfileDialog = new PopupWithForm({
  popupSelector: ".page__dialog_type_edit-profile", handleFormSubmit: ({ name, job }) => {
    profile.setUserInfo({ name, job });
  }
});
editProfileDialog.setEventListeners();

const gridList = new Section(
  {
    items: initialCards,
    renderer: ({ name, link }) => {
      const gridItem = new Card(
        {
          name,
          link,
          handleCardClick: () => imagePopup.open(name, link)
        },
        '.grid-template'
      );
      const cardElement = gridItem.addGridItem();
      gridList.addItem(cardElement);
    }
  },
  '.elements__grid'
);
gridList.renderItems();

const addGridItemDialog = new PopupWithForm({
  popupSelector: ".page__dialog_type_add-grid-item", handleFormSubmit: ({ name, link }) => {
    const gridItem = new Card(
      {
        name,
        link,
        handleCardClick: () => imagePopup.open(name, link)
      },
      '.grid-template'
    );
    const cardElement = gridItem.addGridItem();
    gridList.addItem(cardElement);
  }
})

addGridItemDialog.setEventListeners();

const addCardForm = document.querySelector('.dialog__form_type_add-image');
const editProfileForm = document.querySelector('.dialog__form_type_update-profile');

const editFormValidator = new FormValidator(defaultConfig, editProfileForm);
const addFormFormValidator = new FormValidator(defaultConfig, addCardForm);

editFormValidator.enableValidation();
addFormFormValidator.enableValidation();

document.querySelector('.profile__edit-button').addEventListener('click', () => editProfileDialog.open());
document.querySelector('.profile__add-button').addEventListener('click', () => addGridItemDialog.open());