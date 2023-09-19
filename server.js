const fs = require ('node:fs');
const path = require ('node:path')

//const filePath = path.join(__dirname, 'coreFolder', 'file_5.txt')
const filePath = path.join(__dirname, 'coreFolder')

//fs.mkdir(filePath, (err) => {})

// fs.writeFile(filePath, 'Hello World!', (err) => {
//   if (err) throw new Error(err.message);
// })

fs.readdir(filePath, {withFileTypes: true}, function(err, items) {
  for (let i= 0; i < items.length; i ++) {
    if (items[i].isDirectory()) {
      console.log('Folder:', items[i].name);
    }else if (items[i].isFile()) {
      console.log('File:', items[i].name);
    }
  }
});