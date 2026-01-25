import { useContext } from "react";
import Layout from "../components/Layout";
import { Container } from "react-bootstrap";
import NewsCardList from "../components/newsCardList";
import { FavoritesContext } from "../store/context";

export default function Favorites() {
    //extragem state-ul de stiri favorite
    const { favoritesState } = useContext(FavoritesContext);

    //extragem cheia news de pe state
    const { news } = favoritesState;
    return (
        <Layout>
            <Container className="my-5">
                <h1 className="mb-5 pt-3">Stirile tale favorite</h1>
                {/* daca nu avem stiri afisam un mesaj altfel listam stirile */}
                {!news || news.length === 0 ? (
                    <p>Momentan nu ai nici o stire favorita</p>
                ) : (
                    <NewsCardList newsList={news} />
                )}
            </Container>
        </Layout>
    );
}
