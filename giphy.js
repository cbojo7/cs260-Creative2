$(document).ready(function() {
    $("#searchBtn").click(function(e) {
        e.preventDefault();
        var url = "https://api.giphy.com/v1/gifs/search?q="+ $("#searchField").val() +"&api_key=qF6XRjYmYUwBhyQnzZsX9dyKtArA8XfH&limit=1"
        $.getJSON(url, function(data) {
            $("#giphy").html("<img src=" + data.data.embed_url + ">");
        })
        .fail(function(jqXHR, textStatus, errorThrown) { 
        console.log('getJSON request failed! ' + textStatus); 
        console.log("incoming "+jqXHR.responseText);
      })
    
    })
})