const APIUrl = "http://localhost:5000";

const WordListManager = {
    getWordLists() {
        return fetch(`${APIUrl}/wordlists`).then((response) => response.json());
    },
    getWordListById(id) {
        return fetch(`${APIUrl}/wordlists/${id}`).then((response) => response.json());
    },
    updateWordlist(wordlist, id) {
        return fetch(`${APIUrl}/wordlists/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(wordlist),
        }).then((data) => data.json());
    }
}

export default WordListManager;