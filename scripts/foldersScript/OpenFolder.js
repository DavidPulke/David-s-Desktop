import projectsData from "../foldersData/ProjectsData.js";
import { searchITunes } from "../foldersData/MusicData.js";
import startTrexGame from "../../dino-game/scripts/index.js";
import GuitarData from "../foldersData/GuitarData.js";





export default document.addEventListener('DOMContentLoaded', () => {
    const folders = document.querySelectorAll('.folder');

    folders.forEach(folder => {
        folder.addEventListener('dblclick', () => {
            const folderId = folder.id;
            const folderName = folder.dataset.name || loadFolderName(folderId); // טעינת השם המעודכן מה-dataset או מ-localStorage
            openFolder(folderName);
        });
    });




    function openFolder(folderName) {
        const folderWindow = document.getElementById('folder-window');
        const folderTitle = document.getElementById('folder-title');
        const folderContent = document.getElementById('folder-content');

        folderTitle.textContent = folderName; // שינוי הכותרת לשם התיקייה
        folderContent.innerHTML = generateFolderContent(folderName); // טעינת תוכן התיקייה לפי השם

        folderWindow.style.display = 'block'; // הצגת חלון התיקייה
    }

    document.getElementById('close-btn').addEventListener('click', closeFolder);
});

function closeFolder() {
    document.getElementById('folder-window').style.display = 'none';
}


function loadFolderName(folderId) {
    const foldersData = JSON.parse(localStorage.getItem('foldersData')) || {};
    return foldersData[folderId] ? foldersData[folderId].name : 'Unnamed Folder';
}


function generateFolderContent(folderName) {
    let content = '';

    if (folderName === 'Documents') {
        content = '<ul><li>File 1</li><li>File 2</li><li>File 3</li></ul>';

    } else if (folderName === 'Music') {
        // יצירת ה-HTML של החיפוש
        content = ` <div class="songsContainer">
            <h1 dir="rtl">חיפוש שירים ב-iTunes</h1>
  <input type="text" id="searchQuery" placeholder="הקלד שם שיר...">
  <button id="searchButton">חפש</button>
  <div id="results"></div>
  </div>
        `;

        // החזרת התוכן עם הכפתור ל-DOM ואז הוספת האירועים
        setTimeout(() => {
            let searchButton = document.getElementById('searchButton');
            if (searchButton) {
                searchButton.addEventListener('click', searchITunes);
            }
        }, 0);
    } else if (folderName === 'Projects') {
        for (let i in projectsData.titles) {
            content += `<div class="project-card"><a href=${projectsData.links[i]} target="_blank"><img src=${projectsData.images[i]} alt=${projectsData.titles}></a>
            <h4>${projectsData.titles[i]}</h4>
            </div>
            `;
        }
    } else if (folderName === 'Games') {

        setTimeout(() => {
            if (document.querySelector('.trexBtn')) {
                document.querySelector('.trexBtn').addEventListener('click', startTrexGame)
            }
        }, 0);
        content += `<button class="trexBtn"><img class='dinoImg' src="./dino-game/images/standing_still.png"></button>
    <div class="t-rex-game">
        <canvas class="trexCanvas"></canvas>
    </div>`
    } else if (folderName === 'Guitar') {
        for (let i in GuitarData.songData) {
            content += `
            <div id="loading" class="loading hidden">
    <div class="spinner"></div>
    <p>טוען תמונות...</p>
</div>

<div id="songs-container"></div>



<div id="songs-container">
            <div class="song-card" title="${GuitarData.songData[i].artist} - ${GuitarData.songData[i].song}">
            <span><a href="${GuitarData.songData[i].chordsUrl}" target="_blank"><img class="songThumbnail" src=${GuitarData.songData[i].imgUrl} alt=${GuitarData.songData[i].artist}></a></span>
            <p class="songName">${GuitarData.songData[i].song}</p>
            </div></div>
        `
        }
    }

    return content;
}

