// exportam functia ce adapteaza datele primite de la API pentru o categorie de stiri

export function getNewsList(apiResponse) {
    // daca raspunsul de la api nu contine date atunci o sa returnam un array gol
    if (!apiResponse || !apiResponse.response) {
        return [];
    }

    // extragem datele daor cu stirile din raspunsul de la API
    const rawNewsList = apiResponse.response.results;

    //iteram prin stiri si transformam datele in ormatul in care avem noi nevoie
    const adaptedNewsList = rawNewsList.map((currentIteratedNews) => {
        return {
            id: currentIteratedNews.id,
            thumbnail: currentIteratedNews.fields.thumbnail,
            title: currentIteratedNews.fields.headline,
            description: currentIteratedNews.fields.trailText,
        };
    });

    //dupa ce am adaptat raspunsul de la api  trebuie doar sa intoarcem datele
    return adaptedNewsList;
}

export function getNewsDetails(apiResponse) {
    // daca raspunsul de la api nu contine date  atunci o sa returnam un array gol
    if (!apiResponse || !apiResponse.response) {
        return [];
    }

    // extragem datele necesare din raspunsul de la api:
    const rawNewsDetails = apiResponse.response.content;
    //din cheia content de mai sus o da extragem doar campurile necesare si le salvam in cheile corespunzatoare

    const adaptedNewsDetails = {
        date: rawNewsDetails.webPublicationDate,
        title: rawNewsDetails.fields.headline,
        description: rawNewsDetails.fields.trailText,
        image: rawNewsDetails.fields.main,
        content: rawNewsDetails.fields.body,
        author: rawNewsDetails.fields.byline,
        thumbnail: rawNewsDetails.fields.thumbnail,
    };

    return adaptedNewsDetails;
}
