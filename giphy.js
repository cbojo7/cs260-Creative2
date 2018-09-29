function getGiphy() {
    var url = "https://api.giphy.com/v1/gifs/search?q="+ $("#searchField").val() +" pokemon&api_key=qF6XRjYmYUwBhyQnzZsX9dyKtArA8XfH&limit=1"
    $.getJSON(url, function(data) {
        console.log(data.data[0].embed_url)
        newHtml = "<iframe src=\"" + data.data[0].embed_url + "\"></iframe> <p>Disclaimer: this may or may not be the correct pokemon gif. We are not responsible for what shows up.</p>"
        $("#giphy").html(newHtml);
    })
    .fail(function(jqXHR, textStatus, errorThrown) { 
    console.log('getJSON request failed! ' + textStatus); 
    console.log("incoming "+jqXHR.responseText);
  })
}