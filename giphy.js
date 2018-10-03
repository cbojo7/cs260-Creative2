function getGiphy() {
    var url = "https://api.giphy.com/v1/gifs/search?q="+ $("#searchField").val() +" pokemon&api_key=qF6XRjYmYUwBhyQnzZsX9dyKtArA8XfH&limit=1"
    $.getJSON(url, function(data) {
        var i = 0;
        // var pokeName = $("#searchField").val()
        // if (pokeName.toLowerCase() == "vaporeon") {i=2;}
        console.log(i);
        console.log(data.data[i].embed_url)
        newHtml = "<iframe src=\"" + data.data[i].embed_url + "\"></iframe> <p>Disclaimer: this may or may not be the correct pokemon gif. We are not responsible for what shows up.</p>"
        $("#giphy").html(newHtml);
    })
    .fail(function(jqXHR, textStatus, errorThrown) { 
    console.log('getJSON request failed! ' + textStatus); 
    console.log("incoming "+jqXHR.responseText);
  })
}