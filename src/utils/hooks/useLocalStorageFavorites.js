import { useState } from "react";

// Primim ca parametri numele cheii si valoarea acesteia.
export default function useLocalStorageFavorites(key, value, action) {
    // Extragem valoarea din localStorage asociata cheii primite.
    const localStorageItem = localStorage.getItem(key);
    // Parsam valoarea extrasa. Daca aceasta are valoarea null inseamna ca nu exista in localStorage.
    // Daca nu avem valoare asociata cheii in localStorage, starea initiala va fi valoarea primita ca argument sau array gol
    const initialState = localStorageItem ? JSON.parse(localStorageItem || value) : [] ;

    // Initializam state-ul state-ul.
    const [state, setState] = useState(initialState);

    // Cream o functie care modificia valoarea din localStorage si actualizeaza si state-ul.
    function setStateAndLocalStorage(value) {
        // in functie de action vom adauga sau scoate din state si storage
        let updatedState;

        switch (action) {
            case "ADD": {
                //daca initial state e null setam un array cu elementul value in el si setam sate si storage
                if (!initialState) {
                    updatedState = [value];
                } else {
                    //daca state nu e null adaugam in array elementul value si setam state si storage din nou
                    const foundElement = initialState.find(
                        (elem) => elem.id === value.id,
                    );
                    if (foundElement) {
                        //daca elementul este deja in array nu facem nimic
                        return;
                    } else {
                        // daca nu exista in array il adaugam, setam state si storage cu noul array
                        updatedState = [...initialState, value];
                    }
                }
                break;
            }
            case "REMOVE": {
                // cautam dupa value.id si o scoatem din lista..setam state cu noua lista si storage
                updatedState = initialState.filter(
                    (elem) => elem.id !== value.id,
                );
                break;
            }
            default: {
                return state;
            }
        }

        setState(updatedState);
        localStorage.setItem(key, JSON.stringify(updatedState));
    }

    // Returnam state-ul si functia care actualizeaza state-ul + valoare din localStorage.
    return [state, setStateAndLocalStorage];
}
