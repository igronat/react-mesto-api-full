import React, { useState, useEffect } from "react";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import api from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import { EditProfilePopup } from "./EditProfilePopup";
import { EditAvatarPopup } from "./EditAvatarPopup";
import { AddPlacePopup } from "./AddPlacePopup";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";
import * as auth from "../utils/Auth.js";
import ok from "../images/ok.jpg";
import bad from "../images/bad.jpg";

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({
    name: "",
    about: "",
    avatar: "",
  });
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const history = useHistory();
  const [isSuccess, setSuccess] = useState(false);
  const [isFailure, setFailure] = useState(false);
  const [userData, setUserData] = useState({});

  const token = localStorage.getItem("jwt");

  useEffect(() => {
    tokenCheck();
  }, []);

  useEffect(() => {
    if (loggedIn) {
      api
        .getProfileInfo(token)
        .then((user) => {
          setCurrentUser(user);
        })
        .catch((err) => console.log(`Ошибка профиля: ${err}`));

      api
        .getInitialCards(token)
        .then((res) => {
          setCards(res);
        })
        .catch((err) => console.log(`Ошибка при добавлении карточек: ${err}`));
    }
  }, [loggedIn]);

  const handleRegister = (email, password) => {
    return auth
      .register(email, password)
      .then((res) => {
        if (res) {
          handleSuccess();
          history.push("/signin");
        } else {
          handleFailure();
        }
      })
      .catch((err) => {
        console.log(`Ошибка регистрации пользователя: ${err}`);
      });
  };

  const handleLogin = (email, password) => {
    return auth
      .authorize(email, password)
      .then((data) => {
        auth.getContent(data.token).then((res) => {
          const userData = { email, password };
          setUserData(userData);
          setLoggedIn({
            loggedIn: true,
          });
          history.push("/");
        });
      })
      .catch((err) => {
        handleFailure();
        console.log(`Ошибка авторизации пользователя: ${err}`);
      });
  };

  function tokenCheck() {
    if (localStorage.getItem("token")) {
      let token = localStorage.getItem("token");
      auth.getContent(token).then(({ data }) => {
        if (data) {
          let userData = {
            email: data.email,
            id: data._id,
          };
          setUserData(userData);
          setLoggedIn({
            loggedIn: true,
          });
          history.push("/");
        }
      });
    }
  }

  const signOut = () => {
    localStorage.removeItem("token");
    history.push("/signin");
  };

  const handleEditAvatarClick = () => {
    setEditAvatarPopupOpen(true);
  };
  const handleEditProfileClick = () => {
    setEditProfilePopupOpen(true);
  };
  const handleAddPlaceClick = () => {
    setAddPlacePopupOpen(true);
  };
  const handleCardClick = (card) => {
    setSelectedCard(card);
  };
  const handleSuccess = () => {
    setSuccess(true);
  };
  const handleFailure = () => {
    setFailure(true);
  };

  const closeAllPopups = () => {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setSelectedCard(null);
    setSuccess(false);
    setFailure(false);
  };

  const handleUpdateUser = (user) => {
    api
      .editProfile(user, token)
      .then((res) => {
        setCurrentUser(res);
        setEditProfilePopupOpen(false);
      })
      .catch((err) => console.log(`Ошибка обновления профиля: ${err}`));
  };

  const handleUpdateAvatar = (user) => {
    api
      .avatarProfile(user, token)
      .then((res) => {
        setCurrentUser(res);
        setEditAvatarPopupOpen(false);
      })
      .catch((err) => console.log(`Ошибка аватара: ${err}`));
  };

  const handleAddPlaceSubmit = (user) => {
    api
      .addCard(user, token)
      .then((res) => {
        setAddPlacePopupOpen(false);
        setCards([res, ...cards]);
      })
      .catch((err) => console.log(`Ошибка добавления карточки: ${err}`));
  };

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, isLiked, token).then((newCard) => {
      setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
    });
  }

  function handleCardDelete(card) {
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.deleteCard(card._id, token).then(() => {
      setCards((state) => state.filter((c) => c._id !== card._id));
    });
  }

  function componentCards() {
    return (
      <>
        <Main
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={handleCardClick}
          cards={cards}
          onCardsLike={handleCardLike}
          onCardDelete={handleCardDelete}
          userData={userData}
          signOut={signOut}
        />

        <Footer />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </>
    );
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Switch>
        <ProtectedRoute
          exact
          path="/"
          loggedIn={loggedIn}
          component={componentCards}
        />

        <Route path="/signin">
          <Login handleLogin={handleLogin} />
        </Route>

        <Route path="/signup">
          <Register handleRegister={handleRegister} />
        </Route>
      </Switch>

      <InfoTooltip
        name="ok"
        img={ok}
        title="Вы успешно зарегистрировались"
        isOpen={isSuccess}
        onClose={closeAllPopups}
      />

      <InfoTooltip
        name="bad"
        img={bad}
        title="Что-то пошло не так! Попробуйте еще раз."
        isOpen={isFailure}
        onClose={closeAllPopups}
      />
    </CurrentUserContext.Provider>
  );
}

export default App;
