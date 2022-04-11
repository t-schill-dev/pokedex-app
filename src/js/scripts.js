//Limited accessibility through IIFE
let pokemonRepository = (function() {

    let pokemonList = [];
    let apiURL = "https://pokeapi.co/api/v2/pokemon/?limit=150";

    // add Pokemon to list and validate its input keys
    function add(pokemon) {
        if (typeof pokemon === "object") {
            return pokemonList.push(pokemon);
        }
    }

    function filter(name) {
        return pokemonList.filter(pokemonList => pokemonList.name === name);
    }

    function getAll() {
        return pokemonList;
    }

    // Function to capitalize first letter of pokemon name
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    function findPokemon(searchName) {
        //jQuery syntax
        //clear all buttons on page when user types in search box
        $("#pokemon-list").empty();

        //Add pokemon buttons in which the name includes the search string
        pokemonList.forEach(pokemon => {
            if (
                capitalizeFirstLetter(pokemon.name).indexOf(
                    capitalizeFirstLetter(searchName)
                ) > -1
            ) {
                addListItem(pokemon);
            }
        });
    }


    function addListItem(pokemon) {

        //Create listItem divs, and button
        let listItem = document.createElement("div");
        let button = document.createElement("button");

        //set bootstrap classes to divs
        $(listItem).addClass("list-group-item col-lg-4 col-md-6 col-sm-12");

        // Classes and attributes for button
        $(button).text(pokemon.name);
        $(button).addClass("btn btn-block pokemon-btn");
        $(button).attr("type", "button");
        $(button).attr("data-toggle", "modal");
        $(button).attr("data-target", "#pokemon-modal");

        // Append items to DOM elements
        $(listItem).append(button);
        $("#pokemon-list").append(listItem);

        // Show details of clicked Pokemon
        $(button).on("click", () => {
            showDetails(pokemon);
        });
    }

    function loadList() {
        return fetch(apiURL).then(function(response) {
            return response.json();
        }).then(function(json) {
            // results refers to the key of the json object which contains the list
            json.results.forEach(function(item) {
                let pokemon = {
                    name: capitalizeFirstLetter(item.name),
                    detailsUrl: item.url
                };
                add(pokemon);
            });
        }).catch(function(e) {
            console.log(e);
        });
    }

    function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url).then(function(response) {
            return response.json();
        }).then(function(details) {
            item.imageUrl = details.sprites.other.dream_world.front_default;
            item.height = details.height;
            item.types = details.types;
            return item;
        }).catch(function(e) {
            console.log(e);
        });
    }

    // Create modal with details
    function showModal(pokemonInfo) {
        $(".modal-title").empty().append(pokemonInfo.name);
        $(".modal-body_image").attr("src", pokemonInfo.imageUrl);
        $(".modal-body_attributes").empty().append("Height: " + pokemonInfo.height + "m, " +
            "Type: " + pokemonInfo.types[0].type.name);
    }

    // Is called by the event listener in addListItem function
    function showDetails(pokemon) {
        loadDetails(pokemon).then((pokemonInfo) => {
            showModal(pokemonInfo);
        });
    }

    // Simplified return statement when key === value e.g. add: add
    return {
        add,
        getAll,
        addListItem,
        loadList,
        loadDetails,
        showDetails,
        findPokemon,
        filter

    };
})();

pokemonRepository.loadList().then(function() {
    pokemonRepository.getAll().forEach(function(pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});