$("#recipeMaster") //load recipe data that was exported as a JSON.

var recipeArray = []



var displayTitle = "title .js function error"
var displayList = "<ul>test1</ul><ul>test2</ul>";
var displayInstructions = "<li>step test</li>step2 test<li>";
var displayImage = "error loading image";
var dropBarContents = document.getElementById("meals")



function recipe(key) { // called on a recipe's ID pulls all required input from recipeMaster.
    this.url = recipeMaster.url[key];
    this.title = recipeMaster.title[key];
    this.ingredients = recipeMaster.ingredientRows[key];
    this.instructions = recipeMaster.instructions[key];
    this.src = recipeMaster.images[key];
    
}

// 1.0 - Code implementing the navigation bar.

// *** 1.1 load dropbarContents values from recipe titles in recipeMaster.
var dropList = [];
for (var i=1; i < Object.keys(recipeMaster.title).length; i++){
    if (typeof recipeMaster.title[i] == "string"){
    dropList.push(recipeMaster.title[i]);}
}
$("#meals").html("<option>" + (dropList.length) + " recipes available</option>");

for (var i=0; i < dropList.length; i++) {
    $("#meals").append('<option value="' + (i+1) + '">' + dropList[i] + "</option>")}



//functions for loading a random recipe.

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}
function randomRecipe() {
    updatePage(getRandomInt(dropList.length));
}

// event listeners for ranomizer and dropmenu.

document.getElementById('meals').addEventListener("change", function(e) {
    menuSelection = document.getElementById("meals").value
    updatePage(parseInt(menuSelection))
}, false);

document.getElementById("random").addEventListener("click", function(){randomRecipe()});

//JQuery to dynamically format and display recipes. 

function formatIngredientList(){ // joins sets of quantity, unit, and ingredient to form a displayable html list.
    $("#displayIngredients").html("<ul id='plugged'></ul>")
    for (var i=0; i < (Object.keys(recipeArray.ingredients).length); i++){
        plug = "<span style='display: block;'>"
        for (var j= 0; j < recipeArray.ingredients[i].length; j++){
            plug += recipeArray.ingredients[i][j] + "   "
        }
        plug += "</span>"
        $("#plugged").prepend("<li>" + plug + "</li>");
}}

function formatInstructions(){ // formats instructions into a displayable html list.
    $("#instructions").html("")
    console.log("recipeArray.ingredients type =" + typeof recipeArray.ingredients)
    for (var i=0; i < Object.keys(recipeArray.instructions).length; i++){
        if (recipeArray.instructions[i] != undefined){
            $("#instructions").prepend("<li>" + recipeArray.instructions[i] + "<br><br></li>");}
    }
}


function displayRecipe(){ // updates the domain to display a new recipe.
    $("#title").text(recipeArray.title)
    formatInstructions();
    formatIngredientList();
    $("#source").html("<a href='" + recipeArray.url + "'>" + recipeArray.url + "</a>")
    $("#image1").html("<img src='" + recipeArray.src[0] + "' width='280'>")
    $("#image2").html("<img src='" + recipeArray.src[1] + "' width='450'>")
}

function updatePage(n){
    recipeArray = new recipe(n);
    displayRecipe();
}

//JQuery UI autocomplete search to allow easy discoverability of recipes by title.
$("#titleSearchInput").autocomplete({
    source:dropList,
    minLength: 2,
    close: function(event, ui){
        console.log(dropList.indexOf(this.value)+1);
        updatePage(dropList.indexOf(this.value)+1)}
    })
 
    updatePage(15)