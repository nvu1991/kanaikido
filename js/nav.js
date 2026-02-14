// nav.js - Insert navigation bar with automatic path handling

(function() {
  function insertNav() {
    const base = getBasePath();
    
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

  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', insertNav);
  } else {
    insertNav();
  }
})();