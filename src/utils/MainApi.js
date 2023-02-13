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
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        email: user.email, 
        password: user.password,
        name: user.name
      }),
    })
    .then((res) => this._checkServerResponse(res))
  };

  login(user) {
    return fetch(`${this._url}/signin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        email: user.email, 
        password: user.password, 
      }),
    })
    .then((res) => this._checkServerResponse(res))
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
        'Authorization': `Bearer ${jwt}`,
        'Content-Type': 'application/json'
      },
    })
    .then((res) => this._checkServerResponse(res))
  };

  editUser(name, email) {
    return fetch(`${this._url}/users/me`,{
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email })
    })
    .then((res) => this._checkServerResponse(res))
   }

  createMovie(movie) {
    return fetch(`${this._url}/movies`,{
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        country: movie.country || "No data",
        director: movie.director || "No data",
        duration: movie.duration || 0,
        year: movie.year || 0,
        description: movie.description || "No data",
        image: `https://api.nomoreparties.co/${movie.image.url}`,
        trailerLink: movie.trailerLink,
        thumbnail: `https://api.nomoreparties.co/${movie.image.formats.thumbnail.url}`,
        movieId: movie.id,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN || "No data",
      })
    })
    .then((res) => this._checkServerResponse(res))
  }

  getMovies() {
    return fetch(`${this._url}/movies`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json'
      },
    })
    .then((res) => this._checkServerResponse(res))
  }

  deleteMovie(movieId) {
    return fetch(`${this._url}/movies/${movieId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json'
      },
    })
    .then((res) => this._checkServerResponse(res))
  }

}

export const mainApi = new MainApi({
//   url: 'api.nivnikoff-diploma.nomoredomains.club',
  url: 'http://localhost:3000'
})
