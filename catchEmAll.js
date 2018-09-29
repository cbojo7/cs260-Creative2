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
            for(i=0;i<data.pokemon_entries.length;i++)
            {
                var lowerPoke = data.pokemon_entries[i].pokemon_species.name;
                var capPoke = lowerPoke.charAt(0).toUpperCase() + lowerPoke.slice(1);
                pokemonList.push(capPoke);
            }
            pokemonList.sort();

            autocomplete(document.getElementById("searchField"), pokemonList);
            console.log("Success!!!")
        },
        error:function(data) {
            console.log("Error in API request.")
        }
    })
    $("#seachBtn").click(function(e) {
        e.preventDefault();
        getGiphy();
        var searchIndex = $("#searchField").val();
        searchIndex = searchIndex.charAt(0).toLowerCase() + searchIndex.slice(1);
        myUrl = "https://pokeapi.co/api/v2/pokemon/" + searchIndex + "/";
        $.ajax({
            url:myUrl,
            success:function(data){
                var output = "<ul><li>" + data.name + "</li></ul>";
                $("#stats").html(output);
                console.log(output);
                console.log("Got him");
            },
            error:function(data) {
                console.log("Error in API request");
            }
        })
    })
})