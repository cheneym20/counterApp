// function AppScreen(backgroundColor, fontColor, buttonAmount){
//     this.backgroundColor = backgroundColor;
//     this.fontColor = fontColor;
//     this.buttonAmount = buttonAmount;
    
//     for(i=0;i<this.buttonAmount;i++){
        
//     }

//     this.getButtonDetails;
// }

// function GuiButton(btnTitle, btnFunction){
//     this.btnTitle = btnTitle;
//     this.btnFunction = btnFunction;
// }

// function getButtonDetails(btnTitle, btnFunction){
    
// }



//Creating object template.
function Counter(backgroundColor, currentNbr, buzz, countBy, secondsToHoldScreen, counterTextStatus){
    this.backgroundColor = backgroundColor;
    this.currentNbr = currentNbr;
    this.buzz = buzz;
    this.countBy = countBy;
    this.secondsToHoldScreen = secondsToHoldScreen;
    this.counterTextStatus = counterTextStatus;
}

//Creating object using object template.
let counter = new Counter("PeachPuff", 0, "N", 1, 1750, "black", "");

//Creating Class
class CounterStatus{

    constructor(){
        this.countBy = counter.countBy;
        this.secondsAmount = counter.secondsToHoldScreen;
    }
 
    showStatus(){
        return `The counter is counted by ${this.countBy}.  It takes ${this.secondsAmount} milliseconds to hold the screen to reset the counter to zero.`
    }
}

//Using class to put in variable.
let counterStatus = new CounterStatus();

counter.counterTextStatus = counterStatus.showStatus();

//Creating object with hardcoded values.
startUp = {
    container : document.getElementById("container"),
    topBtn : document.getElementById("top"),
    midBtn : document.getElementById("mid"),
    btmBtn : document.getElementById("btm"),
    mouseTimer : 0,
    aboutText : "This was created with Vanilla JavaScript on July 5th, 2021.  Michael Cheney is a developer who is attempting to work hard to develop new things."
}

startApp();

function startApp(){
    setUpMainMenuButtons();
}

function startUpCounter(){
    clearMainMenuEventListeners();
    setUpCounter();   
}

function setUpCounter(){
    setUpSectionScreen("counter");
    clearMainMenuEventListeners();

    startUp.topBtn.addEventListener("click", counterClicked);
    startUp.topBtn.addEventListener("mousedown", mouseDown);
    document.body.addEventListener("mouseup", mouseUp);
}

function startUpAbout(){
    setUpSectionScreen("about");
    clearMainMenuEventListeners();

    startUp.topBtn.textContent = "";
    startUp.topBtn.style.backgroundColor = "rgb(247, 129, 129)";

    let newDiv = document.createElement("div")
    let aboutText = document.createTextNode(startUp.aboutText);
    newDiv.appendChild(aboutText);
    startUp.topBtn.appendChild(newDiv);
    newDiv.style.padding = "50px";
}

function startUpSettings(){
    setUpSectionScreen("settings");
    clearMainMenuEventListeners();

    startUp.topBtn.textContent = "";
    startUp.topBtn.style.backgroundColor = "transparent";

    let newList = document.createElement("ul")

    createHTMLElement(newList, "div", "settings_details", "Settings Section.  I am able to save values and have input validations.  Attempt to break the fields by adding in incorrect values.  ", "50px");

    //createHTMLElement(newList, "li", "settings_buzz", "Buzz on Count: ", 25);
    createHTMLElement(newList, "li", "settings_count_by", "Count by: ", 25)
    createHTMLElement(newList, "li", "settings_hold", "Seconds to hold screen: ", 25)
    createHTMLElement(newList, "li", "settings_backgroundcolor", "Counter background color: ", 50)
    createHTMLElement(newList, "li", "settings_submit_button", "", 25)

    addElementsToList(newList, "50px");

    //createInput("settings_buzz", "checkbox", "settings_buzz_input", "80px",counter.buzz);
    createInput("settings_count_by", "number", "count_by_input", "80px", counter.countBy);
    createInput("settings_hold", "number", "settings_hold_input", "140px", counter.secondsToHoldScreen);
    createInput("settings_backgroundcolor", "text", "settings_backgroundcolor_input", "260px", counter.backgroundColor);
    createInput("settings_submit_button", "submit", "settings_submit_button_input", 80, "Save");
    
    let submitButton = document.getElementById("settings_submit_button");
    submitButton.addEventListener("click", saveSettings);

    startUp.btmBtn.style.backgroundColor = "rgb(247, 129, 129)";
    startUp.btmBtn.addEventListener("click", navToMainMenu);
}

