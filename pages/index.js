const editDialogButton = document.querySelector('.profile__edit-button');
const closeEditDialogButton = document.querySelector('.dialog__close-button');
const dialog = document.querySelector('.dialog');
const dialogForm = document.querySelector('.dialog__form');
const nameInput = document.querySelector('.dialog__input_type_name');
const aboutMeInput = document.querySelector('.dialog__input_type_about-me');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

function toggleDialog() {

  if (!dialog.classList.contains('dialog_open')) {
    nameInput.value = profileName.textContent; 
    aboutMeInput.value = profileJob.textContent;
  }

  dialog.classList.toggle('dialog_open');
}

editDialogButton.addEventListener('click', toggleDialog);
closeEditDialogButton.addEventListener('click', toggleDialog);

dialogForm.addEventListener('submit', e => {
  e.preventDefault();
  
  profileName.textContent = nameInput.value;
  profileJob.textContent = aboutMeInput.value;
 
  toggleDialog();
});