export default class Card {
  constructor({ data, handleCardClick, handleDeleteClick }, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._id = data._id;
    this._handleDeleteClick = handleDeleteClick;
  }

  id() {
    return this._id;
  }

  _handleLikeButton(event) {
    event.target.classList.toggle('elements__like-button_active');
  }

  _handleDeleteButton() {
    this._gridItem.remove();
  }

  _addEventListeners() {

    const gridImage = this._grid.querySelector('.elements__grid-image');
    const gridLikeButton = this._grid.querySelector('.elements__like-button');
    const gridDeleteButton = this._grid.querySelector('.elements__delete-button');


    gridLikeButton.addEventListener('click', this._handleLikeButton);
    gridDeleteButton.addEventListener('click', this._handleDeleteClick(this.id()));
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