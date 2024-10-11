export default class DraggableFolder {
    constructor(element) {
        this.element = element;
        this.dragging = false;
        this.id = this.element.id; // מזהה ייחודי לכל חלון

        this.init();
    }

    init() {
        const header = this.element.querySelector('.folder-header');
        header.addEventListener('mousedown', this.dragStart.bind(this));
        document.addEventListener('mouseup', this.dragEnd.bind(this));
        document.addEventListener('mousemove', this.drag.bind(this));

        this.loadPosition(); // טוען מיקום שנשמר
    }

    dragStart(event) {
        this.dragging = true;
        this.shiftX = event.clientX - this.element.getBoundingClientRect().left;
        this.shiftY = event.clientY - this.element.getBoundingClientRect().top;
    }

    drag(event) {
        if (!this.dragging) return;

        let newLeft = event.clientX - this.shiftX;
        let newTop = event.clientY - this.shiftY;

        const folderWidth = this.element.offsetWidth;
        const folderHeight = this.element.offsetHeight;
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;

        // למנוע חפיפה מחוץ למסך
        if (newLeft < 0) newLeft = 0;
        if (newTop < 0) newTop = 0;
        if (newLeft + folderWidth > screenWidth) newLeft = screenWidth - folderWidth;
        if (newTop + folderHeight > screenHeight) newTop = screenHeight - folderHeight;

        this.element.style.left = `${newLeft}px`;
        this.element.style.top = `${newTop}px`;
    }

    dragEnd() {
        this.dragging = false;
        this.savePosition(); // שמירת מיקום לאחר גרירה
    }

    savePosition() {
        const folderData = JSON.parse(localStorage.getItem('folderPositions')) || {};
        folderData[this.id] = {
            left: this.element.style.left,
            top: this.element.style.top
        };
        localStorage.setItem('folderPositions', JSON.stringify(folderData));
    }

    loadPosition() {
        const folderData = JSON.parse(localStorage.getItem('folderPositions')) || {};
        if (folderData[this.id]) {
            this.element.style.left = folderData[this.id].left;
            this.element.style.top = folderData[this.id].top;
        }
    }
}

// אתחול האלמנט הניתן לגרירה
document.addEventListener('DOMContentLoaded', () => {
    const folder = document.getElementById('folder-window');
    new DraggableFolder(folder);
});
