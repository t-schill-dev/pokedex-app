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

    function add(pokemon) {
        if (typeof pokemon === 'object' &&
            Object.keys(pokemon).toString() === 'name,height,type') {
            return pokemonList.push(pokemon);
        }
    }

    function getAll() {
        return pokemonList;
    }
    return {
        add,
        getAll
    };
})();
// //Creates list before inner loop
// document.write(
//     "<ul class='pokemon-container'>"
// );
pokemonRepository.getAll().forEach(function(item) {
    // Distinguish items by height using a conditional
    let pokemonContainer = document.querySelector('ul');
    let listItem = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = item.name;
    button.classList.add('pokemon-item');
    listItem.appendChild(button);
    pokemonContainer.appendChild(listItem);
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
//     //Closes list tag
// document.write(
//     "</ul>"