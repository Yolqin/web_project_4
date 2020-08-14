//Wrappers
const addGridItemDialog = document.querySelector('.dialog__type_add-grid-item');
const editProfileDialog = document.querySelector('.dialog__type_edit-progile');
const imagePopup = document.querySelector('.dialog__type_image');

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

//Image Dialog
const dialogImage = imagePopup.querySelector('.dialog__image');
const dialogImageCaption = imagePopup.querySelector('.dialog__image-caption');

//Image Inputs
const gridItemTitleInput = document.querySelector('.dialog__input_type_grid-title');
const gridItemImageInput = document.querySelector('.dialog__input_type_url');

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

function toggleDialog(dialogWindow) {
  dialogWindow.classList.toggle('dialog_open');
}

editDialogButton.addEventListener('click', () => {

  nameInput.value = profileName.textContent; 
  aboutMeInput.value = profileJob.textContent;
  // if (!editProfileDialog.classList.contains('dialog_open')) {   < --- I had this version in my previous sprint, but codereviewer asked to put this check. So, I'm a bit confused which direction to follow.
  //   nameInput.value = profileName.textContent; 
  //   aboutMeInput.value = profileJob.textContent;
  // } 
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

function addGridItem(imageTitle, imageUrl) {
  const gridElement = gridTemplate.cloneNode(true);

  const gridImage =  gridElement.querySelector('.elements__grid-image');
  const gridTitle = gridElement.querySelector('.elements__grid-header');
  const gridLikeButton = gridElement.querySelector('.elements__like-button');
  const gridDeleteButton = gridElement.querySelector('.elements__delete-button');

  gridTitle.textContent = imageTitle;
  gridImage.src = imageUrl;
  gridImage.alt = imageTitle;

  gridLikeButton.addEventListener("click", () => {
    gridLikeButton.classList.toggle("elements__like-button_active");
  });

  gridDeleteButton.addEventListener('click', () => {
    const gridItem = gridDeleteButton.closest('.elements__grid-item');
    gridItem.remove();
    });

  gridImage.addEventListener('click', () => {
    dialogImage.src = imageUrl;
    dialogImage.alt = imageTitle;
    dialogImageCaption.textContent = imageTitle;

    toggleDialog(imagePopup);
  });

  list.prepend(gridElement); 
}

dialogImageForm.addEventListener('submit', e => {
  e.preventDefault();
  
  addGridItem(gridItemTitleInput.value, gridItemImageInput.value,);

  toggleDialog(addGridItemDialog);

  gridItemImageInput.value = "";
  gridItemTitleInput.value = "";
});

initialCards.forEach(data => {
  addGridItem(data.name, data.link);
});