let editDialogButton = document.querySelector('.profile__edit-button');
let closeEditDialogButton = document.querySelector('.dialog__close-button');
let dialog = document.querySelector('.dialog');
let dialogForm = document.querySelector('.dialog__form');
let nameInput = document.querySelector('.dialog__input_name');
let aboutMeInput = document.querySelector('.dialog__input_about-me');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__job');

function toggleDialog() {
  dialog.classList.toggle('dialog_open');

  nameInput.value = profileName.textContent; 
  aboutMeInput.value = profileJob.textContent;
}

editDialogButton.addEventListener('click', toggleDialog)
closeEditDialogButton.addEventListener('click', toggleDialog)

dialogForm.addEventListener('submit', function(e) {
  e.preventDefault();
  
  profileName.textContent = nameInput.value;
  profileJob.textContent = aboutMeInput.value;
 
  toggleDialog();

})