


// dark light mode 
const mode = document.getElementById("button-mode");
const content = document.querySelector(".form-container");
// title input limit 
let titleText = document.getElementById("title-input");
let titleResult = document.getElementById("title-limit");
// text area limit
let textareaText = document.getElementById("textarea-input");
let textareaResult = document.getElementById("textarea-limit");
// date 
let currentDate = document.getElementById("current-date");
let customdate = document.getElementById("custom-date");
let calenderInput = document.getElementById("calendar");
// file upload
const dropArea = document.querySelector(".drag-area"),
dragText = dropArea.querySelector("header"),
button = dropArea.querySelector("button"),
input = dropArea.querySelector("input");
let file; 


// dark light mode 
mode.addEventListener("click",function(){
    content.classList.toggle("light-mode");

    if(content.classList.contains("light-mode")){
        mode.innerText = "Dark mode";
        mode.classList.add("light-mode-button");
    }
    else{
        mode.innerText = "Light mode";
        mode.classList.remove("light-mode-button");
    }
});

// title input limit 
let titleLimit = 60;
titleResult.innerText = 0 + "/" + titleLimit;

titleText.addEventListener("input", function(){
    let titleLength = titleText.value.length;
    titleResult.innerText = titleLength + "/" +titleLimit;

    if(titleLength >= titleLimit){
        titleText.value = titleText.value.substring(0,titleLimit-1);
    }
});

// textarea input limit 
let textareaLimit = 300;
textareaResult.innerText = 0 + "/" + textareaLimit;

textareaText.addEventListener("input", function(){
    let textareaLength = textareaText.value.length;
    textareaResult.innerText = textareaLength + "/" + textareaLimit;

    if(textareaLength >= textareaLimit){
        textareaText.value = textareaText.value.substring(0,textareaLimit-1);
    }
});

// custom and current date 
currentDate.addEventListener("click",function(event){
    event.preventDefault();
    customdate.classList.remove("hidden");
    const today = new Date().toISOString().split('T')[0]; //ISO 8601 format T: Separator between date and time
    calenderInput.value = today;
    calenderInput.disabled = true;
});
customdate.addEventListener("click",function(event){
    event.preventDefault();
    customdate.classList.add("hidden");
    calenderInput.value = "";
    calenderInput.disabled = false;
});


// file upload 
button.onclick = ()=>{
  input.click(); 
}
input.addEventListener("change", function(){
  file = this.files[0];
  dropArea.classList.add("active");
  showFile(); 
});

dropArea.addEventListener("dragover", (event)=>{
  event.preventDefault();
  dropArea.classList.add("active");
  dragText.textContent = "Release to Upload File";
});

dropArea.addEventListener("dragleave", ()=>{
  dropArea.classList.remove("active");
  dragText.textContent = "Drag & Drop to Upload File";
});

dropArea.addEventListener("drop", (event)=>{
  event.preventDefault(); 
  file = event.dataTransfer.files[0];
  showFile(); 
});

function showFile(){
  let fileType = file.type; 
  let validExtensions = ["image/jpeg", "image/jpg", "image/png"]; 
  if(validExtensions.includes(fileType)){ 
    let fileReader = new FileReader(); 
    fileReader.onload = ()=>{
      let fileURL = fileReader.result; //data URL - base64-encoded string.
      let imgTag = `<img src="${fileURL}" alt="image">`; 
      dropArea.innerHTML = imgTag; 
    }
    fileReader.readAsDataURL(file);
  }else{
    alert("This is not an Image File!");
    dropArea.classList.remove("active");
    dragText.textContent = "Drag & Drop to Upload File";
  }
}
