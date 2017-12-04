

let path = require('path');
let fs = require('fs');
let workerContent = fs.readFileSync(path.join(__dirname, './dist/worker.min.js'), 'utf-8');

fs.readFile(path.join(__dirname, './dist/inmap.min.js'), 'utf-8', function (err, data) {
    if (err) {
        throw new Error('file not find');
    } else {

        workerContent =workerContent.replace(/"/g,'\\"').replace(/'/g,'\\\'');
        
        let repaleData = data.replace('[workerContentString]', workerContent);
        fs.writeFile(path.join(__dirname, './dist/inmap.min.js'), repaleData, function (err) {
            if (err) {
                throw new Error('write error');
            }
        });      
    }

});



