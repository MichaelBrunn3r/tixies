const ghpages = require('gh-pages');

ghpages.publish(
    '__sapper__/export/tixies',
    {
        branch: 'gh-pages',
        repo: 'https://github.com/MichaelBrunn3r/tixies.git',
        user: {
            name: 'MichaelBrunn3r',
            email: 'MichaelBrunn3r@gmail.com'
        }
    },
    () => {
        console.log('Deploy Complete!')
    }
)