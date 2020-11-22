import "./pages/index.css";
import Section from './scripts/Section.js';
import Card from './scripts/Card.js';
import PopupWithForm from './scripts/PopupWithForm.js';
import PopupWithImage from './scripts/PopupWithImage.js';
import UserInfo from './scripts/UserInfo.js';
import FormValidator from './scripts/FormValidator.js';
import { defaultConfig } from "./scripts/utils.js";
import Api from './scripts/Api.js';


// Profile Edit Dialog
const profileEditDialog = document.querySelector('.page__dialog_type_edit-profile'); // profilePopup
const profileEditButton = document.querySelector('.profile__edit-button'); // editButton

const profileNameInput = document.querySelector('.dialog__input_type_name'); // profileFormNameField
const profileJobInput = document.querySelector('.dialog__input_type_about-me'); // profileFormTitleField


// Avatar Dialog
const avatarEditDialog = document.querySelector('.page__dialog_type_edit-avatar'); //avatarPopup
const avatarEditButton = document.querySelector('.profile__avatar_edit'); //editAvatarButton
const avatarImg = document.querySelector('.profile__avatar'); //avatarInput


// Card Add Dialog
const cardAddDialog = document.querySelector('.page__dialog_type_add-grid-item'); //cardPopup
const cardAddButton = document.querySelector('.profile__add-button'); //addButton


// Form Validators
const addCardForm = document.querySelector('.dialog__form_type_add-image');  // addCardForm
const editProfileForm = document.querySelector('.dialog__form_type_update-profile'); // editProfileForm
const editAvatarForm = document.querySelector('.page__dialog_type_edit-avatar'); //editAvatarForm

const editFormValidator = new FormValidator(defaultConfig, editProfileForm);
const addFormFormValidator = new FormValidator(defaultConfig, addCardForm);
const editAvatarValidator = new FormValidator(defaultConfig, editAvatarForm);


// Cards
const imageCards = document.querySelector('.elements__grid'); // imageContainer seems no need
const gridTemplateSelector = document.querySelector('.grid-template'); //cardTemplateSelector


// Image Dialog
const imageDialog = document.querySelector('.page__dialog_type_image'); //imagePopup
const imagePopup = new PopupWithImage('.page__dialog_type_image');  //popupWithImage
imagePopup.setEventListeners(); 


// Delete Confirmation
const cardDeleteDialog = document.querySelector('.page__dialog_type_delete-confirmation'); //deleteCardPopup
const cardDeleteForm = new PopupWithForm({ popupSelector: '.page__dialog_type_delete-confirmation' });  //deleteForm
cardDeleteForm.setEventListeners();


// Notify that upload is in process
function loading(isLoading, dialogSelector) {
  const dialog = document.querySelector(dialogSelector);
  if (isLoading) {
    dialog.querySelector('.dialog__button').textContent = "Saving...";
  } else {
    dialog.querySelector('.dialog__button').textContent = "Save";
  }
}


const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-5",
  headers: {
    authorization: "0b0810cc-19b7-4496-ab2f-26f1fe242520",
    "Content-Type": "application/json"
  }
});

api.getAppInfo()
  .then(([userData, initialCards]) => {
    const userId = userData._id;

    const starterCards = new Section({   //imageList
      items: initialCards,
      renderer: renderingCard
    }, '.elements__grid');

    starterCards.renderItems();

    const addGridItemDialog = new PopupWithForm({  //newCardForm
      popupSelector: ".page__dialog_type_add-grid-item",
      handleFormSubmit: (data) => {
        loading(true, ".page__dialog_type_add-grid-item");
        api.addCard(data)
          .then(data => {
            renderingCard(data);
            addGridItemDialog.close();
            loading(false, ".page__dialog_type_add-grid-item");
          })
          .catch(err => console.log(err));
      }
    })
    addGridItemDialog.setEventListeners();
    cardAddButton.addEventListener('click', () => addGridItemDialog.open());


    function renderingCard(data) {
      const gridItem = new Card({
        data,
        handleCardClick: () => {
          imagePopup.open(data.caption, data.link)
        },
        handleDeleteClick: (cardId) => {
          cardDeleteForm.open(cardId);
          cardDeleteForm.handleSubmitEvent(() => {
            api.removeCard(cardId)
              .then(() => {
                gridItem.handleDelete();
                cardDeleteForm.close();
              })
              .catch(err => console.log(err));
          })
        },
        handleLikeClick: (cardId) => {
          console.log(gridItem);
          const cardLiked = gridItem._grid.querySelector('.elements__like-button').classList.contains('elements__like-button_active');
          if (cardLiked) {
            gridItem._grid.querySelector('.elements__like-button').classList.remove('elements__like-button_active');
            api.removeLike(cardId)
              .then(res => gridItem.displayLikesSum(res.likes.length))
              .catch(err => console.log(err))

          } else {
            gridItem._grid.querySelector('.elements__like-button').classList.add('elements__like-button_active');
            api.addLike(cardId)
              .then(res => {
                return gridItem.displayLikesSum(res.likes.length);
              })
              .catch(err => console.log(err))
          }
        }
      }, userId, gridTemplateSelector);
      starterCards.addItem(gridItem.addGridItem());
    }

    //Profile
    const profile = new UserInfo({ profileName: ".profile__name", profileJob: ".profile__job", avatarImg: ".profile__avatar" });
    profile.setUserInfo({ name: userData.name, job: userData.about, avatar: userData.avatar });
    //profile.setAvatarInfo({ avatar: userData.avatar });

    // 
    const profileEditForm = new PopupWithForm({
      popupSelector: ".page__dialog_type_edit-profile",
      handleFormSubmit: (data) => {
        loading(true, ".page__dialog_type_edit-profile");
        api.setUserInfo(data)
          .then(res => {
            profile.setUserInfo({ name: res.name, job: res.about, avatarImg: res.avatar })
            profileEditForm.close();
            loading(false, ".page__dialog_type_edit-profile");
          })
          .catch(err => console.log)
      }
    });

    profileEditButton.addEventListener('click', () => {
      const user = profile.getUserInfo();
      profileNameInput.value = user.name;
      profileJobInput.value = user.job;
      profileEditForm.open();
    });

    profileEditForm.setEventListeners();


    const avatarForm = new PopupWithForm({
      popupSelector: ".page__dialog_type_edit-avatar",
      handleFormSubmit: (data) => {
        loading(true, ".page__dialog_type_edit-avatar")

        api.setUserAvatar(data.link)
          .then(res => {
            avatarImg.src = res.avatar;
            avatarForm.close();
            loading(false, ".page__dialog_type_edit-avatar");
            }
          )
          .catch(err => console.log(err));
      }
    });

    avatarEditButton.addEventListener('click', () => {
      avatarForm.open();
    })
    avatarForm.setEventListeners();


    editFormValidator.enableValidation();
    editAvatarValidator.enableValidation();
    addFormFormValidator.enableValidation();
  })

  .catch(err => console.log(err))