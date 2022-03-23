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
//Creates list before inner loop
document.write(
    "<ul class='pokemon-container'>"
);
for (let i = 0; i < pokemonList.length; i++) {

    // Distinguish items by height using a conditional
    if (pokemonList[i].height > 1) {
        document.write(
            "<li class='pokemon-item'>" +
            pokemonList[i].name +
            " (height: " +
            pokemonList[i].height +
            "m ) " +
            "- That's really big!" +
            "</li>"
        );
    } else {
        document.write(
            "<li class='pokemon-item'>" +
            pokemonList[i].name +
            " (height: " +
            pokemonList[i].height +
            "m ) " +
            "</li>"
        );
    }

}
//Cloeses list tag
document.write(
    "</ul>"
);