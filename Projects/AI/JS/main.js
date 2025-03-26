const submitButton = document.getElementById('submit');
const outputLabel = document.getElementById('chatInput');
const gifPaths = [
    '../gifs/BD1.gif',
    '../gifs/BD2.gif',
    '../gifs/BD3.gif',
    '../gifs/BD4.gif',
    '../gifs/BD5.gif',
    '../gifs/BD6.gif',
    '../gifs/BD7.gif',
    '../gifs/BD8.gif'
];
let isWriting = false;

//listens for button press
submitButton.addEventListener('click', () => main());

function main(){
    if(outputLabel.textContent === ''){//if the input is empty
        alert('Please enter a question');
        return;
    }
    if(!isWriting){
        if(Math.floor(Math.random()*10)== 1){//randomly decides if the question was too difficult to answer
            tooDifficult();
        }
        else{
            breakItDown();
        }
    }
}

//breaks it down
function breakItDown() {
    isWriting = true;
    const text = '  Good question. Here let me break it down for you  ';

    outputLabel.textContent = ''; // Clear any existing text
    typeWriter(text, 80, true, false);
}

//if the question was too difficult to answer
function tooDifficult() {
    isWriting = true;
    const text = '  Sorry, it was too difficult to explain. I will now kill myself  ';

    outputLabel.textContent = ''; // Clear any existing text
    typeWriter(text, 80, false, true);
}

//writes like a typewriter
function typeWriter(text, speed, playGif = false, soduko = false, index = 0) {
    if (index < text.length) {//writes the text to the output label like a typewriter
        outputLabel.textContent += text.charAt(index);
        setTimeout(() => typeWriter(text, speed, playGif, soduko, index + 1), speed);
    }
    if(index === text.length && playGif){//displays a random gif after the text is done typing
        displayRandomGif();
        isWriting = false;
    }
    if(index === text.length && soduko){//if the question was too difficult to answer
        displaySoduko();
        isWriting = false;
    }
}

//displays a gif of kermit the frog commiting soduko
function displaySoduko() {
    const gifElement = document.createElement('img');
    gifElement.src = '../gifs/kermitCommitingDie.gif';
    gifElement.style.position = 'fixed';
    gifElement.style.top = '0';
    gifElement.style.left = '0';
    gifElement.style.width = '100vw';
    gifElement.style.height = '100vh';
    gifElement.style.objectFit = 'cover';
    gifElement.style.zIndex = '9999';
    document.body.appendChild(gifElement);

    //Removes the gif after a few seconds
    setTimeout(() => {
        document.body.removeChild(gifElement);
    }, 3500);
}

//displays a random gif
function displayRandomGif(){
    //gets a random gif from the gifPaths array
    const randomIndex = Math.floor(Math.random() * gifPaths.length);
    const randomGif = gifPaths[randomIndex];

    //displays the gif
    const gifElement = document.createElement('img');
    gifElement.src = randomGif;
    gifElement.style.position = 'fixed';
    gifElement.style.top = '0';
    gifElement.style.left = '0';
    gifElement.style.width = '100vw';
    gifElement.style.height = '100vh';
    gifElement.style.objectFit = 'cover';
    gifElement.style.zIndex = '9999';
    document.body.appendChild(gifElement);

    //Removes the gif after a few seconds
    setTimeout(() => {
        document.body.removeChild(gifElement);
    }, 5000);
}