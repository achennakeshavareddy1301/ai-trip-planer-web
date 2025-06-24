// To run this code you need to install the following dependencies:
// npm install @google/genai mime
// npm install -D @types/node

import {
  GoogleGenAI,
} from '@google/genai';

async function main(prompt: string) {
  const ai = new GoogleGenAI({
    apiKey: 'AIzaSyDLbhlrrram6Cl2H5SjExX3pbdFCCgLp64', // Replace with your actual API key
  });
  const config = {
    thinkingConfig: {
      thinkingBudget: -1,
    },
    responseMimeType: 'application/json', // Changed to request JSON response
  };
  const model = 'gemini-2.5-flash';
  const contents = [
    {
      role: 'user',
      parts: [
        {
          text: prompt,
        },
      ],
    },
  ];

  const response = await ai.models.generateContentStream({
    model,
    config,
    contents,
  });

  let fullText = '';
  for await (const chunk of response) {
    fullText += chunk.text;
  }

  try {
    const json = JSON.parse(fullText);
    console.log(json);
    return json;
  } catch (e) {
    console.error('Failed to parse full JSON:', e, fullText);
    throw e;
  }
}

export default main;

// If you want to run it directly as a script:
