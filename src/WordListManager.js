const APIUrl = "http://localhost:5000";

const WordListManager = {
    getWordLists() {
        return fetch(`${APIUrl}/wordlists`).then((response) => response.json());
    },
    updateWordlist(wordlist) {
        return fetch(`${APIUrl}/wordlists/0`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(wordlist),
        }).then((data) => data.json());
    }
}

export default WordListManager;