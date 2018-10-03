var openTheMarket = "Locked";

$(document).ready(function() {
    $("#marketKey").click(function(e) {
        e.preventDefault();
        openTheMarket = "Key";
        console.log("Key inserted");
    })

    $("#marketUnlock").click(function(e) {
        e.preventDefault();
        if (openTheMarket == "Key") {
            unlockMarket();
            console.log("Market Unlocked");
        }
    })
})

function unlockMarket() {
    $("#title").attr("style","background-color:black; color:white");
    $("#titleText").text("Pokémon Black Market");
    $("#priceTag").attr("style","display:block");
    $("#priceTagText").text("Select a Pokémon");
    calcPrice();
}