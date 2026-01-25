import Footer from "./Footer";
import Header from "./Header";
import "./Layout.css";

export default function Layout(props) {
    return (
        <div className="layout">
            <Header />
            {/* intre header si footer afisam copii primiti de catre componenta layout */}
            <main>{props.children}</main>
            <Footer />
        </div>
    );
}
