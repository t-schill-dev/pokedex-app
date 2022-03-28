//Limited accessibility through IIFE
let pokemonRepository = (function() {

    let pokemonList = [{
            name: 'Bulbasaur',
            height: 7,
            type: ['grass', 'poison']
        },
        {
            name: 'Charmander',
            height: 0.6,
            type: 'fire'
        },
        {
            name: 'Venusaur',
            height: 2,
            type: ['grass', 'poisson']
        },
        {
            name: 'Nidoking',
            height: 1.4,
            type: ['ground', 'poison']
        }
    ];
    // add Pokemon to list and validate its input keys
    function add(pokemon) {
        if (typeof pokemon === 'object' &&
            Object.keys(pokemon).toString() === 'name,height,type') {
            return pokemonList.push(pokemon);
        } else {
            console.log('pokemon needs name, height, type');
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
    // Simplified return statement when key === value e.g. add: add
    return {
        add,
        getAll,
        addListItem
    };
})();

pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
})

//         if (item.height > 1) {
//             document.write(
//                 "<li class='pokemon-item'>" +
//                 item.name +
//                 " (height: " +
//                 item.height +
//                 "m ) " +
//                 "- That's really big!" +
//                 "</li>"
//             );
//         } else {
//             document.write(
//                 "<li class='pokemon-item'>" +
//                 item.name +
//                 " (height: " +
//                 item.height +
//                 "m ) " +
//                 "</li>"
//             );
//         }
//     })