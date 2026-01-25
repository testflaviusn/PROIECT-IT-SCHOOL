// exportam functia care o sa primeasca ca si parametru o data in format string si returneaza data 
// intrun format dorit de noi

export function getFormattedDate(dateString) {
    // folosim constructorul date pt a transforma string-ul de data intr-un format de la care noi 
    // putem accesa diverse metode pt a afla informatii despre acea data

    const currentDate = new Date(dateString);

    let month = currentDate.getMonth();
    month +=1;

    let day = currentDate.getDay();
    const year = currentDate.getFullYear();

    // ne asiguram ca ziua si luna vor fi in format de genul: 01, 03, .... 09
    if(month < 10) {
        month = `0${month}`; 
    }

    if(day<10) {
        day = `0${day}`
    }

    return `${day}/${month}/${year}`;
}