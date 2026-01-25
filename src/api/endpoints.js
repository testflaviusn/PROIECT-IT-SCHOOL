// ne generam o api key la acest url https://bonobo.capi.gutools.co.uk/register/developer
// si il salvam intr0o constanta (nu este safe sa tinem api key aici , de preferat sa stea pe un server)
const API_KEY = "861945e7-8af5-4f62-83c0-d5ff222ca3f1";

// definim functia ce ne va returna endpoint-ul pt o anumita categorie de stiri

export function getNewsCategoriesEndpoint(
    category,
    pageNumber = 1, // acesta va avea default unu in caz ca nu va fi primit cand se apeleaza
    pageSize = 20 // va avea default 20 in caz ca nu va fi primit ca argument
) {
    // construim query string-ul ce va fi trimis la api si va contine api-key-ul, sectiunea de stire,
    // optiunea de afisare a tuturor campurilor unei stiri, numarul de striri returnate (pagesize) si nr paginii(page)
    const queryString = `?api-key=${API_KEY}&section=${category}&show-fields=all&page-size=${pageSize}&page=${pageNumber}`;

    //returnam linkul aferent api-ului de la the guardian
    return `https://content.guardianapis.com/search${queryString}`;
}

// definim functia ce returneaza endpointul pt o stire singulara

export function getNewsDetailsEndpoint(newsId) {
    // construim query string-ul ce va contine api key-ul si show-field=all ca se ne dea toate detaliile stirii
    const queryString = `?api-key=${API_KEY}&show-fields=all`;

    return `https://content.guardianapis.com/${newsId}${queryString}`;
}
