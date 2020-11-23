import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open(caption, link) {
    const imageDialog = this._popupElement.querySelector('.dialog__image');
    const imageCaption = this._popupElement.querySelector('.dialog__image-caption');

    imageDialog.src = link;
    imageDialog.alt = caption;
    imageCaption.textContent = caption;
    super.open(caption, link);
  }
}