class MicrophoneHandler {
    constructor(fftSize = 4096) {
        this.fftSize = fftSize;
        this.audioContext = null;
        this.analyser = null;
        this.mediaStream = null;
        this.source = null;
        this.dataArray = null;
        this.animationFrameId = null;
    }

    async start() {
        try {
            this.mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            this.source = this.audioContext.createMediaStreamSource(this.mediaStream);

            this.analyser = this.audioContext.createAnalyser();
            this.analyser.fftSize = this.fftSize;
            const bufferLength = this.analyser.frequencyBinCount;
            this.dataArray = new Uint8Array(bufferLength);

            this.source.connect(this.analyser);
            this.analyzeFrequency();
        } catch (err) {
            console.error('Error accessing microphone:', err);
        }
    }

    stop() {
        cancelAnimationFrame(this.animationFrameId);
        if (this.mediaStream) {
            this.mediaStream.getTracks().forEach(track => track.stop());
        }
        if (this.audioContext) {
            this.audioContext.close();
        }
    }

    analyzeFrequency() {
        this.analyser.getByteFrequencyData(this.dataArray);
        const nyquist = this.audioContext.sampleRate / 2;
        let maxIndex = 0;
        let maxValue = -Infinity;

        for (let i = 0; i < this.dataArray.length; i++) {
            if (this.dataArray[i] > maxValue) {
                maxValue = this.dataArray[i];
                maxIndex = i;
            }
        }

        const mainFrequency = maxIndex * (nyquist / this.dataArray.length);
        this.displayFrequency(mainFrequency);

        this.animationFrameId = requestAnimationFrame(this.analyzeFrequency.bind(this));
    }

    displayFrequency(frequency) {
        console.log(`Frequency: ${frequency.toFixed(2)} Hz`);
        // You can update the UI here, e.g., display the frequency in an HTML element
    }
}
