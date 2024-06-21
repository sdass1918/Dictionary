let url = "https://api.dictionaryapi.dev/api/v2/entries/en/";

const inputPlace = document.querySelector(".meaningSearch");
const searchButton = document.querySelector("#submit");
let meaningSentence = document.querySelector(".meaning");
let exampleSentence = document.querySelector(".sentence-example");
let audiobtn = document.querySelector(".audio-msg button");

const getTheMeaning = async () => {
    const URL = `${url}${inputPlace.value}`;
    try {
        let response = await fetch(URL);
        var data = await response.json();
        let finalMeaning = (data[0].meanings[0].definitions[0].definition);
        let finalSentence = (data[0].meanings[0].definitions[0].example);
        meaningSentence.innerText = `${finalMeaning}`;
        exampleSentence.innerText = `${finalSentence}`;
        searchButton.innerHTML = "<button disabled>Click to get the meaning</button>";
    }
    catch {
        meaningSentence.innerText = "There is no such word!";
        exampleSentence.innerText = "Please enter a valid word!";
    }
};

const getTheAudio = async () => {
    const URL = `${url}${inputPlace.value}`;
    
    let response = await fetch(URL);
    var data = await response.json();
    console.log(data);
    let audiourl = (data[0].phonetics[0].audio);
    if (audiourl===""){
        alert("Audio not available!")
    }
    else{
        let audio = new Audio(audiourl);
        audio.play();
    }
    
}

inputPlace.addEventListener("input", () => {
    searchButton.innerHTML = "<button>Click to get the meaning</button>";
});

searchButton.addEventListener("click", (event) => {
    event.preventDefault();
    getTheMeaning();
});

audiobtn.addEventListener("click", (evt) => {
    evt.preventDefault();
    getTheAudio();
})
