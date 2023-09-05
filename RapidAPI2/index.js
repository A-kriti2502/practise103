const APIkey ="AIzaSyAZSOSHcvOca_xWDnze2LmBvHyaExxYMd8";
const youtubeID = "UCrSLFeB0nprbZ0058QZsudA";

const subCount = document.querySelector(".sub-count");

const getYoutubeSubs = async () => {
    try{
        const getdata = await axios.get(
            `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${youtubeID}&key=${APIkey}`
        );
        console.log(getdata);
        // const youtubeSubs = getdata.data.items[0].statistics.subscriberCount;
    
        const youtubeSubs = 2000;
        let formattedSub;
        if(youtubeSubs.toString().length >= 4 && youtubeSubs.toString().length <= 6){
            formattedSub = Math.floor(youtubeSubs / 1000);
            subCount.innerHTML = `${formattedSub}K`;
            return ;
        }else if(youtubeSubs.toString().length >= 7){
            formattedSub = Math.floor(youtubeSubs / 1000000);
            subCount.innerHTML = `${formattedSub}M`;
            return ;
        }
        else{
            subCount.innerHTML = youtubeSubs;
        }   
    }
    catch(error){
        console.error("Error:" , error);
    }
};
getYoutubeSubs();