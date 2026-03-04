import { replaceInFile } from 'replace-in-file';

const options = {
    files: [
        'src/**/*.astro',
        'src/**/*.js',
        'src/**/*.mjs',
        'astro.config.mjs'
    ],
    from: /https:\/\/islamscompass\.com/g,
    to: 'https://islamiccompass.org',
};

async function replaceUrls() {
    try {
        const results = await replaceInFile(options);
        console.log('Replacement results:', results.filter(r => r.hasChanged).map(r => r.file));
    }
    catch (error) {
        console.error('Error occurred:', error);
    }
}

replaceUrls();
