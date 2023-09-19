const fs = require ('node:fs');
const path = require ('node:path')

const filePath = path.join(__dirname, 'coreFolder')

for (let i = 1; i < 6; i++) {
  fs.mkdir(path.join(filePath, 'folder_' + i), {recursive: true}, (err) => {})
}

for (let i = 1; i < 6; i++) {
  fs.writeFile(path.join(filePath, `file_${i}.txt`), 'Hello World!', (err) => {})
}

fs.readdir(filePath, {withFileTypes: true}, function(err, items) {
  for (let i= 0; i < items.length; i ++) {
    console.log(items[i].isDirectory() ? 'Folder:' : 'File:', items[i].name)
  }
});