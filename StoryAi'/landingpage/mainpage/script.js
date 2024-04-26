
let recognition;
let isRecording = false;

function toggleRecording() {
  if (!isRecording) {
    startRecording();
  } else {
    stopRecording();
  }
}

function startRecording() {
  recognition = new webkitSpeechRecognition();
  recognition.lang = 'en-US';

  recognition.onstart = function () {
    console.log('Recording started.');
    // You can add any additional actions you want to perform when recording starts
  };

  recognition.onresult = function (event) {
    const speechToText = event.results[0][0].transcript;
    document.getElementById('storyPrompt').value += speechToText;
  }

  recognition.onend = function () {
    console.log('Recording stopped.');
    // You can add any additional actions you want to perform when recording stops
    isRecording = false;
    document.getElementById('microphoneButton').classList.remove('recording');
  };

  recognition.start();
  isRecording = true;
  document.getElementById('microphoneButton').classList.add('recording');
}

function stopRecording() {
  recognition.stop();
}

const artStyles = document.querySelectorAll('.art-style');

function selectArtStyle(style) {
  artStyles.forEach(artStyle => {
    artStyle.classList.toggle('selected', artStyle.dataset.style === style);
  });
}

artStyles.forEach(artStyle => {
  artStyle.addEventListener('click', function () {
    const style = this.dataset.style;
    selectArtStyle(style);
  });
});

document.getElementById('storyForm').addEventListener('submit', function (event) {
  event.preventDefault();
  generateImage();
});

async function generateImage() {
  const story = document.getElementById('storyPrompt').value;
  const selectedStyle = document.querySelector('.art-style.selected');

  if (!selectedStyle) {
    console.error('Please select an art style.');
    return;
  }

  const artStyle = selectedStyle.dataset.style;
  const path = "https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image";
  const apiKey = "sk-WQcVxdlgsST2Va6NhqaQOHkczobZRBGOcsAd6SLIsYycyuNN"; // Replace with your Stability AI API key

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${apiKey}`
  };

  const body = {
    steps: 40,
    width: 1024,
    height: 1024,
    seed: 0,
    cfg_scale: 5,
    samples: 1,
    text_prompts: [{
      text: story,
      weight: 1
    }],
    prompt_styles: [{
      "artStyle": artStyle
    }]
  };

  try {
    const response = await fetch(path, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      throw new Error(`Non-200 response: ${await response.text()}`);
    }

    const responseJSON = await response.json();

    if (responseJSON && responseJSON.artifacts && responseJSON.artifacts[0] && responseJSON.artifacts[0].base64) {
      const imageUrl = `data:image/png;base64,${responseJSON.artifacts[0].base64}`;
      displayGeneratedImage(imageUrl);
    } else {
      throw new Error("Unexpected response format");
    }
  } catch (error) {
    console.error('Error generating image:', error);
  }
}

function displayGeneratedImage(imageUrl) {
  const illustrationContainer = document.querySelector('.illustration img');
  illustrationContainer.src = imageUrl;

  addVisitedImage(imageUrl);

  // Event listeners for navigation buttons
  document.getElementById('previousButton').addEventListener('click', navigatePrevious);
  document.getElementById('nextButton').addEventListener('click', navigateNext);
}

function addVisitedImage(imageUrl) {
  visitedImages.push(imageUrl);
  currentIndex = visitedImages.length - 1; // Update the current index
}

function displayImageAtIndex(index) {
  const imageUrl = visitedImages[index];
  if (imageUrl) {
    const illustrationContainer = document.querySelector('.illustration img');
    illustrationContainer.src = imageUrl;
  }
}

let visitedImages = [];
let currentIndex = -1; // Initialize the current index

function navigatePrevious() {
  if (currentIndex > 0) {
    currentIndex--;
    displayImageAtIndex(currentIndex);
  }
}

function navigateNext() {
  if (currentIndex < visitedImages.length - 1) {
    currentIndex++;
    displayImageAtIndex(currentIndex);
  }
}

function downloadImage() {
  const illustrationContainer = document.querySelector('.illustration img');
  const imageUrl = illustrationContainer.src;

  // Create a temporary anchor element
  const anchor = document.createElement('a');
  anchor.href = imageUrl; // Set the href attribute to the image URL
  anchor.download = 'illustration.png'; // Set the download attribute with the desired file name
  anchor.target = '_blank'; // Open in a new tab
  document.body.appendChild(anchor); // Append the anchor element to the body
  anchor.click(); // Simulate a click event to trigger the download
  document.body.removeChild(anchor); // Remove the anchor element from the body
}


