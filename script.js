// server.js (Node.js Backend)
const express = require('express');
const bodyParser = require('body-parser');
const { Configuration, OpenAIApi } = require('openai');

const app = express();
app.use(bodyParser.json());
app.use(express.static('public'));

const openai = new OpenAIApi(
  new Configuration({
    apiKey: 'your-openai-api-key-here', // Replace with your OpenAI API Key
  })
);

app.post('/generate-story', async (req, res) => {
  const { childName, favoriteAnimal, theme, color } = req.body;

  try {
    const prompt = `Write a fun children's story about a ${favoriteAnimal} and a child named ${childName}. The story should be ${theme} themed with the color ${color} as the backdrop.`;

    const response = await openai.createCompletion({
      model: 'gpt-4',  // You can use GPT-3.5 or GPT-4
      prompt: prompt,
      max_tokens: 500,
      temperature: 0.7,
    });

    const story = response.data.choices[0].text.trim();
    res.json({ story });
  } catch (error) {
    console.error('Error generating story:', error);
    res.status(500).send('Error generating story');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


// script.js

// Function to send the story data to the backend and display the result
async function generateStorybook() {
    const childName = document.getElementById("childName").value;
    const favoriteAnimal = document.getElementById("favoriteAnimal").value;
    const theme = document.getElementById("Theme").value;
    const color = document.getElementById("color").value;

    // Display loading message
    document.getElementById("loading").style.display = "block";

    // Make a request to the backend API
    const response = await fetch('/generate-story', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ childName, favoriteAnimal, theme, color })
    });

    const data = await response.json();

    // Hide loading message and display the story
    document.getElementById("loading").style.display = "none";
    document.getElementById("storyOutput").innerHTML = `<h2>Your Custom Story:</h2><p>${data.story}</p>`;
}
