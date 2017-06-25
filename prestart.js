const spawn = require('cross-spawn');
const copydir = require('copy-dir');

const dest = 'public';
const src = './frontend';

const child = spawn('npm', ['run', 'build'], {
    cwd: src,
});

child.stdout.on(
    'data',
    data => console.log(data.toString())
);

child.stderr.on(
    'data',
    data => new Error(data.toString())
);

child.on('close', (code) => {
    if (code === 0) {
        console.log('copying static bundle');
        copydir.sync(`${src}/build`, dest);
        console.log('bundle copied correctly')
    }
});
