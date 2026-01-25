// aceasta componenta va afisa carduri cu stirile venita din props
import { Col } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { NewsCard } from "./NewsCard";

function NewsCardList(props) {
    const { newsList } = props;

    return (
        <Container>
            <Row>
                {/* o sa afisam o coloana cu stirei - mapand prin lista de stiri oar pt fiecare stire o sa afisam
                un card de bootstrap */}
                {newsList.map((currentIteratedNews) => {
                    return (
                        <Col
                            xs={12}
                            md={6}
                            lg={4}
                            className="mb-4"
                            key={currentIteratedNews.id}
                        >
                            {/* o sa folosim components NewsCard ce o sa primeasca toate datele despre stire */}
                            <NewsCard
                                newsId={currentIteratedNews.id}
                                imgSrc={currentIteratedNews.thumbnail}
                                title={currentIteratedNews.title}
                                description={currentIteratedNews.description}
                                hasCloseButton={
                                    currentIteratedNews.hasCloseButton
                                }
                            />
                        </Col>
                    );
                })}
            </Row>
        </Container>
    );
}

export default NewsCardList;
