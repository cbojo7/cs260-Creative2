//GET /api/v2/evolution-chain/{id}/
//

// <script src="https://code.jquery.com/jquery-1.12.4.js"></script>
// <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
  

var pokedexUrl="https://pokeapi.co/api/v2/pokedex/1/";
var pokemonList = [];
$(document).ready(function() {
    $.ajax ({
        url:pokedexUrl,
        success:function(data){
            console.log(data);
            for(i=0;i<data.pokemon_entries.length;i++)
            {
                pokemonList.push(data.pokemon_entries[i].pokemon_species.name);
            }
            pokemonList.sort();
            
            console.log("Success!!!")
        },
        error:function(data) {
            console.log("Error in API request.")
        }
    })
    var output = "<ul>";
    for(i=1;i<pokemonList.length;i++)
    {
        output += "<li>" + pokemonList[i] + "</li>"
    }
    output += "</ul>";
    $("#pokeList").html(output);
    console.log(pokemonList.length);
})