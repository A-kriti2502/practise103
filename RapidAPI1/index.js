const searchInput = document.getElementById( "search-Input" );
const searchButton = document.getElementById( "search-Button" );
const YourWord = document.getElementById( "Your-Word" );
const Yourdefination = document.getElementById( "Your-defination" );

const dict = (word)=>{
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '756c6ea365mshd137d5783714b65p145de4jsn7aaff818d661',
            'X-RapidAPI-Host': 'dictionary-by-api-ninjas.p.rapidapi.com'
        }
    };
    fetch('https://dictionary-by-api-ninjas.p.rapidapi.com/v1/dictionary?word='+ word, options)
    .then(response => response.json())
    .then((response) => {
        console.log(response);
        console.log("your word" , response.word);
        console.log("your definition is", response.definition.substring(0,50));
        YourWord.innerHTML = response.word;
        Yourdefination.innerHTML = response.definition.substring(0,80);
    }) 
    .catch((error)=>{
        console.error(error);
    })
}

searchButton.addEventListener("click",(event)=>{
    event.preventDefault();
    dict(searchInput.value);
})