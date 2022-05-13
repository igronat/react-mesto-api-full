import React, {useContext} from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext'

function Card({card, onCardClick, onCardLike, onCardDelete}) {

    const currentUser = useContext(CurrentUserContext);
    // Определяем, являемся ли мы владельцем текущей карточки
    const isOwn = card.owner._id === currentUser._id;
    // Создаём переменную, которую после зададим в `className` для кнопки удаления
    const cardDeleteButtonClassName = (isOwn ? 'element__trash' : 'element__trash_hide'); 
    // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    // Создаём переменную, которую после зададим в `className` для кнопки лайка
    const cardLikeButtonClassName = (isLiked ? 'element__heart element__heart_active' : 'element__heart');   

    function handleClick() {
        onCardClick(card);
      };
    
    function handleLikeClick() {
        onCardLike(card);
      };
      
    function handleDeleteClick() {
        onCardDelete(card);
      }

    return (
       
        <article className="element">
            <img alt={`фото ${card.name}`} className="element__image" src={card.link} onClick={handleClick}/>
            <button type="button" className={cardDeleteButtonClassName} onClick={handleDeleteClick}></button>
            <div className="element__description">
                <h2 className="element__title">{card.name}</h2>
                <div className="element__likes">
                  <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
                  <p className="element__like">{card.likes.length}</p>
                </div>
            </div>
        </article>
    )

};

export default Card;