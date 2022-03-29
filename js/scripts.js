//Limited accessibility through IIFE
let pokemonRepository = (function() {

    let pokemonList = [];
    let apiURL = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    // add Pokemon to list and validate its input keys
    function add(pokemon) {
        if (typeof pokemon === 'object') {
            return pokemonList.push(pokemon);
        }
    }

    function getAll() {
        return pokemonList;
    }

    function showDetails(pokemon) {
        console.log(pokemon);
    }

    function addListItem(pokemon) {
        // Create button for each pokemon passed on
        let pokemonContainer = document.querySelector('ul');
        let listItem = document.createElement('li');
        let button = document.createElement('button');
        button.innerText = pokemon.name;
        button.classList.add('pokemon-item');
        listItem.appendChild(button);
        pokemonContainer.appendChild(listItem);
        // Show details of clicked Pokemon
    }

    function addEvent(button, pokemon) {
        button.addEventListener('click', showDetails(pokemon));
    }

    function loadList() {
        return fetch(apiURL).then(function(response) {
            return response.json();
        }).then(function(json) {
            json.results.forEach(function(item) {
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                };
                add(pokemon);
            });
        }).catch(function(e) {
            console.log(e);
        })
    }
    // Simplified return statement when key === value e.g. add: add
    return {
        add,
        getAll,
        addListItem,
        loadList
    };
})();

pokemonRepository.loadList().then(function() {
    pokemonRepository.getAll().forEach(function(pokemon) {
        pokemonRepository.addListItem(pokemon)
    });
});