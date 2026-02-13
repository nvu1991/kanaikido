// nav.js - Insert navigation bar with automatic path handling

(function() {
  // Calculate relative path to root based on current page depth
  function getBasePath() {
    const path = window.location.pathname;
    const depth = (path.match(/\//g) || []).length - 1;
    
    if (depth <= 0) return './';
    return '../'.repeat(depth);
  }

  function insertNav() {
    const base = getBasePath();
    
    const nav = document.createElement('nav');
    nav.className = 'article-nav';
    
    nav.innerHTML = `
      <a href="${base}index.html" class="nav-brand">
        <img src="${base}images/Kan Aikido Logo_clearWhite_80x80.webp" alt="Kan Aikido">
        Kan Aikido
      </a>
      <div class="nav-links">
        <a href="${base}about/">Giới thiệu</a>
        <a href="${base}index.html#practice">Luyện tập</a>
        <a href="${base}index.html#join">Tham gia</a>
        <a href="${base}index.html#contact">Liên hệ</a>
      </div>
    `;
    
    document.body.insertBefore(nav, document.body.firstChild);
  }

  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', insertNav);
  } else {
    insertNav();
  }
})();