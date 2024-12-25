// הגדרת הדרישה ל-Monaco Editor
require.config({ paths: { 'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.40.0/min/vs' } });

// טעינת העורך
require(['vs/editor/editor.main'], function () {
    // יצירת עורך Monaco
    var editor = monaco.editor.create(document.getElementById('editor'), {
        value: [
            'function helloWorld() {',
            '\tconsole.log("Hello, World!");',
            '}',
            '',
            'helloWorld();'
        ].join('\n'),
        language: 'javascript',
        theme: 'vs-dark',
        automaticLayout: true
    });
});


let extend = document.getElementById('extend')
let codeContainer = document.getElementById('VSCode')
let closeCode = document.getElementById('close-code-btn')
let codeNav = document.querySelector('.code-nav')
let fullScreen = false;
let openCode = false;

function extendFunc() {
    if (fullScreen) {
        codeContainer.classList.remove('fullScreen');
        fullScreen = false
    } else {
        codeContainer.classList.add('fullScreen');
        fullScreen = true
    }
}

export function openCodeFunc() {
    if (openCode) {
        // close
        codeContainer.classList.remove('show');
        codeContainer.classList.add('hidden');
        openCode = false
    } else {
        // open
        codeContainer.classList.remove('hidden');
        codeContainer.classList.add('show');
        openCode = true
    }
}

export function bringToFront() {

    codeContainer.style.zIndex = '1001'
}

extend.addEventListener('click', extendFunc)
closeCode.addEventListener('click', openCodeFunc)
codeNav.addEventListener('dblclick', extendFunc)
codeContainer.addEventListener('click', bringToFront)

