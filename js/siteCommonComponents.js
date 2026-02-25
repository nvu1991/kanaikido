// components.js

(function() {

  function insertNav() {
    const nav = document.createElement('nav');
    nav.className = 'article-nav';
    nav.innerHTML = `
      <a href="/" class="nav-brand">
        <img src="/images/Kan Aikido Logo_clearWhite_80x80.webp" alt="Kan Aikido">
        Kan Aikido
      </a>
      <div class="nav-links">
        <a href="/about/">Giới thiệu</a>
        <a href="/#practice">Luyện tập</a>
        <a href="/#join">Tham gia</a>
        <a href="/#contact">Liên hệ</a>
      </div>
    `;
    document.body.insertBefore(nav, document.body.firstChild);
  }

  function insertComments() {
    const el = document.getElementById('comments');
    if (!el) return;
    el.innerHTML = `
      <div class="comment-section">
        <h2>Comments</h2>
        <div id="hashover"></div>
      </div>
    `;
    const script = document.createElement('script');
    script.src = 'https://tsas.vn/hashover-kanaikido/comments.php';
    document.getElementById('hashover').appendChild(script);
  }

  async function insertRelated() {
    const el = document.getElementById('related');
    if (!el) return;

    // Determine current folder and page
    const currentPath = window.location.pathname;
    const folder = currentPath.substring(0, currentPath.lastIndexOf('/') + 1);

    try {
      const res = await fetch(folder + 'index.json');
      if (!res.ok) return;
      const articles = await res.json();

      // Filter out current page, sort by most recently edited, take top 3
      const related = articles
        .filter(a => a.url !== currentPath)
        .sort((a, b) => new Date(b.updated) - new Date(a.updated))
        .slice(0, 3);

      if (related.length === 0) return;

      el.innerHTML = `
        <div class="related-articles">
          <h2>Bài viết liên quan</h2>
          <div class="related-list">
            ${related.map(a => `
              <a href="${a.url}" class="related-link">
                <h3>${a.title}</h3>
                ${a.desc ? `<p>${a.desc}</p>` : ''}
              </a>
            `).join('')}
          </div>
        </div>
      `;
    } catch (e) {
      // No index.json in this folder, skip silently
    }
  }

  function insertFooter() {
    const footer = document.createElement('footer');
    footer.innerHTML = `
      <p class="footer-name">Kan Aikido</p>
      <p class="footer-viet">Giản Hiệp Khí Đạo</p>
      <p class="footer-contact">Chào đón mọi trình độ</p>
    `;
    document.body.appendChild(footer);
  }

  function insertDelayedElements() {
    const el = document.getElementById('delayedElements');
    if (!el) return;

    let delayedElementsHTMLString = '';
    
    const commentEl = document.getElementById('comment');
    if(commentEl)
    {
      delayedElementsHTMLString +=
      `
        <link rel="stylesheet" href="/css/customComment.css">
      `;
    }

    if(delayedElementsHTMLString.length == 0)
    {
      el.remove();
    } else {
      el.innerHTML = delayedElementsHTMLString;
    }
  }

  function init() {
    insertNav();
    insertComments();
    insertRelated();
    insertFooter();
    insertDelayedElements();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();