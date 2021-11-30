var ss = SpreadsheetApp.getActive();
var sheet = ss.getActiveSheet();
var lastRow = sheet.getLastRow();
var lastCol = sheet.getLastColumn();
var allData = sheet.getRange(2, 2,lastRow, lastCol)
var allPokemon = sheet.getRange(2, 2, lastRow - 1, 4).getValues();

function onOpen(e) {
  SpreadsheetApp.getUi()
  .createMenu("Nuzlock Menu")
  .addItem('Show Sidebar', 'showSidebar')
  .addToUi();
}

function onEdit(e) {
  sortSheet();
}

function showSidebar() {
  const widget = HtmlService.createHtmlOutputFromFile('sidebar').setTitle("Nuzlock Generator")
  SpreadsheetApp.getUi().showSidebar(widget);
}



function getPokemonSprite(name) {
  let cleanName = name.trim().replace(' ', '-').toLowerCase()
  let baseurl = `https://pokeapi.co/api/v2/pokemon/${cleanName}`;
  let params = {
    'method': 'GET',
    'contentType': 'application/json'
  };
  try {
    let pokemonObject = JSON.parse(UrlFetchApp.fetch(baseurl, params));
    return pokemonSprite = pokemonObject.sprites.front_default;
  }
  catch (exception_var) {
    return pokemonSprite = `https://upload.wikimedia.org/wikipedia/en/b/b7/Missingno.png`
  }
}


function getPokemonFromSpreadsheet() {
  randomInt = getRndInteger(allPokemon.length);
  pokemonName = allPokemon[randomInt];
  pokemonName.push(randomInt + 2);
  return pokemonName;
}

function getNewPokemon() {
  let randomPokemon = getPokemonFromSpreadsheet();
  console.log(randomPokemon)
  if (randomPokemon[3] === false) {
    let cell = sheet.getRange(`E${randomPokemon[4]}`);
    cell.setValue(true);
    let pokemonImage = getPokemonSprite(randomPokemon[0]);
    randomPokemon.push(pokemonImage);
    console.log(randomPokemon)
    return randomPokemon;
  } else {
    getNewPokemon();
  }
  // sortSheet();
}

function updateImage() {
  // return image
  return image = 'https://static.wikia.nocookie.net/pokemontowerdefense/images/c/ce/Missingno_image.png/revision/latest?cb=20180809204127'
}

function getRndInteger(max) {
  return Math.floor(Math.random() * (max));
}

function sortSheet() {
  allData.sort([{column: 5, ascending: false}, {column: 4, ascending: true}])
}
