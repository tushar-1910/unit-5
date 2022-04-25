let count = localStorage.getItem('count') || 1;
let url;
function getpokemon() {
    count++;
    localStorage.setItem('count',count);
    url = "https://pokeapi.co/api/v2/pokemon/";
    fetch(url).then(Response => {
        return Response.json()
    }).then(result => {
        console.log(result)
        console.log("here")
        localStorage.setItem('pokemonData', JSON.stringify(result.results))
    })
}

if(count == 1)
{
    getpokemon()
}
let pokemonData = JSON.parse(localStorage.getItem('pokemonData')) || [];

function display(pokemonData) {
    var number = 1;
    document.querySelector('tbody').innerHTML = "";
    pokemonData.forEach(pokemon => {
        var row = document.createElement('tr');

        var no = document.createElement('td');
        no.innerText = number++;

        var name = document.createElement('td');
        name.innerText = pokemon.name;

        row.append(no, name);
        document.querySelector('tbody').append(row);
    });
}

display(pokemonData)

function search() {
    event.preventDefault();
    var name = document.querySelector('#search').value;
    console.log(name)
    if (name == "") {
        alert("Enter valid name");
    }
    else {
        url = `https://pokeapi.co/api/v2/pokemon/${name}/`;
        fetch(url).then(Response => {
            return Response.json()
        }).then(result => {
            console.log(result);
            searchpokemon(result);
        })
    }
}

function searchpokemon(pokemon) {
    document.querySelector('#card').innerHTML = "";

    var id = document.createElement('h4');
    id.innerText = "Id: " + pokemon.id

    var name = document.createElement('h4');
    name.innerText = "Name: " + pokemon.name;

    var height = document.createElement('h4');
    height.innerText = "Height: " + pokemon.height;


    var weight = document.createElement('h4');
    weight.innerText = "Weight: " + pokemon.weight;

    var ability = document.createElement('h4');
    ability.innerText = "Abilities: "

    pokemon.abilities.forEach(data => {
        ability.innerText += data.ability.name + ", ";
    })

    var moves = document.createElement('h4');
    moves.innerText = "Moves: "

    pokemon.moves.forEach(data => {
        moves.innerText += data.move.name + ", ";
    })

    document.querySelector('#card').append(id, name, height, weight, ability, moves);

}