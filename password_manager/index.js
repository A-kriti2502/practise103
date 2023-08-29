const inputSlider = document.querySelector("[data-lengthSlider]");
const lengthDisplay = document.querySelector("[data-lengthNumber]");

const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numberCheck = document.querySelector("#number");
const symbolCheck = document.querySelector("#symbol");
const indicator = document.querySelector("[data-indicator]");
const generatorBtn = document.querySelector(".generateButton");
const allCheckbox = document.querySelectorAll("input[type=checkbox]");
const symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';

let password = "";
let passwordlength = 10;
let checkCount = 1;
// set strength circle color to grey

hadleSlider();

// set passwordlength
function hadleSlider(){
    inputSlider.value = passwordlength; 
    lengthDisplay.innerText = passwordlength;
    // not working
}
function setIndicator(color){
    indicator.computedStyleMap.backgroundColor = color;
    // shadow
}

function getRandomInteger(min, max){
    Math.floor(Math.random*(max-min)) + min;
}
function generateRandomNumber(){
    return getRandomInteger(0,9);
}
function generateLowerCase(){
    return String.fromCharCode(getRandomInteger(97,123));
}
function generateUpperCase(){
    return String.fromCharCode(getRandomInteger(65,91));
}
function generateSymbol(){
    const randomNumber = getRandomInteger(0,symbols.length);
    return symbols.charAt[randomNumber];
}

function calculateStrength(){
    let hasUpper = false;
    let haslower = false;
    let hasNum = false;
    let hasSym = false;
    if(uppercaseCheck.checked){
        hasUpper = true;
    }
    if(lowercaseCheck.checked){
        haslower = true;
    }
    if(numberCheck.checked){
        hasUpper = true;
    }
    if(symbolCheck.checked){
        haslower = true;
    }
    
    if(haslower || hasUpper && (hasSym || hasNum) && passwordlength >= 8){
        setIndicator("#0f0");
    } else if(
        (haslower || hasUpper)&&
        (hasNum || hasSym)&&
        passwordlength >= 6
    ){
        setIndicator("#ff0");
    } else{
        setIndicator("#f00");
    }
} 

async function copyContent(){
    try {
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText = "Copied";
    } catch (e) {
        copyMsg.innerText = "Failed";
    }
    copyMsg.classList.add("active");

    setTimeout( ()=> {
        copyMsg.classList.remove("active");
    },2000);
}

function handleCheckboxChange(){
    checkCount = 0;
    allCheckbox.forEach((checkbox) => {
        if(checkbox.checked){
            checkCount++;
        }
    });
    // special condition
    if(passwordlength < checkCount){
        passwordlength = checkCount;
        hadleSlider();
    }
}

inputSlider.addEventListener('input',(e) => {
    passwordlength = e.target.value;
    hadleSlider();
})

copyBtn.addEventListener('click', () =>{
    if(passwordDisplay.value)
        copyContent();
})

generatorBtn.addEventListener('click',()=>{
    if(checkCount <= 0) return ;

    if(passwordlength < checkCount){
        passwordlength = checkCount;
        hadleSlider();
    }

    // dealing with the slider 
    password = ""; //removed old password
    let arr = []; 
    if(uppercaseCheck.checked){
        arr.push(generateUpperCase);
    }
    if(lowercaseCheck.checked){
        arr.push(generateLowerCase);
    }
    if(numberCheck.checked){
        arr.push(generateRandomNumber);
    }
    if(symbolCheck.checked){
        arr.push(generateSymbol);
    }
    // compulsory addition
    for(let i=0; i<arr.length; i++){
        password += arr[i]();
    }
    // remaning addition
})