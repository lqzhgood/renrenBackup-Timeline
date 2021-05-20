const fs = require('fs-extra');

const { getFiles, down } = require('./lib.js');

(async () => {
    const files = getFiles();
    console.log('total', files.length);
    for (let i = 0; i < files.length; i++) {
        const f = files[i];
        try {
            const name = await down(f);
            fs.moveSync(name, f, { overwrite: true });
            files[i] = undefined;
        } catch (error) {
            console.log('error');
        }
    }
    console.log('remaining', files.filter(v => v).length);
})();
