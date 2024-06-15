const startButton = document.getElementById('startButton');
const stopButton = document.getElementById('stopButton');
const frequencyDisplay = document.getElementById('frequencyDisplay');

const micHandler = new MicrophoneHandler();

micHandler.displayFrequency = (frequency) => {
    frequencyDisplay.textContent = `Frequency: ${frequency.toFixed(2)} Hz`;
};

startButton.addEventListener('click', () => {
    micHandler.start();
});

stopButton.addEventListener('click', () => {
    micHandler.stop();
    frequencyDisplay.textContent = 'Frequency: 0 Hz';
});