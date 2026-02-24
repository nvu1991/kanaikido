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
    script.src = 'https://tsas.vn/hashover/comments.php';
    document.getElementById('hashover').appendChild(script);
  }

  function insertRelated() {
    const el = document.getElementById('related');
    if (!el || !el.dataset.articles) return;
    // el.innerHTML =`
    // <section class="related-articles">
    //   <h2>Bài viết liên quan</h2>
    //   <div class="related-list">
    //     <a href="aikido.html" class="related-link">
    //       <h3>Aikido — Võ Đạo Hòa Hợp</h3>
    //       <p>Lịch sử và các dòng phái Aikido</p>
    //     </a>
    //     <a href="nishio.html" class="related-link">
    //       <h3>Trường Phái Shoji Nishio</h3>
    //       <p>Một cách tiếp cận riêng biệt</p>
    //     </a>
    //     <a href="kan-aikido.html" class="related-link">
    //       <h3>Kan Aikido — Giản Hiệp Khí Đạo</h3>
    //       <p>Giải pháp và ứng dụng mới trên những nguyên tắc nguyên thuỷ.</p>
    //     </a>
    //   </div>
    // </section>
    // `;
    const articles = JSON.parse(el.dataset.articles);
    el.innerHTML = `
      <div class="related-articles">
        <h2>Related Articles</h2>
        <div class="related-list">
          ${articles.map(a => `
            <a href="${a.url}" class="related-link">
              <h3>${a.title}</h3>
              <p>${a.desc}</p>
            </a>
          `).join('')}
        </div>
      </div>
    `;
  }

  function insertFooter() {
    const footer = document.createElement('footer');
    footer.innerHTML = `
      <div class="footer-name">Kan Aikido</div>
      <div class="footer-viet">Võ đường Kan Aikido</div>
      <div class="footer-contact">Contact info here</div>
    `;
    document.body.appendChild(footer);
  }

  function insertDelayedElements() {
    const el = document.getElementById('delayedElements');
    if (!el) return;
    el.innerHTML = `
      <link rel="stylesheet" href="/css/customComment.css">
    `;
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