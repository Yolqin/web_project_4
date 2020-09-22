const imagePopup = document.querySelector('.page__dialog_type_image');


//Image Dialog
const dialogImage = imagePopup.querySelector('.dialog__image');
const dialogImageCaption = imagePopup.querySelector('.dialog__image-caption');


const ESC_KEY = 27;
const closeWithEsc = ({keyCode}) => { 
  

  if (keyCode === ESC_KEY) { 
    const openDialog = document.querySelector('.dialog_open');

    toggleDialog(openDialog); 
  } 
} 


//Closing the Popup by Clicking on the Overlay

const closeWithOverlayClick = ({ target }) => {
  if (target.classList.contains('dialog__close-button') || target.classList.contains('dialog')) {
    const openDialog = document.querySelector('.dialog_open');

    toggleDialog(openDialog);
  }
};


//Dialog Closing

const toggleDialog = dialogWindow => {  
  const isDialogOpened = dialogWindow.classList.contains("dialog_open");
  dialogWindow.classList.toggle("dialog_open");
 
  if (isDialogOpened) {
    document.removeEventListener('keydown', closeWithEsc);
    dialogWindow.removeEventListener('click', closeWithOverlayClick);

  } else {
    document.addEventListener('keydown', closeWithEsc);
    dialogWindow.addEventListener('click', closeWithOverlayClick);
  }
}

export {toggleDialog, dialogImage, dialogImageCaption, imagePopup};