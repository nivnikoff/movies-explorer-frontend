class MoviesApi {
    constructor(options) {
      this._url = options.url;
      this._headers = options.headers;
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
        headers: this._headers
      })
      .then((res) => this._checkServerResponse(res))
    }
}

export const moviesApi = new MoviesApi({
  url: 'https://api.nomoreparties.co/beatfilm-movies',
  headers: { "Content-Type": "application/json" }
})
