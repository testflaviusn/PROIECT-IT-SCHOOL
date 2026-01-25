import Layout from "../components/Layout";
import { useParams, useSearchParams } from "react-router-dom";
import { useFetch } from "../utils/hooks/useFetch";
import { getNewsList } from "../api/adaptors";
import { getNewsCategoriesEndpoint } from "../api/endpoints";
import { Container } from "react-bootstrap";
import NewsCardList from "../components/newsCardList";
import { CustomPagination } from "../components/CustomPagination";

export default function NewsCategory() {
    //extragem parametrul de categorie din ruta
    const { categoryId } = useParams();
    //extragem query sarch-ul din URL
    const [ queryParams ] = useSearchParams();
    let currentPage = queryParams.get('page');
    // daca nu avem query param page in url inseamna ca suntem pe prima pagina
    if(!currentPage){
        currentPage = 1;
    }

    // generam endpont-ul pentru categoria curenta
    const newsCategoryEndpoint = getNewsCategoriesEndpoint(categoryId, currentPage);
    // facem call la server
    const newsData = useFetch(newsCategoryEndpoint);
    //adaptam datele venite de la server
    const adaptedNewsList = getNewsList(newsData);

    //in fucntie de parametrul primit in url o sa afisam titlul diferit pentru categoria curenta
    let pageTitle = "";
    switch (categoryId) {
        case "technology":
            pageTitle = "Tech";
            break;
        case "football":
            pageTitle = "Fotbal";
            break;
        case "business":
            pageTitle = "Business";
            break;
        case "science":
            pageTitle = "Science";
            break;
        case "environment":
            pageTitle = "Environment";
            break;
        default:
            break;
    }

    return (
        <Layout>
            <Container className="my-5">
                <h1 className="mb-5 pt-3">{pageTitle}</h1>
                {/* afisamn toate stirile */}
                <NewsCardList newsList={adaptedNewsList} />
                {/* afisam paginatia */}
                <CustomPagination activepage={currentPage} baseurl={`/category/${categoryId}`} />
            </Container>
        </Layout>
    );
}
