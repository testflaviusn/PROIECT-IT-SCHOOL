import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import { getNewsDetailsEndpoint } from "../api/endpoints";
import { useFetch } from "../utils/hooks/useFetch";
import { getNewsDetails } from "../api/adaptors";
import { getFormattedDate } from "../utils/date";
import { Button, Col, Container, Row } from "react-bootstrap";
import "./NewsDetails.css";
import { addToFavorites } from "../store/actions";
import { useContext, useState } from "react";
import { FavoritesContext } from "../store/context";
import Alert from "../utils/CustomAlert";
import useLocalStorageFavorites from "../utils/hooks/useLocalStorageFavorites";

export default function NewsDetails() {
    // extragem functia ce poate modifica state-ul global de stiri favorite
    const { favoritesDispatch } = useContext(FavoritesContext);
    // extragem parametrul cu iduyl stirii din url
    let { newsId } = useParams();
    // trebuie sa decodam id-ul extras din url pt ca sa contina si backslash-urile
    newsId = decodeURIComponent(newsId);
    //ne generam endpointul pt a face call-ul catre serverul de la the guardian cu stirea singulara
    const newsDetailsEndpoint = getNewsDetailsEndpoint(newsId);
    // facem call actre server
    const newsDetails = useFetch(newsDetailsEndpoint);
    //folosimns design patternul de adaptor o sa importam functia getNewsDetails pentru a adapta datele
    const adaptedNewsDetails = getNewsDetails(newsDetails);

    //facem un object destructuring pentru a lua cheile din datele adaptate
    const { date, title, description, image, content, author, thumbnail } =
        adaptedNewsDetails;

    // formatam data utilizand utilitarul din utile(date)
    const formattedDate = getFormattedDate(date);

    const [alertMessage, setAlertMessage] = useState("");
    const [favoriteNews, setFavoriteNews] = useLocalStorageFavorites(
        "favorites",
        null,
        "ADD",
    );

    function handleAddToFavorites(news) {
        // apelam actiunea de adaugare la favorite
        const actionResult = addToFavorites(news);
        // trimitem rezultatul actiunii catre reducer
        favoritesDispatch(actionResult);

        // adaugam la favorite in state
        setFavoriteNews(news);

        //afisam alerta
        setAlertMessage("Stirea a fost adaugata la favorite!");
    }

    return (
        <Layout>
            <Container className="my-5 newsDetails">
                <Row className="d-flex justify-content-center">
                    <Col xs={12} lg={8}>
                        <h1 className="pt-3 mb-5">{title}</h1>
                        <p className="fw-bold">{description}</p>
                        {/* de la api the guardian imaginea o sa vina sub forma de tag-uri de html
                        (<figure>) iar pt a afisa html intr-o componenta de react avem nevoie de un prop special
                        si anume de dangerouslySetInnerHTML*/}
                        <div
                            dangerouslySetInnerHTML={{ __html: image }}
                            className="mb-4"
                        ></div>
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <div className="fw-bold">
                                <p>{author}</p>
                                <p className="mb-0">{formattedDate}</p>
                            </div>
                            <Button
                                onClick={() => {
                                    // construim payloadul actiunii pentru adaugare la favorite si apelam o functie
                                    // ce o sa trimita actiunea la reducer
                                    const newsPayload = {
                                        id: newsId,
                                        thumbnail,
                                        title,
                                        description,
                                        hasCloseButton: true,
                                    };
                                    handleAddToFavorites(newsPayload);
                                }}
                            >
                                Adauga la favorite
                            </Button>
                            {alertMessage && (
                                <Alert
                                    message={alertMessage}
                                    onClose={() => setAlertMessage("")}
                                />
                            )}
                            {/* pentru ca content-ul de la api este sub aceiasi forma vom insera la fel ca imaginea */}
                        </div>
                        <div
                            dangerouslySetInnerHTML={{ __html: content }}
                        ></div>
                    </Col>
                </Row>
            </Container>
        </Layout>
    );
}