function saveSettings(){
    let inputs = Array.from(startUp.topBtn.children[0].children)

    let errorList = "";
    let numberError = false;
    let stringError = false;
    let backgroundColorString = "";

    inputs.map(function(btn){
        if(btn.children.length > 1){
            if(btn.children[1].type === "number"){
                if((btn.children[1].value <= 0 || btn.children[1].value == null || btn.children[1].value == "") && numberError == false){

                    errorList = errorList + "The number fields can't be 0, blank or negative. "
                    numberError = true;
                }
            }
            if(btn.children[1].type === "text"){
                backgroundColorString = btn.children[1].value;
                backgroundColorString = backgroundColorString.toLowerCase();
                backgroundColorString = backgroundColorString.replace(/\s/g, '')

                if(!isColor(backgroundColorString) && stringError == false){
                    errorList = errorList + "The background color value is incorrect.  Only color names like 'red' or 'grey' is allowed.  No Hex or RGB allowed. ";
                    stringError = true;
                }
            }
        }
    });

    if(numberError || stringError){
        alert(errorList);
    }
    else{
        let countBy = document.getElementsByClassName("count_by_input");
        let countByNbr = parseInt(countBy[0].value);
        if(countByNbr != counter.countBy){
            counter.countBy = countByNbr;
        }

        let secondsToHoldScreen = document.getElementsByClassName("settings_hold_input");
        let secondsToHoldScreenNbr = parseInt(secondsToHoldScreen[0].value);
        if(secondsToHoldScreenNbr != counter.secondsToHoldScreen){
            counter.secondsToHoldScreen = secondsToHoldScreenNbr;
        }

        let backgroundColor = document.getElementsByClassName("settings_backgroundcolor_input");
        let backgroundColorString = backgroundColor[0].value;
        if(backgroundColorString != counter.backgroundColor){
            counter.backgroundColor = backgroundColorString;
        }
    }
}

function isColor(strColor){
    var s = new Option().style;
    s.color = strColor;
    return s.color == strColor;
  }

function addElementsToList(addedList, paddingAmount){
    startUp.topBtn.appendChild(addedList);
    addedList.style.padding = paddingAmount;
    addedList.style.listStyle = "none";
}

function createHTMLElement(container, elementType, elementClassName, elementTitle, bottomPadding){
    let htmlElement = document.createElement(elementType);
    htmlElement.className = elementClassName;
    htmlElement.setAttribute("id", elementClassName);
    let htmlElementTitle = document.createElement("div");
    let htmlElementText = document.createTextNode(elementTitle);
    htmlElementTitle.appendChild(htmlElementText);
    htmlElement.style.paddingBottom = bottomPadding + "px";
    htmlElement.appendChild(htmlElementTitle);

    container.appendChild(htmlElement);
}

function createInput(htmlId, inputType, inputClassName, inputWidth, inputValue){
    let elementContainer = document.getElementById(htmlId);
    
    let HTMLinput = document.createElement("input");
    HTMLinput.type = inputType;
    HTMLinput.className = inputClassName;
    HTMLinput.style.width = inputWidth;
    elementContainer.appendChild(HTMLinput);
    HTMLinput.value = inputValue;
}


function clearMainMenuEventListeners(){
    startUp.topBtn.removeEventListener("click", startUpCounter);
    startUp.midBtn.removeEventListener("click", startUpAbout);
    startUp.btmBtn.removeEventListener("click", startUpSettings);
}

function clearCounterEventListeners(){
    startUp.topBtn.removeEventListener("click", counterClicked);
    startUp.btmBtn.removeEventListener("click", navToMainMenu);
}



function navToMainMenu(){
    let buttons = Array.from(startUp.container.children)

    let listOfClass = ["counter", "about", "settings"];
    buttons.forEach(function (btn){
        listOfClass.forEach(function(cls){
            buttons.filter(btn => btn.classList.remove(cls));
        })
    });

    clearCounterEventListeners();
    setUpMainMenuButtons();
}

function counterClicked(){
    counter.currentNbr = counter.currentNbr + counter.countBy;
    startUp.topBtn.textContent = counter.currentNbr;
}

function setUpMainMenuButtons(){

    startUp.topBtn.addEventListener("click", startUpCounter);
    startUp.midBtn.addEventListener("click", startUpAbout);
    startUp.btmBtn.addEventListener("click", startUpSettings);

    startUp.topBtn.style.backgroundColor = counter.backgroundColor;
    startUp.btmBtn.style.backgroundColor = null;

    startUp.topBtn.textContent = "Start Counting";
    startUp.midBtn.textContent = "About";
    startUp.btmBtn.textContent = "Settings";
}
 
function setUpSectionScreen(section){
    let buttons = Array.from(startUp.container.children); //"Array.from" converts the HTMLCollection into an array.
    buttons.map(btn => btn.className += " " + section);

    startUp.topBtn.textContent = counter.currentNbr;
    startUp.btmBtn.textContent = "Back";

    startUp.btmBtn.addEventListener("click", navToMainMenu);
}

function mouseDown(){
    mouseUp();
    if(counter.currentNbr > 0){
        startUp.mouseTimer = window.setTimeout(execMouseDown,counter.secondsToHoldScreen);
    }
}

function mouseUp(){
    if(startUp.mouseTimer) window.clearTimeout(startUp.mouseTimer);
}

function execMouseDown(){
    counter.currentNbr = -counter.countBy;
    startUp.topBtn.textContent = 0;
}


//////Best  Way///////  Object Blueprint
// function Person(name, eyeColor, age) {
//     this.name = name;
//     this.eyeColor = eyeColor;
//     this.age = age;
//     this.updateAge;
// }

// function updateAge(){
//     return ++this.age;
// }

// let person01 = new Person("Daniel", "Blue", 27);
// let person02 = new Person("Jane", "Brown", 43);

// console.log(person01.name + "'s age is " + person01.age);


///////Testing class and methods///////
