import React, { useEffect } from "react";

export default function ImagePopup({ card, onClose }) {
  useEffect(() => {
    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (card) {
      document.addEventListener("keydown", handleEscClose);
    }
    return () => document.removeEventListener("keydown", handleEscClose);
  }, [card]);

  return (
    <div
      className={card ? `popup overlay popup_opened` : `popup overlay`}
      id="img"
    >
      <div className="popup__overlay" id="overlay__img" onClick={onClose}></div>
      <div className="popup__img">
        <button
          className="popup__close"
          type="button"
          onClick={onClose}
        ></button>
        <form name="sizeImg" className="popup__form">
          <img
            alt={`фото ${card?.name}`}
            className="popup__foto"
            src={card?.link}
          />
          <h2 className="popup__fototext">{card?.name}</h2>
        </form>
      </div>
    </div>
  );
}
