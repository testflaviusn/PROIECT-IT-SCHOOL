import Layout from "../components/Layout";
import { getNewsCategoriesEndpoint } from "../api/endpoints";
import { useFetch } from "../utils/hooks/useFetch";
import { getNewsList } from "../api/adaptors";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import NewsCardList from "../components/newsCardList";

export default function Home() {
    // generam end-pointurile pt categoriile de stiri
    const technologyCategoryEndpoint = getNewsCategoriesEndpoint(
        "technology",
        1,
        6,
    );
    const footballCategoryEndpoint = getNewsCategoriesEndpoint(
        "football",
        1,
        6,
    );
    const businessCategoryEndpoint = getNewsCategoriesEndpoint(
        "business",
        1,
        6,
    );
    const scienceCategoryEndpoint = getNewsCategoriesEndpoint(
        "politics",
        1,
        6,
    );
    const environmentCategoryEndpoint = getNewsCategoriesEndpoint(
        "sport",
        1,
        6,
    );

    //facem fetch pt date
    const technologyData = useFetch(technologyCategoryEndpoint);
    const footballData = useFetch(footballCategoryEndpoint);
    const businessData = useFetch(businessCategoryEndpoint);
    const politicsData = useFetch(politicsCategoryEndpoint);
    const sportData = useFetch(sportCategoryEndpoint);

    // folosind design patternul de adapter o sa adaptam datele de la server intr-un format necesar componentei noastre
    const adaptedTechnologyData = getNewsList(technologyData);
    const adaptedFootballData = getNewsList(footballData);
    const adaptedBusinessData = getNewsList(businessData);
    const adaptedPoliticsData = getNewsList(politicsData);
    const adaptedSportData = getNewsList(sportData);

    return (
        <Layout>
            <section className="tech my-5">
                <Container>
                    <h1 className="mb-5 pt-3">Tech</h1>
                    {/* instantiem componenta care ne listeaza card-urile cu stiri */}
                    <NewsCardList newsList={adaptedTechnologyData} />
                    <p>
                        Vezi toate stirile legate de tehnologie in sectiunea{" "}
                        <Link
                            to={"/category/technology"}
                            className="text-secondary"
                        >
                            Tech
                        </Link>
                    </p>
                </Container>
            </section>

            <section className="football my-5">
                <Container>
                    <h1 className="mb-5 pt-3">Football</h1>
                    {/* instantiem componenta care ne listeaza card-urile cu stiri din categoria football */}
                    <NewsCardList newsList={adaptedFootballData} />
                    <p>
                        Vezi toate stirile legate de fotbal in sectiunea{" "}
                        <Link
                            to={"/category/football"}
                            className="text-secondary"
                        >
                            Football
                        </Link>
                    </p>
                </Container>
            </section>

            <section className="business my-5">
                <Container>
                    <h1 className="mb-5 pt-3">Business</h1>
                    {/* instantiem componenta care ne listeaza card-urile cu stiri din categoria business */}
                    <NewsCardList newsList={adaptedBusinessData} />
                    <p>
                        Vezi toate stirile legate de business in sectiunea{" "}
                        <Link
                            to={"/category/business"}
                            className="text-secondary"
                        >
                            Business
                        </Link>
                    </p>
                </Container>
            </section>

            <section className="science my-5">
                <Container>
                    <h1 className="mb-5 pt-3">Politica</h1>
                    {/* instantiem componenta care ne listeaza card-urile cu stiri din categoria football */}
                    <NewsCardList newsList={adaptedScienceData} />
                    <p>
                        Vezi toate stirile legate de stiinta in politica{" "}
                        <Link
                            to={"/category/politics"}
                            className="text-secondary"
                        >
                            Politics
                        </Link>
                    </p>
                </Container>
            </section>

            <section className="science my-5">
                <Container>
                    <h1 className="mb-5 pt-3">sport</h1>
                    {/* instantiem componenta care ne listeaza card-urile cu stiri din categoria sport */}
                    <NewsCardList newsList={adaptedEnvironmentData} />
                    <p>
                        Vezi toate stirile legate de mediul inconjurator in sectiunea{" "}
                        <Link
                            to={"/category/sport"}
                            className="text-secondary"
                        >
                            Sport
                        </Link>
                    </p>
                </Container>
            </section>

            <section className="favorites my-5">
                <Container>
                    <h1 className="mb-5 pt-3">Favorites</h1>
                    {/* instantiem componenta care ne listeaza card-urile cu stiri din favorite */}
                    <NewsCardList newsList={adaptedFootballData} />
                    <p>
                        Vrei sa iti salvaezi toate stirile faorite pentru a le
                        vedea mai tarziu?
                    </p>
                    <p>
                        In cadrul fiecarei stiri gasesti un buton prin care poti
                        adauga stirea la favorite
                    </p>
                    <p>
                        Vezi sectiune:
                        <Link to={"/favorites"} className="text-secondary">
                            Favorite
                        </Link>
                        pentru a vedea stirile adaugate
                    </p>
                </Container>
            </section>
        </Layout>
    );
}
