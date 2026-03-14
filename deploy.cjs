const ghpages = require('gh-pages');
ghpages.publish('dist', {
  branch: 'gh-pages',
  repo: 'https://github.com/DayanandD/Dayanand_.git',
  dotfiles: true,
  message: 'deploy portfolio',
}, (err) => {
  if (err) { console.error('Deploy failed:', err); process.exit(1); }
  else console.log('Published! → https://DayanandD.github.io/Dayanand_/');
});
