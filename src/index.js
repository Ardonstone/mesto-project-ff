// импорт модулей

import './pages/index.css';
import {createCard, likeCard, deleteCard} from './components/card.js'
import {initialCards} from './components/cards.js';
import {openPopup, closePopup, mousedownPopup} from './components/modal.js';

// Дом-узлы темплейта

const templateContainer = document.querySelector('.places__list');

// Дом-узлы попапов

const popupEditProfile = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupCard = document.querySelector('.popup_type_image');
const popups = document.querySelectorAll('.popup');
const popupCardPicture = document.querySelector('.popup__image');
const popupCardContent = document.querySelector('.popup__caption');

// Дом-узлы кнопок

const buttonEdit = document.querySelector('.profile__edit-button');
const buttonNewCard = document.querySelector('.profile__add-button');

// Дом-узлы форм

const profileInfo = document.querySelector('.profile__info');
const profileNameInfo = profileInfo.querySelector('.profile__title');
const profileJobInfo = profileInfo.querySelector('.profile__description');

const formProfile = document.forms['edit-profile'];
const inputName = formProfile['name'];
const inputJob = formProfile['description'];

const formAdd = document.forms['new-place'];
const inputtitle = formAdd['place-name'];
const inputLink = formAdd['link'];

// Обработчик добавления новой карточки

formAdd.addEventListener('submit', (evt) => {addCardFormSubmit(evt)});

// Обработчик добавления новой карточки

buttonNewCard.addEventListener('click', () => {openPopup(popupNewCard)});

// Обработчики формы редактирования профиля

buttonEdit.addEventListener('click', () => { 
  inputJob.value = profileJobInfo.textContent;
  inputName.value = profileNameInfo.textContent;
  openPopup(popupEditProfile);
});

formProfile.addEventListener('submit', (evt) => {handleProfileFormSubmit(evt)});

// Добавление ккарточек

initialCards.forEach((element) => templateContainer.append(createCard(element, deleteCard, clickCard, likeCard)));

// Функция добавления новой карточки

function addCardFormSubmit(evt) {
  evt.preventDefault(); 
  templateContainer.prepend(createCard({name: inputtitle.value, link: inputLink.value}, deleteCard, clickCard, likeCard));
  closePopup(popupNewCard);
  formAdd.reset();
}

// Функция изменения профиля

function handleProfileFormSubmit(evt) {
    evt.preventDefault(); 
    document.querySelector('.profile__description').textContent = inputJob.value; 
    document.querySelector('.profile__title').textContent = inputName.value;
    closePopup(popupEditProfile);
}

// Функция открытие попапа карточки

function clickCard ({name, link}) {
    popupCardPicture.src = link;
    popupCardPicture.alt = name;
    popupCardContent.textContent = name;  
    openPopup(popupCard); 
}

// Модуль закрытия попапов

popups.forEach((popup) => { 
    popup.classList.add('popup_is-animated');
    popup.querySelector('.popup__close').addEventListener('click', () => {closePopup(popup)});
    popup.addEventListener('mousedown', (evt) => {mousedownPopup(evt, popup)}); 
});
