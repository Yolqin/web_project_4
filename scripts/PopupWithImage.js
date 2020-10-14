import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  super(popupSelector);
  
  open(caption, link) {
    this._popupElement.querySelector('.dialog__image').src = link;
    this._popupElement.querySelector('.dialog__image').alt = caption;
    this._popupElement.querySelector('.dialog__image-caption').textContent = caption;
    super.open();
  }
}