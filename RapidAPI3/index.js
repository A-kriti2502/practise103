
const userInput = document.querySelector("input");
const SubmitButton = document.querySelector("button");
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'f6825ddf6emsh999e14297432c68p1017fcjsnf2b4f3ed66ed',
		'X-RapidAPI-Host': 'youtube-search-results.p.rapidapi.com'
	}
};
let SearchValue = '';
let length_videos = '';

async function getResults() {
    SearchValue = userInput.value;

    fetch(`https://youtube-search-results.p.rapidapi.com/youtube-search/?q=${SearchValue}`,options)
    .then(response => response.json())
    // .then((response) => {
    //     console.log(response);
    //     console.log(response.videos.length);
    //     length_videos = response.videos.length;
    // })
    .then( data => {
        let output = '';
        data.videos.map(item => {
            output += `
            <div style="font-size: 20px; 
                        display: flex;
                        flex-direction: column; 
                        gap: 5px;
                        margin-bottom: 20px">
            <h3 >${item.title}</h3>
            <a href="${item.link}">${item.link}</a>
            <img src= ${item.thumbnail} style="width:300px height:200px" style />
            </div>
            `;

            // console.log(item.title);
            // console.log(item.link);
            // console.log(item.thumbnail);
        })
        document.querySelector('.result').innerHTML = output;
    })
    .catch(err => console.error(err));

    userInput.value = "";
}

SubmitButton.addEventListener("click",getResults);

