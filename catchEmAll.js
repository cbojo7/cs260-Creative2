//GET /api/v2/evolution-chain/{id}/
//

var pokedexUrl="https://pokeapi.co/api/v2/pokedex/1/";
$(document).ready(function() {
    $( "#searchBtn" ).keyup(function() {
        $.ajax ({
            url:pokedexUrl,
            type:GET,
            dataType:JSON,
            success:function(data){
                e.preventDefault;
                var output = "<ul>";
                $.each(data, function(i,item) {
                    output+= "<li>" + data.pokemon_entries[i].name + "</li>";
                })
                output += "</ul>";
                $("#pokeList").html(output);
                console.log("Success!!!")
            },
            error:console.log("Error in API request.")
        })
    })
})