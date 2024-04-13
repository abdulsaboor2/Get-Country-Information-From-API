document.addEventListener('DOMContentLoaded', function () {
    // Function to make AJAX request from the restcountries API
    function getCountryInfo(countryName) {
        const API = `https://restcountries.com/v3.1/name/${countryName}`;

        fetch(API)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to fetch data. Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                updateCountryInfo(data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                displayErrorMessage('Failed to get Country! Please, Enter Correct Information.');
            });
    }

    // Function to update the DOM with country information
    function updateCountryInfo(data) {
        const countryInfoContainer = document.getElementById('country-info-container');

        // Clear previous search results   
	    countryInfoContainer.innerHTML = '';

        if (data.length > 0) {
            const country = data[0];
            const countryName = country.name.common;
            const population = country.population;
            const area = country.area;
            const capital = country.capital ? country.capital[0] : 'N/A';
            const languages = country.languages ? Object.values(country.languages) : ['N/A'];
            const flagContainer = country.flags ? `<div class="flag-container"><img src="${country.flags.png}" alt="${countryName} Flag"></div>` : '';
            const officialName = country.name.official ? country.name.official : 'N/A';
            const currency = country.currencies ? Object.values(country.currencies).map(currency => currency.name + " (" + currency.symbol +")") : 'N/A';

            const countryHTML = `
                <h2>${countryName}</h2>
                ${flagContainer}
                <p>Official Name: ${officialName}</p>
                <p>Population: ${population}</p>
                <p>Area: ${area} km²</p>
                <p>Capital: ${capital}</p>
                <p>Languages: ${languages.join(', ')}</p>
                <p>Currency: ${currency}</p>
            `;

            countryInfoContainer.innerHTML = countryHTML;

            const clearButton = document.createElement('button');
            clearButton.innerText = 'Clear Data';
            clearButton.addEventListener('click', function () {
                countryInfoContainer.innerHTML = '';
            });

            countryInfoContainer.appendChild(clearButton);
        } else {
            displayErrorMessage('Country is not found. Please enter a valid country name.');
        }
    }


    // Function to display error messages
    function displayErrorMessage(message) {
        const errorContainer = document.getElementById('error-message-container');
        errorContainer.innerText = message;
    }

    // Event listener for the form submission
    document.getElementById('searchForm').addEventListener('submit', function (event) {
        event.preventDefault();

        const countryInput = document.getElementById('countryInput');
        const countryName = countryInput.value.trim(); //trim removes whitespace and returns a new string, without update original string

        if (countryName !== '') {
            getCountryInfo(countryName);
        } else {
            displayErrorMessage('Please Enter a Country Name.');
        }
    });

    // Add event listener for double-click on the search input
    const countryNameInput = document.getElementById('countryInput');
    countryNameInput.addEventListener('dblclick', function () {
        this.value = ''; // Clear the search bar on double-click
    });

    // Example: Fetch information for a specific country (e.g., Saudi Arabia) on page load
    getCountryInfo('Saudi Arabia');
   
    // if (countryName !== '') {
    //     getCountryInfo(countryName);
    // } else {
    //     // Clear any existing error messages
    //     displayErrorMessage('');
    // }
});
