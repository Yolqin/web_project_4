import "./pages/index.css";
import Section from './scripts/Section.js';
import Card from './scripts/Card.js';
import PopupWithForm from './scripts/PopupWithForm.js';
import PopupWithImage from './scripts/PopupWithImage.js';
import UserInfo from './scripts/UserInfo.js';
import FormValidator from './scripts/FormValidator.js';
import { initialCards, defaultConfig } from "./scripts/utils.js";
import Api from './scripts/Api.js';

const deleteDialog = new PopupWithForm({
  popupSelector: ".page__dialog_type_delete-confirmation"
});
deleteDialog.setEventListeners();

const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-5",
  headers: {
    authorization: "0b0810cc-19b7-4496-ab2f-26f1fe242520",
    "Content-Type": "application/json"
  }
});

api.getInitialCards()
  .then(res => {

    // Get initital list of cards
    const gridList = new Section(
      
      {
        items: res,
        renderer: (data) => {
          console.log(res);
          const gridItem = new Card(
            {
              data,
              handleCardClick: () => { imagePopup.open(data.name, data.link); },
              handleDeleteClick: (cardId) => {
                deleteDialog.open(cardId);
                deleteDialog.handleSubmitEvent(() => {
                  api.removeCard(cardId)
                    .then(() => {
                      gridItem.handleDeleteButton();
                      deleteDialog.close;
                    })
                    .catch(err => console.log(err));
                })
              },
              handleLikeClick: (cardId) => {
                api.addLike(cardId)
              }
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



    // Dialog to add a new card
    const addGridItemDialog = new PopupWithForm({
      popupSelector: ".page__dialog_type_add-grid-item",
      handleFormSubmit: (data) => {

        api.addCard(data)
          .then(res => {
            const gridItem = new Card(
              {
                data,
                handleCardClick: () => { imagePopup.open(data.name, data.link); }
              },
              '.grid-template'
            );
            const cardElement = gridItem.addGridItem();
            gridList.addItem(cardElement);
          })
      }
    })
    addGridItemDialog.setEventListeners();
    document.querySelector('.profile__add-button').addEventListener('click', () => addGridItemDialog.open());
  })

api.getUserInfo()
  .then(res => {
    const profile = new UserInfo({ profileName: ".profile__name", profileJob: ".profile__job" });
    profile.setUserInfo({ name: res.name, job: res.about })
  })

const imagePopup = new PopupWithImage('.page__dialog_type_image');
imagePopup.setEventListeners();

const profile = new UserInfo({ profileName: ".profile__name", profileJob: ".profile__job" });

const editProfileDialog = new PopupWithForm({
  popupSelector: ".page__dialog_type_edit-profile", handleFormSubmit: ({ name, job }) => {
    profile.setUserInfo({ name, job });
  }
});
editProfileDialog.setEventListeners();



//document.querySelector('.elements__delete-button').addEventListener('click', () => deleteDialog.open());



const addCardForm = document.querySelector('.dialog__form_type_add-image');
const editProfileForm = document.querySelector('.dialog__form_type_update-profile');

const editFormValidator = new FormValidator(defaultConfig, editProfileForm);
const addFormFormValidator = new FormValidator(defaultConfig, addCardForm);

editFormValidator.enableValidation();
addFormFormValidator.enableValidation();

document.querySelector('.profile__edit-button').addEventListener('click', () => editProfileDialog.open());
