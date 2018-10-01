//GET /api/v2/evolution-chain/{id}/
//

// <script src="https://code.jquery.com/jquery-1.12.4.js"></script>
// <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
  

var pokedexUrl="https://pokeapi.co/api/v2/pokedex/1/";
var pokemonList = [];
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
                output += "<h2>Common Moves:</h2><ul>";
                for(i=0; i < 3; i++) {
                    output += "<li>" + toCapital(pokeData.moves[i].move.name) + "</li>";
                } 
                output += "</ul>";
                output += "<h2>Evolutions:<h2><ul>";
                $.ajax ({
                    url: pokeData.species.url,
                    success: function(speciesData) {
                        $.ajax ({
                            url: speciesData.evolution_chain.url,
                            success: function(evolutionData) {
                                for (i=0; i < evolutionData.chain.evolves_to.length; i++) {
                                    output += "<li class=\"evolution\" onClick=\"goToPokemon(" + getPokeNumber(evolutionData.chain.evolves_to[i].species.url) + ")\">"
                                    output += toCapital(evolutionData.chain.evolves_to[i].species.name) + "</li>";
                                }
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

function getPokeNumber(string) {
    return 134;
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