export default class Card {
  constructor({ name, link, handleCardClick }, cardSelector) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
  }

  _handleLikeButton(event) {
    event.target.classList.toggle('elements__like-button_active');

  }

  _handleDeleteButton() {
    //event.target.closest('.elements__grid-item').remove();
    this._gridItem.remove();
  }

  _addEventListeners() {

    const gridImage = this._grid.querySelector('.elements__grid-image');
    const gridLikeButton = this._grid.querySelector('.elements__like-button');
    const gridDeleteButton = this._grid.querySelector('.elements__delete-button');


    gridLikeButton.addEventListener('click', this._handleLikeButton);
    gridDeleteButton.addEventListener('click', this._handleDeleteButton);
    gridImage.addEventListener('click', () => this._handleCardClick());
  }


  addGridItem() {

    this._grid = document.querySelector('.grid-template').content.querySelector('.elements__grid-item').cloneNode(true);
    this._gridItem = document.querySelector('.elements__grid-item');

    const gridTitle = this._grid.querySelector('.elements__grid-header');
    const gridImage = this._grid.querySelector('.elements__grid-image');


    gridTitle.textContent = this._name;
    gridImage.src = this._link;
    gridImage.alt = this._name;

    this._addEventListeners();

    return this._grid;
  }
}