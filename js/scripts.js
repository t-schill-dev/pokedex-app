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
        button.addEventListener('click', function(event) {
            showDetails(pokemon)
        });
    }

    // function addEvent(pokemon) {
    //     button.addEventListener('click', function(event) {
    //         showDetails(pokemon)
    //     });
    // }

    function loadList() {
        return fetch(apiURL).then(function(response) {
            return response.json();
        }).then(function(json) {
            // results refers to the key of the json object which contains the list
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

    function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url).then(function(response) {
            return response.json();
        }).then(function(details) {
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.types = details.types;
        }).catch(function(e) {
            console.log(e);
        });
    }
    // Is called by the event listener in addListItem function
    function showDetails(pokemon) {
        loadDetails(pokemon).then(function() {
            console.log(pokemon);
        });
    }

    // Simplified return statement when key === value e.g. add: add
    return {
        add,
        getAll,
        addListItem,
        loadList,
        loadDetails,
        showDetails

    };
})();

pokemonRepository.loadList().then(function() {
    pokemonRepository.getAll().forEach(function(pokemon) {
        pokemonRepository.addListItem(pokemon)
    });
});