class MainApi {
  constructor(options) {
    this._url = options.url;
  }

  _checkServerResponse(res){
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  register(user) {
    return fetch(`${this._url}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        email: user.email, 
        password: user.password,
        name: user.name
      }),
    })
    .then(this._checkServerResponse)
  };

  login(user) {
    return fetch(`${this._url}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        email: user.email, 
        password: user.password, 
      }),
    })
    .then(this._checkServerResponse)
    .then((data) => {
      if (data.token) {
        localStorage.setItem('jwt', data.token);
        return data;
      }
    })  
  };

  checkToken(jwt) {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`,
      },
    })
      .then(this._checkServerResponse)
  };

  editUser(name, email) {
    return fetch(`${this._url}/users/me`,{
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
      body: JSON.stringify({ name, email })
    })
      .then(this._checkServerResponse)
   }
}

export const mainApi = new MainApi({
//   url: 'api.nivnikoff-diploma.nomoredomains.club',
  url: 'http://localhost:3000'
})
