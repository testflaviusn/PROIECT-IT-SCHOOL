//aici avem componenta reutilizabila newscard ce afiseaza o singura stire
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { removeFromFavorites } from "../store/actions";
import { useContext } from "react";
import { FavoritesContext } from "../store/context";
import "./NewsCard.css";
import useLocalStorageFavorites from "../utils/hooks/useLocalStorageFavorites";

export function NewsCard(props) {
    //extragem propsurile componentei
    const { newsId, title, description, imgSrc, hasCloseButton } = props;
    //extragem functia de dispatch pt favorite
    const { favoritesDispatch } = useContext(FavoritesContext);
    const [favoriteNews, setFavoriteNews] = useLocalStorageFavorites(
        "favorites",
        null,
        "REMOVE",
    );

    function handleRemoveFromFavorites(id) {
        //apelam actiunea de stergere de la favorite
        const actionResult = removeFromFavorites(id);
        //trimitem rezultatul actiunii catre reducer
        favoritesDispatch(actionResult);

        const news = {
            id: props.newsId,
            thumbnail: props.imgSrc,
            title,
            hasCloseButton,
            description,
        };
        setFavoriteNews(news);
    }

    return (
        <Card className="NewsCard h-100 d-flex justify-content-between flex-column align-items-center">
            {/* la click pe continutul cardului se va deschide pagina cu stirea singulara */}
            {/* caracterul backslash din id-ul stirii il deruteaza - asadar il codificam */}
            <Link to={`/news/${encodeURIComponent(newsId)}`}>
                <Card.Img src={imgSrc} variant="top" />
                <Card.Body>
                    <Card.Title>{title}</Card.Title>
                    <Card.Body>{description}</Card.Body>
                </Card.Body>
            </Link>
            {/* daca avem buton de stergere de lafavorite atunci il afisam */}
            {hasCloseButton && (
                <Button
                    variant="light"
                    onClick={() => {
                        handleRemoveFromFavorites(newsId);
                    }}
                >
                    <span className="material-icons text-dark">close</span>
                </Button>
            )}
        </Card>
    );
}
