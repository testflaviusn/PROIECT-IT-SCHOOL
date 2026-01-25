import Page404 from "./pages/Page404";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import NewsCategory from "./pages/NewsCategory";
import NewsDetails from "./pages/NewsDetails";
import { FavoritesContext } from "./store/context";
import { favoritesReducer } from "./store/reducer";
import { useReducer } from "react";
import useLocalStorageFavorites from "./utils/hooks/useLocalStorageFavorites";

// definim rutele similar cu ce am facut la sedinta de react routing
// create browserrouter e folosit pt a ne defini rutele si asteapta ca argument un array de rute
// fiecare ruta va fi specificata intr-un obiect
const routes = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
        errorElement: <Page404 />,
    },
    {
        path: "/favorites",
        element: <Favorites />,
    },
    {
        path: "/category/:categoryId",
        // category id este idul categoriei de stiri
        element: <NewsCategory />,
    },
    {
        path: "/news/:newsId",
        // newsid este parametrul folosit in componenta newsdetails pt a afisa date despre o stire anume
        element: <NewsDetails />,
    },
]);

function App() {
    // facem store-ul de stiri favorite disponibil in intreaga aplicatie din componenta principala
    //initializam reducerul pentru stiri favorite.
    const [state] = useLocalStorageFavorites("favorites");
    const [favoritesState, favoritesDispatch] = useReducer(favoritesReducer, {
        news: state,
    });
    // cream contextul ce il vom pasa ca valoare pentru context provider
    const favoritesContextValue = {
        favoritesState,
        favoritesDispatch,
    };

    return (
        <div className="App">
            <FavoritesContext.Provider value={favoritesContextValue}>
                {/* adaugam providerul de rute astfel incat sa le facem disponibile in intreaga aplicatie */}
                <RouterProvider router={routes} />
            </FavoritesContext.Provider>
        </div>
    );
}

export default App;
