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
        player.volume = 0.2;
    });
}



