//GET /api/v2/evolution-chain/{id}/
//

// <script src="https://code.jquery.com/jquery-1.12.4.js"></script>
// <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
/*
Best Giphys:
Aritcuno, Rattata, Charizard, Caterpie



*/

var pokedexUrl="https://pokeapi.co/api/v2/pokedex/1/";
var pokemonList = [];
var statList = [10, 10, 10];
var price = "Select a Pokemon";
function toCapital(string) {
    return (string.charAt(0).toUpperCase() + string.slice(1));
}
$(document).ready(function() {
    $.ajax ({
        url:pokedexUrl,
        success:function(data){
            for(i=0;i<data.pokemon_entries.length;i++)
            {
                pokemonList.push(toCapital(data.pokemon_entries[i].pokemon_species.name));
            }
            pokemonList.sort();
            autocomplete(document.getElementById("searchField"), pokemonList);
            console.log("Success!!!");
        },
        error:function(data) {
            console.log("Error in API request.")
        }
    })
    $("#searchBtn").click(function(e) {
        e.preventDefault();
        getGiphy();
        var searchIndex = $("#searchField").val();
        myUrl = "https://pokeapi.co/api/v2/pokemon/" + searchIndex.toLowerCase() + "/";
        $.ajax({
            url:myUrl,
            success:function(pokeData){
                var output = "<h1>" + toCapital(pokeData.name) + "</h1>";
                output += "<h2># " + pokeData.id + "</h2>";
                output += "<h4>Common Moves:</h4><ul>";
                for(i=0; i < 3 && i < pokeData.moves.length; i++) {
                    output += "<li>" + toCapital(pokeData.moves[i].move.name) + "</li>";
                }

                output += "</ul>";
                output += "<h4>Evolution chain:<h4><ul>";
                $.ajax ({
                    url: pokeData.species.url,
                    success: function(speciesData) {
                        $.ajax ({
                            url: speciesData.evolution_chain.url,
                            success: function(evolutionData) {
                                var curData = evolutionData.chain;
                                console.log(output);
                                output += getEvolutions(curData);
                                console.log(output);
                                output += "</ul>";
                                $("#stats").html(output);
                                console.log(output);
                            },
                            error: function (e) {
                                output+= "<li>Error, evolutions not found.</li></ul>";
                            }
                        })
                    },
                    error: function(e) {
                        output+= "<li>Error, evolutions not found.</li></ul>";
                    }
                })
                console.log("Got him");
            },
            error:function(data) {
                console.log("Error in API request");
            }
        })
    })
})

function getEvolutions(curData) {
    var output = "<li class=\"family\" onClick=\"goToPokemon(" + getPokeNumber(curData.species.url) + ")\">"
    output += toCapital(curData.species.name) + "</li>";
    if (curData.evolves_to.length > 0)
        for(i=0;i < curData.evolves_to.length; i++)
            output += getEvolutions(curData.evolves_to[i]);
    return output;
}

function getPokeNumber(string) {
    var res = string.split("/");
    return res[6];
}

function goToPokemon(number) {
    var myUrl = "https://pokeapi.co/api/v2/pokemon/" + number + "/";
    $.ajax ({
        url: myUrl,
        success: function(data) {
            console.clear();
            $( "#searchField" ).val(toCapital(data.species.name));
            $("#searchBtn").click();
        }
    })
}

function calcPrice() {
    if(statList.size == 0) {
        return;
    } else {
        price = 0;
        for(i=0;i<statList.size;i++) {
            price += (statList[i] * 0.05);
        }
        $("priceTagText").text("$" + price);
    }
}