var openTheMarket = "Locked";

$("#marketKey").click(function(e) {
    e.preventDefault();
    openTheMarket = "Key";
})

$("#marketUnlock").click(function(e) {
    e.preventDefault();
    if (openTheMarket == "Key") {
        unlockMarket()
    }
})

function unlock() {
    $("#title").attr("background-color","black");
    $("#title").attr("color","white");
    $("#titleText").text("Pokemon Black Market");
}