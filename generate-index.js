// generate-index.js — run with: node generate-index.js
const fs = require('fs');
const path = require('path');

const folders = ['about']; // add your folders here

folders.forEach(folder => {
  const dirPath = path.join(__dirname, folder);
  if (!fs.existsSync(dirPath)) return;

  const files = fs.readdirSync(dirPath)
    .filter(f => f.endsWith('.html') && f !== 'index.html');

  const articles = files.map(f => {
    const filePath = path.join(dirPath, f);
    const content = fs.readFileSync(filePath, 'utf-8');
    const stat = fs.statSync(filePath);

    // Extract <title> or <h1> as the article title
    const titleMatch = content.match(/<title>(.*?)<\/title>/i);
    const rawTitle = titleMatch ? titleMatch[1].trim() : f.replace('.html', '');
    const title = rawTitle.split(' | ')[0].trim();

    const descMatch = content.match(/<meta\s+name=["']description["']\s+content=["'](.*?)["']/i);
    const desc = descMatch ? descMatch[1].trim() : '';

    return {
      title: title,
      url: '/' + folder + '/' + f,
      desc: desc,
      updated: stat.mtime.toISOString().split('T')[0]
    };
  });

  // Sort by most recent
  articles.sort((a, b) => new Date(b.updated) - new Date(a.updated));

  fs.writeFileSync(
    path.join(dirPath, 'index.json'),
    JSON.stringify(articles, null, 2)
  );

  console.log(`Generated ${folder}/index.json with ${articles.length} articles`);
});