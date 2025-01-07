// Variabile globale per il grafico
let frequencyChart;

// Funzione per calcolare la frequenza delle lettere
function calculateLetterFrequency(text) {
    const frequency = {};
    const cleanedText = text.replace(/[^a-zA-Z]/g, '').toLowerCase(); // Rimuove spazi e caratteri non alfabetici

    for (const char of cleanedText) {
        frequency[char] = (frequency[char] || 0) + 1;
    }

    return frequency;
}

// Funzione per normalizzare la frequenza
function normalizeFrequency(frequency, total) {
    const normalized = {};
    for (const [letter, count] of Object.entries(frequency)) {
        normalized[letter] = (count / total) * 100; // Percentuale
    }
    return normalized;
}

// Funzione per tracciare il grafico della frequenza
function plotFrequencyChart(frequency) {
    const labels = Object.keys(frequency);
    const data = Object.values(frequency);

    const ctx = document.getElementById('frequencyChart').getContext('2d');

    if (frequencyChart) {
        frequencyChart.destroy();
    }

    frequencyChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Letter Frequency (%)',
                data: data,
                backgroundColor: 'rgba(75, 192, 192, 0.5)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Frequency (%)'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Letters'
                    }
                }
            }
        }
    });
}

// Funzione per crittografare con il cifrario di Cesare
function caesarCipher(text, shift) {
    return text.replace(/[a-z]/gi, (char) => {
        const isUpperCase = char === char.toUpperCase();
        const base = isUpperCase ? 65 : 97;
        return String.fromCharCode(((char.charCodeAt(0) - base + shift) % 26) + base);
    });
}

// Event listeners

document.getElementById('analyzeButton').addEventListener('click', () => {
    const text = document.getElementById('inputText').value;
    const letterFrequency = calculateLetterFrequency(text);
    const totalLetters = Object.values(letterFrequency).reduce((a, b) => a + b, 0);
    const normalizedFrequency = normalizeFrequency(letterFrequency, totalLetters);
    plotFrequencyChart(normalizedFrequency);
});

document.getElementById('encryptButton').addEventListener('click', () => {
    const text = document.getElementById('inputText').value;
    const shift = parseInt(document.getElementById('shiftValue').value, 10);
    const encryptedText = caesarCipher(text, shift);
    document.getElementById('encryptedText').textContent = encryptedText;
});

document.getElementById('decryptButton').addEventListener('click', () => {
    const text = document.getElementById('inputText').value;
    const shift = parseInt(document.getElementById('shiftValue').value, 10);
    const decryptedText = caesarCipher(text, 26 - (shift % 26)); // Decifra usando il complemento del shift
    document.getElementById('decryptedText').textContent = decryptedText;
});
