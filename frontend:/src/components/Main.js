import React, { useContext } from "react";
import editButton from "../images/edit-button.svg";
import plus from "../images/plus.svg";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import Header from "./Header";

function Main({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onCardClick,
  cards,
  onCardsLike,
  onCardDelete,
  userData,
  signOut,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <>
      <Header
        name="exit"
        menu="Выйти"
        link="/signin"
        email={userData.email}
        signOut={signOut}
      />
      <main className="content">
        <section className="profile">
          <img
            className="profile__image"
            alt="фото"
            src={currentUser?.avatar}
            onClick={onEditAvatar}
          />
          <div className="profile__info">
            <div className="profile__title-button">
              <h1 className="profile__title">{currentUser?.name}</h1>
              <button
                type="button"
                className="profile__edit-button"
                onClick={onEditProfile}
              >
                <img alt="Редактировать" src={editButton} />
              </button>
            </div>
            <p className="profile__text">{currentUser?.about}</p>
          </div>
          <button
            aria-label="Добавить"
            type="button"
            className="profile__add-button"
            onClick={onAddPlace}
          >
            <img className="profile__button-img" alt="добавить" src={plus} />
          </button>
        </section>

        <section className="elements">
          {cards.map((card) => (
            <Card
              card={card}
              onCardClick={onCardClick}
              onCardLike={onCardsLike}
              onCardDelete={onCardDelete}
              key={`card${card._id}`}
            />
          ))}
        </section>
      </main>
    </>
  );
}

export default Main;
