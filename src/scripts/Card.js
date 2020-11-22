export default class Card {
  constructor({ data, handleCardClick, handleDeleteClick, handleLikeClick }, userId, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._likesSum = data.likes.length;
    this._id = data._id;
    this._owner = data.owner;

    this._handleLikeClick = handleLikeClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleCardClick = handleCardClick;

    this._userId = userId;
    this._cardSelector = cardSelector;
  }

  id() {
    return this._id;
  }


  _handleLikes() {
    const gridLikeButton = this._grid.querySelector('.elements__like-button');
    const gridItemLikes = Array.from(this._likes);
    gridItemLikes.forEach(element => {
      if (element._id === this._userId) {
        gridLikeButton.classList.add('elements__like-button_active');
      }
    })
  }


  displayLikesSum(likesSum) {
    this._grid.querySelector('.elements__like-count').textContent = likesSum;
  }

  //???
  handleLikeButton(event) {
    event.target.classList.toggle('elements__like-button_active');
  }

  handleDelete() {
    this._grid.remove();
    this._grid = null;
  }

  _hideDeleteButtton() {
    const gridDeleteButton = this._grid.querySelector('.elements__delete-button');
    if (this._userId !== this._owner._id) {
      gridDeleteButton.remove();
    }
  }

  _addEventListeners() {

    const gridLikeButton = this._grid.querySelector('.elements__like-button');
    const gridDeleteButton = this._grid.querySelector('.elements__delete-button');
    const gridImage = this._grid.querySelector('.elements__grid-image');


    gridLikeButton.addEventListener('click', () => this._handleLikeClick(this.id()));

    if (gridDeleteButton) {
      gridDeleteButton.addEventListener('click', () => this._handleDeleteClick(this.id()));
    }

    gridImage.addEventListener('click', () => {
      this._handleCardClick({ name: this._name, link: this._link })
    });
  }


  addGridItem() {

    this._grid = document.querySelector('.grid-template').content.querySelector('.elements__grid-item').cloneNode(true);
    this._gridItem = document.querySelector('.elements__grid-item');

    const gridTitle = this._grid.querySelector('.elements__grid-header');
    const gridImage = this._grid.querySelector('.elements__grid-image');

    this._grid.querySelector('.elements__like-count').textContent = this._likesSum;

    gridTitle.textContent = this._name;
    gridImage.src = this._link;
    gridImage.alt = this._name;

    this._handleLikes();
    this._hideDeleteButtton();
    this._addEventListeners();

    return this._grid;
  }
}