import React, { useState, useEffect, useContext } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name);
      setDescription(currentUser.about);
    }
  }, [currentUser, isOpen]);

  function handleChange(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="profile"
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <input
        id="name"
        value={name || ""}
        onChange={handleChange}
        type="text"
        className="popup__input popup__text popup__text_type_name"
        name="name"
        placeholder="Имя"
        required
        minLength="2"
        maxLength="40"
      />
      <span id="name-error" className="error"></span>
      <input
        id="job"
        value={description || ""}
        onChange={handleChangeDescription}
        type="text"
        className="popup__input popup__text popup__text_type_job"
        name="job"
        placeholder="Профессия"
        required
        minLength="2"
        maxLength="200"
      />
      <span id="job-error" className="error"></span>
    </PopupWithForm>
  );
}
