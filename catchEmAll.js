//GET /api/v2/evolution-chain/{id}/
//

// <script src="https://code.jquery.com/jquery-1.12.4.js"></script>
// <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
/*
Best Giphys:
Aritcuno, Rattata, Charizard, Caterpie, Dragonite



*/

var pokedexUrl="https://pokeapi.co/api/v2/pokedex/1/";
var pokemonList = [];
var statList = [];
var statName = [];
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
                console.log(statName);
                output += "</ul>";

                //Add the output for the statblock.
                statList = [];
                statName = [];
                for(i=0; i < pokeData.stats.length; i ++) {
                    statList.push(pokeData.stats[i].base_stat);
                    statName.push(toCapital(pokeData.stats[i].stat.name));
                }
                output += "<h4>Stat Block:</h4><ul> ";
                for (i=0;i < (pokeData.stats.length); i ++) {
                    output += "<li>" + statName[i] + " " + statList[i] + "</li>";
                }
                output += "</ul>";
                calcPrice();


                $.ajax ({
                    url: pokeData.species.url,
                    success: function(speciesData) {
                        output += "<h4>Flavor Text:</h4><ul>";
                        var arrayer = speciesData.flavor_text_entries;
                        for(i= arrayer.length - 1; i > 0; i--) {
                            if(arrayer[i].language.name == "en") {
                                output += "<li>\"" + arrayer[i].flavor_text + "\" (" + toCapital(arrayer[i].version.name) + ")</li>";
                            }
                        }
                        output += "</ul>";
                        $.ajax ({
                            url: speciesData.evolution_chain.url,
                            success: function(evolutionData) {
                                output += "<h4>Evolution chain:<h4><ul>";
                                var curData = evolutionData.chain;
                                output += getEvolutions(curData);
                                output += "</ul>";
                                $("#stats").html(output);
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
    if(statList.length == 0) {
        return;
    } else {
        price = 0;
        var number = 0;
        for(i=0;i<statList.length;i++) {
            number = number + (statList[i]* 0.05);
        }
        var USDPrice;
        var myUrl = "https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD";
        $.ajax({
            url:myUrl,
            success: function(data) {
                USDPrice = Math.round((number * data.USD)* 100) / 100;
                $("#priceTagText").text(number + " Etherium (" + USDPrice + " USD)");
            }
        })
    }
}