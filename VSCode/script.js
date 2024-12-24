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
    console.log("Monaco editor loaded");
});