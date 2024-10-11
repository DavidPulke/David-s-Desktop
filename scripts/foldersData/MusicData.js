export async function searchITunes() {
    const query = document.getElementById('searchQuery').value;
    try {
        const response = await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(query)}&entity=song&limit=10`);
        const data = await response.json();

        displayResults(data.results);
    } catch (error) {
        console.log(error);
    }
}

export let volumeScale = 0.4;

function displayResults(tracks) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';  // נקה את התוצאות הקודמות

    tracks.forEach((track) => {
        const trackDiv = document.createElement('div');
        trackDiv.innerHTML = `
            <strong>${track.trackName}</strong> מאת ${track.artistName}
            <br>
            <audio class="audio-player" controls src="${track.previewUrl}"></audio>
        `;

        resultsDiv.appendChild(trackDiv);
    });

    const audioPlayers = document.querySelectorAll('.audio-player');
    audioPlayers.forEach(player => {
        player.volume = volumeScale;
    });

    // הוסף כאן את האזנה לעוצמת השמע
    initVolumeControl();
}

function initVolumeControl() {
    const volumeSlider = document.getElementById('volumeSlider');
    const volumeIcon = document.getElementById('volumeIcon');

    if (volumeIcon && volumeSlider) {
        // עדכון עוצמת השמע ופתיחת האייקון בהתאם לעוצמה
        volumeSlider.addEventListener('input', () => {
            const volume = volumeSlider.value / 100; // עוצמת השמע בטווח [0, 1]
            const audioPlayers = document.querySelectorAll('.audio-player');

            audioPlayers.forEach(player => {
                player.volume = volume; // עדכון עוצמת השמע של השחקנים
            });

            // עדכון האייקון בהתאם לעוצמת השמע
            if (volume === 0) {
                volumeIcon.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>'; // אייקון של כיבוי
            } else if (volume > 0 && volume <= 0.5) {
                volumeIcon.innerHTML = '<i class="fa-solid fa-volume-low"></i>'; // אייקון של עוצמה נמוכה
            } else {
                volumeIcon.innerHTML = '<i class="fa-solid fa-volume-high"></i>'; // אייקון של עוצמה גבוהה
            }
        });
    }
}
