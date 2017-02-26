const { ipcRenderer, remote } = require('electron');
const loader = require('monaco-loader');
const fs = require('fs');

class FileManager {
    constructor({editor}) {
        this.editor = editor;
        // When we receive a 'navigate' message from main process (index.js), open the file
        ipcRenderer.on('navigate', (e, url) => this.openFile(url))

        document.querySelector('#save').onclick = () => this.saveFile()
    }

    openFile(url) {
        // fs.readFile doesn't know what `file://` means
       url = url.slice(7);
       fs.readFile(url, 'utf8', (error, result) => {
           if (!error) {
               this.editor.setModel(monaco.editor.createModel(result, 'javascript'));
           }
       });
    }

    saveFile() {
        //remote - easy IPC (inter-process communication between render process and main)
        remote.dialog.showSaveDialog(filename => {
            let data = ''
            let model = this.editor.getModel()

            model._lines.forEach(line => data += line.text + model._EOL)
            fs.writeFile(filename, data, 'utf-8')
        });
    }
}

module.exports = FileManager
