const textVariants = [
    "Arial, sans-serif",
    "'Comic Sans MS', cursive",
    "'Courier New', monospace",
    "Georgia, serif",
    "'Lucida Console', Monaco, monospace",
    "'Times New Roman', Times, serif",
    "'Trebuchet MS', sans-serif",
    "'Verdana', Geneva, sans-serif"
  ];

  function generateImage() {
    
    window.location.href = 'mainpage/index.html';
  }

  function changeTextAndFont() {
    const newText = generateRandomText();
    const font = generateRandomFont();
    const color = generateRandomColor();
    document.getElementById("overlayText").innerHTML = `<p style="font-family: ${font}; color: ${color}; font-size: 9px;">Todays Motivation<br>${newText}</p>`;

  }

  function generateRandomText() {
    const texts = [
      "Hello, World!",
      "Welcome to the party!",
      "Keep calm and carry on.",
      "The sky is the limit!",
      "Coding is fun!",
      "Stay positive!",
      "Let your dreams be your wings.",
      "Just keep swimming!",
      "Hakuna Matata!"
    ];
    const randomIndex = Math.floor(Math.random() * texts.length);
    return texts[randomIndex];
  }

  function generateRandomFont() {
    const randomIndex = Math.floor(Math.random() * textVariants.length);
    return textVariants[randomIndex];
  }

  function generateRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  setInterval(changeTextAndFont, 3000);

  const quoteElement = document.getElementById('quote');
  const quoteText = `CANT WAIT TO TRY IT OUT?!<br>
                      I am waiting too!! <br>
                      Click on the generate button and get started now!`;
  quoteElement.innerHTML = ''; // Clearing original text

  let i = 0;
  function typeWriter() {
    if (i < quoteText.length) {
      if (quoteText.charAt(i) === '<') {
        let j = i + 1;
        while (quoteText.charAt(j) !== '>') j++;
        quoteElement.innerHTML += quoteText.substring(i, j + 1);
        i = j + 1;
      } else {
        quoteElement.innerHTML += quoteText.charAt(i);
        i++;
      }
      setTimeout(typeWriter, 50); // Speed of typewriter effect (50 milliseconds)
    }
  }

  typeWriter();