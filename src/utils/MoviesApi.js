class MoviesApi {
  constructor(options) {
    this._url = options.url;
  }

  _checkServerResponse(res){
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getMovies() {
    return fetch(`${this._url}`, {
      method: 'GET',
      headers: { "Content-Type": "application/json" }
    })
    .then((res) => this._checkServerResponse(res))
  }
}

export const moviesApi = new MoviesApi({
  url: 'https://api.nomoreparties.co/beatfilm-movies'
})
