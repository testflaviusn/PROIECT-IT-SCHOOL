import { useState, useEffect } from "react";

//exportam custom hook-ul useFetch care va fi folosit
//  in toata aplicatia pentru a face call-uri catre server
export function useFetch(url) {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                setData(data);
            });
    }, [url]);

    return data;
}
