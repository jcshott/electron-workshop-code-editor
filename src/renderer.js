const { ipcRenderer, remote } = require('electron');
const loader = require('monaco-loader');
// const fs = require('fs');
const FileManager = require('./fileManager');
// monaco loader helps with loading something that looks like a code editor

window.onload = () => {
    loader().then((monaco) => {
        let editor = monaco.editor.create(document.getElementById('container'), {
            language: 'javascript',
            theme: 'vs-dark',
            automaticLayout: true
        })

        let fileManager = new FileManager({editor});
        remote.getCurrentWindow().show();
        // recieve the navigation event from main process
        // ipcRenderer.on('navigate', (e, url) => {
            //  // fs.readFile doesn't know what `file://` means
            // url = url.slice(7);
            // fs.readFile(url, 'utf8', (error, result) => {
            //     if (!error) {
            //         editor.setModel(monaco.editor.createModel(result, 'javascript'));
            //     }
            // });
        // });
    })
}
