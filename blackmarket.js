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
    $("#titleText").text("Team Rocket's Pokémon Black Market");
    $("#priceTag").attr("style","display:block");
    $("#priceTagText").text("Select a Pokémon");
    $("body").attr("style","background-image: url(\"images/Rocket-img2.png\");background-size: 100%;")
    calcPrice();
}

function blastOff() {
    alert("Thank you for your purchase! \nTeam Rocket is Blasting off again!")
}