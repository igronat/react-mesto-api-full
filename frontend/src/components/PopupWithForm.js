import React, { useEffect } from "react";

export default function PopupWithForm({
  title,
  name,
  children,
  isOpen,
  onClose,
  onSubmit,
}) {
  useEffect(() => {
    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscClose);
    }
    return () => document.removeEventListener("keydown", handleEscClose);
  }, [isOpen]);

  return (
    <div
      className={
        isOpen
          ? `popup popup_type_${name} popup_opened`
          : `popup popup_type_${name}`
      }
      id={name}
    >
      <div
        className="popup__overlay"
        id={`overlay__${name}`}
        onClick={onClose}
      ></div>
      <div className="popup__content">
        <button
          className="popup__close"
          type="button"
          onClick={onClose}
        ></button>
        <form
          name={name}
          className={`popup__form popup__${name}`}
          onSubmit={onSubmit}
        >
          <h2 className="popup__title">{title}</h2>
          {children}
          <button
            type="submit"
            className={`popup__button button popup__button_type_save${name}`}
            id={`button-save${name}`}
          >
            Сохранить
          </button>
        </form>
      </div>
    </div>
  );
}
