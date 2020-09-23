import { toggleDialog, dialogImage, dialogImageCaption, imagePopup } from "./utils.js";

class Card {
  constructor(data, gridTemplateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._gridTemplate = document.querySelector(gridTemplateSelector)
      .content.querySelector('.elements__grid-item');
  }

  _handleLikeButton(event) {
    event.target.classList.toggle('elements__like-button_active');

  }

  _handleDeleteButton(event) {
    event.target.closest('.elements__grid-item').remove();

  }

  _handlePreviewImage() {
    dialogImage.src = this._link;
    dialogImage.alt = this._name;
    dialogImageCaption.textContent = this._name;

    toggleDialog(imagePopup);
  }

  _addEventListeners() {

    const gridImage = this._grid.querySelector('.elements__grid-image');
    const gridLikeButton = this._grid.querySelector('.elements__like-button');
    const gridDeleteButton = this._grid.querySelector('.elements__delete-button');


    gridLikeButton.addEventListener('click', this._handleLikeButton);
    gridDeleteButton.addEventListener('click', this._handleDeleteButton);
    gridImage.addEventListener('click', () => this._handlePreviewImage());
  }


  addGridItem() {

    this._grid = this._gridTemplate.cloneNode(true);

    const gridTitle = this._grid.querySelector('.elements__grid-header');
    const gridImage = this._grid.querySelector('.elements__grid-image');


    gridTitle.textContent = this._name;
    gridImage.src = this._link;
    gridImage.alt = this._name;

    this._addEventListeners();

    return this._grid;
  }

}

export default Card;
