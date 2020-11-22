export default class UserInfo {
  constructor({ profileName, profileJob, avatarImg }) {
    
    this._profileName = document.querySelector(profileName);
    this._profileJob = document.querySelector(profileJob);
    this._avatarImg = document.querySelector(avatarImg);
    
  }

  getUserInfo() {
    return { name: this._profileName.textContent, job: this._profileJob.textContent, avatar: this._avatarImg.src};
  }

  setUserInfo({ name, job, avatar }) {
    this._profileName.textContent = name;
    this._profileJob.textContent = job;
    this._avatarImg.src = avatar;
  }

  /*getAvatarInfo() {
    return { avatar: this._avatarImg.src };
  }

  setAvatarInfo({ avatar }) {
    this._avatarImg.src = avatar;
  }*/
}