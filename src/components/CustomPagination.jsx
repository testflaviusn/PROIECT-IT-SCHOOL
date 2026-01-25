// componenta Pagination o sa primeasca 2 props : activePage(pag curenta) si baseUrl(url
// complet al paginii pe care trebuie sa o deschida)
import { useNavigate } from "react-router-dom";
import { Pagination } from "react-bootstrap";
import "./Pagination.css";

export function CustomPagination(props) {
    // facem destructuring la props
    const { baseurl } = props;
    let { activepage } = props;
    // ca sa pastram aceiasi functionalitate de la componenta Link(fara refresh la pagina) o sa
    // folosim hook-ul de useNavigate din react
    const navigate = useNavigate();
    //daca nu se primeste nici o valoare pentru prop-ul activePage inseamna ca pagina 1 este activa
    if (!activepage) {
        activepage = 1;
    }

    // o sa pastram intr-un array toate paginile pe care os a le trimitem mai departe la paginarea din boostrap
    let items = [];
    // o sa folosim un for pentru a construi cele 5 numerotari
    for (let number = 1; number <= 5; number++) {
        // la fiecare iteratie in fo vom pface push in items cu o componenta de BootstrapPagination.Item
        items.push(
            <Pagination.Item
                key={number}
                // propul active va fi true daca pag curenta e cea activa
                active={number === Number(activepage)}
                // daca pagina este activa adaugam un id pentru stilizare
                id={activepage ? "pagination-active" : null}
                onClick={() => {
                    // la click pe nr paginii se navigheaza catre noua pagina
                    navigate(`${baseurl}?page=${number}`);
                    //si apoi scrolam inapi la inceputul paginii
                    window.scrollTo({
                        top: 0,
                        behavior: "smooth",
                    });
                }}
            >
                {number}
            </Pagination.Item>,
        );
    }

    return (
        <div className="d-flex justify-content-center">
            {/* pentru a afisa item de numerotare de mai sus folosim componenta boostrappagination */}
            <Pagination className="Pagination">{items}</Pagination>
        </div>
    );
}
