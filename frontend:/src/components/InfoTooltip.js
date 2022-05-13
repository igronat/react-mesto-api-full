import React, { useEffect } from "react";

export default function InfoTooltip({ name, img, title, isOpen, onClose }) {
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
        <form name={name} className="popup__form popup__form_type_infoTooltip">
          <img className="popup__foto_type_infoTooltip" src={img} />
          <h2 className="popup__title">{title}</h2>
        </form>
      </div>
    </div>
  );
}
