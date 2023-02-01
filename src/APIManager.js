const APIurl = 'https://www.dictionaryapi.com/api/v3/references/collegiate/json/'

const key = process.env.REACT_APP_WORD_API

const API = {
    getWord(word) {
        return fetch(`${APIurl}${word}?key=${key}`)
            .then(results => results.json())
    }
}

export default API