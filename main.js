

const searchButton = document.getElementById("find");
searchButton.addEventListener("click", findNation);

const searchInput = document.getElementById("looking_for_bar");
searchInput.addEventListener("keypress", handleKeyPress);
//console.log(searchInput);
const countryContainer = document.getElementById("main_box");
let query = "";

function handleKeyPress(event) {
    query = event.target.value;
    console.log("KEY PRESSED?", event.code);
    if (event.code === 13) {
        findNation();
    }
}

async function findNation() {
    searchInput.value = "";

    const errorMessage = document.getElementById("error-message");
    errorMessage.textContent = "";

    const previousSearchResult = document.getElementById("countryBox");
    if (previousSearchResult) {
        countryContainer.removeChild(previousSearchResult);
    }

    try {

        const url = `https://restcountries.eu/rest/v2/name/${query}?fullText=true`;
        const response = await axios.get(url);
        console.log(response.data[0].name);
        const countryData = response.data[0];

        console.log(countryData);

        const countryBox = document.createElement("div");
        countryBox.setAttribute("id", "countryBox");

        const flag = document.createElement("img");
        flag.setAttribute("src", countryData.flag);
        countryBox.appendChild(flag);

        const countryName = document.createElement("h1");
        countryName.textContent = countryData.name;
        countryBox.appendChild(countryName);

        const population = document.createElement("p");
        population.textContent = `${countryData.name} is situated in ${countryData.region}. It has a population of ${countryData.population} people.`;
        countryBox.appendChild(population);

        const capital = document.createElement("p");
        capital.textContent = `The capital is ${countryData.capital} ${formatCurrencies(countryData.currencies)}.`;
        countryBox.appendChild(capital);

        countryContainer.appendChild(countryBox);
    }catch(event) {
        console.error(event);
        errorMessage.textContent = `${query} is not a country. Please try again.`;
    }
}

function formatCurrencies(currencyArray) {
    const currencyOne = currencyArray[0];
    const currencyTwo = currencyArray[1];

    if (currencyArray.length === 1) {
        return `and you can pay with ${currencyOne.name}'s`;
    }
    if (currencyArray.length > 1) {
        return `and you can pay with ${currencyOne.name}'s and ${currencyTwo.name}'s`;
    }
}






















