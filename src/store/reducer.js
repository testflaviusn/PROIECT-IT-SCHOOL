// exportam state-ul initial
export const initialState = {
    news: [],
};

// definim si exportam reducerul ce se ocupa de updatarea state-ului in functie de actiuni

export function favoritesReducer(state, action) {
    switch (action.type) {
        case "ADD_TO_FAVORITES": {
            // cautam stirea adaugata la favorite in state-ul curent
            const isInList = state.news.find((currentNews) => {
                return currentNews.id === action.payload.id;
            });

            // Daca am gasit stirea nu facem nimic returnam state-ul initial care o include deja
            if (isInList) {
                return state;
            } else {
                // Adaugam stirea in lista de favorite la inceput
                const newState = {
                    news: [action.payload, ...state.news],
                };

                return newState;
            }
        }
        case "REMOVE_FROM_FAVORITES": {
            // filtram stirile din state, eliminand-o pe cea care are id-ul venit pe action.payload
            const filteredNews = state.news.filter((currentNews) => {
                return currentNews.id !== action.payload;
            });

            const newState = {
                news: filteredNews,
            };

            return newState;
        }

        default: {
            return state;
        }
    }
}
