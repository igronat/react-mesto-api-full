class Api {
    constructor({address, headers}) {
        this._address = address;
        this._headers = headers
    }

    _handleResponse(res) {
        if (res.ok) {
            return res.json();
        }
        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`)

    }

    // получаем информацию профиля
    getProfileInfo() {
        return fetch(`${this._address}/users/me`, {
            headers: this._headers
        })
        .then(this._handleResponse);
    
    }

    // отправляем информацию об изменении профиля
    editProfile(data) {
     return fetch(`${this._address}/users/me`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify ({
            name: data.name,
            about: data.about,
            
            })
     })
     .then(this._handleResponse); 
 
    }

    // отправляем информацию об изменении аватара
    avatarProfile(data) {
     return fetch(`${this._address}/users/me/avatar`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify ({
            avatar: data.avatar
        })
     })
     .then(this._handleResponse); 
 
    }

    // получаем карточки
    getInitialCards() {
       return fetch(`${this._address}/cards`, {
            headers: this._headers
        })
        .then(this._handleResponse);

    } 

    // добавляем новую карточку
    addCard(data) {
       return fetch(`${this._address}/cards`, {
           method: 'POST',
           headers: this._headers,
           body: JSON.stringify ({
               name: data.name,
               link: data.link,
               id: data.id
           })
       })
       .then(this._handleResponse);
  
    } 

    // отправляем информацию об удалении карточки
    deleteCard(id) {
        return fetch(`${this._address}/cards/${id}`, {
           method: 'DELETE',
           headers: this._headers
        })
        .then(this._handleResponse);

    }

    // отправляем информацию о лайке
    changeLikeCardStatus(id, isLiked) {
       return fetch(`${this._address}/cards/${id}/likes`, {
           method: `${isLiked ? 'DELETE' : 'PUT'}`,
           headers: this._headers
       })
       .then(this._handleResponse)
       
    }

};

// подключаем к серверу
const api = new Api({
    address: 'https://mesto.nomoreparties.co/v1/cohort-35',
    headers: {
        authorization: '4720a964-d446-4c50-91af-e4bae21204bc',
        'Content-Type': 'application/json'
    }
    
  });

export default api;
  