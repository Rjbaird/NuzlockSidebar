function onOpen() {
    SpreadsheetApp.getUi().createMenu("Admin").addItem('Show Sidebar', 'showSidebar').addToUi();
}

function showSidebar() {
    const widget = HtmlService.createHtmlOutputFromFile('sidebar').setTitle("Nuzlock Generator")
    SpreadsheetApp.getUi().showSidebar(widget);
}

function getPokemonSprite(name) {
    let baseurl = `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`;
    let params = {
        'method': 'GET',
        'contentType': 'application/json'
    };
    try {
        let pokemonObject = JSON.parse(UrlFetchApp.fetch(baseurl, params));
        return pokemonSprite = pokemonObject.sprites.front_default;
    }
    catch (exception_var) {
        return pokemonSprite = `https://static.wikia.nocookie.net/pokemontowerdefense/images/c/ce/Missingno_image.png/revision/latest?cb=20180809204127`
    }
}

function getPokemonFromSpreadsheet() {
    var ss = SpreadsheetApp.getActive();
    var sheet = ss.getActiveSheet();
    var lastRow = sheet.getLastRow();
    var allPokemon = sheet.getRange(2, 2, lastRow - 1, 2).getValues();
    randomInt = getRndInteger(allPokemon.length)
    pokemonName = allPokemon[randomInt]
    console.log(pokemonName)
    return pokemonName
}

function getNewPokemon() {
    let randomPokemon = getPokemonFromSpreadsheet();
    let pokemonImage = getPokemonSprite(randomPokemon[0])
    randomPokemon.push(pokemonImage)
    return randomPokemon
}

function updateImage() {
    // return image
    return image = 'https://static.wikia.nocookie.net/pokemontowerdefense/images/c/ce/Missingno_image.png/revision/latest?cb=20180809204127'
}

function getRndInteger(max) {
    return Math.floor(Math.random() * (max));
}

