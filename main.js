const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const ffmpeg = require('ffmpeg-static');

// Set the input and output file paths
const inputAudio = 'audio/My Love Original.wav';

// Use the '-loop' and '-t' options to loop the image for the duration of the audio
const options = [
  '-loop', '1',
  '-i', '',
  '-i', inputAudio,
  '-c:v', 'libx264',
  '-preset', 'ultrafast',
  '-tune', 'stillimage',
  '-c:a', 'aac',
  '-shortest'
];

// Process 100 files
for (let i = 1; i <= 100; i++) {
  // Set the input and output file paths
  const inputImage = `images/${i}.png`;
  const outputFile = `build/${i}.mp4`;

  // Update the options array with the input and output file paths
  options[3] = inputImage;
  options.push(outputFile);

  // Run the ffmpeg command
  try {
    execFileSync(ffmpeg, options, { stdio: 'inherit' });
    console.log(`Video ${i} created successfully!`);
  } catch (error) {
    console.error(error);
  }

  // Remove the output file path from the options array
  options.pop();
}
