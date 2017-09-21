let path = require('path');
let fs = require('fs');
let workerContent = fs.readFileSync(path.join(__dirname, './dist/worker.js'), 'utf-8');

fs.readFile(path.join(__dirname, './dist/inMap.js'), 'utf-8', function (err, data) {
    if (err) {
        throw new Error('file not find');
    } else {

        workerContent = workerContent.replace("this hasn't been initialised - super() hasn't been called", '').replace(/\"/g, '\'');
        let repaleData = data.replace('[workerContentString]', workerContent);
        fs.writeFile(path.join(__dirname, './dist/inMap.js'), repaleData, function (err) {
            if (err) {
                throw new Error('write error');
            }
        });
    }

});



//fs.unlinkSync('./dist/worker.js');