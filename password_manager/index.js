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
let checkCount = 0;
// set strength circle color to grey

hadleSlider();

// set passwordlength
function hadleSlider(){
    inputSlider.value = passwordlength; 
    lengthDisplay.innerText = passwordlength;
}
function setIndicator(color){
    indicator.style.backgroundColor = color;
}

function getRandomInteger(min, max){
    return Math.floor(Math.random() * (max-min)) + min;
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
    
    if(haslower && hasUpper && (hasSym || hasNum) && passwordlength >= 8){
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

function shufflePassword(array) {
    //Fisher Yates Method
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
    let str = "";
    array.forEach((el) => (str += el));
    return str;
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

allCheckbox.forEach((checkbox) => {
    checkbox.addEventListener('change',handleCheckboxChange);
})

inputSlider.addEventListener('input',(e) => {
    passwordlength = e.target.value;
    hadleSlider();
})

copyBtn.addEventListener('click', () =>{
    if(passwordDisplay.value)
        copyContent();
})

generatorBtn.addEventListener('click',()=>{
    if(checkCount == 0) 
        return ;

    if(passwordlength < checkCount){
        passwordlength = checkCount;
        hadleSlider();
    }
    console.log("starting the journey");
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
    console.log("compulsory addition done");
    // remaning addition
    for(let i=0; passwordlength-arr.length;i++){
        let randomIndex = getRandomInteger(0,arr.length);
        console.log("randomIndex" + randomIndex);
        password += arr[randomIndex]();
    }
    console.log("remaning addition done");
    // console.log(arr); 
    // shuffle the password
    password = shufflePassword(Array.from(password));
    console.log("shuffling done");
    // show in the UI
    passwordDisplay.value = password;
    console.log("ui generated");
    // console.log(password);
    // calculate the strength
    calculateStrength();
})
