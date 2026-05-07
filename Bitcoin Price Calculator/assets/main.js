/* =========================================================
   Bitcoin Calculator — Common JS (nav, footer, theme)
   ========================================================= */

/* ── Theme ── */
function toggleTheme() {
  const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('btc-theme', next);
  _updateThemeBtn();
}

function _updateThemeBtn() {
  const btn = document.getElementById('theme-btn');
  if (!btn) return;
  const dark = document.documentElement.getAttribute('data-theme') === 'dark';
  btn.textContent = dark ? '☀️' : '🌙';
  btn.title = dark ? '라이트 모드' : '다크 모드';
}

/* ── Mobile menu ── */
function toggleMobileMenu() {
  const menu = document.getElementById('mobile-menu');
  if (menu) menu.classList.toggle('open');
}

document.addEventListener('click', function (e) {
  const menu = document.getElementById('mobile-menu');
  const burger = document.getElementById('hamburger');
  if (menu && burger && !menu.contains(e.target) && !burger.contains(e.target)) {
    menu.classList.remove('open');
  }
});

/* ── Nav & Footer injection ── */
function _isActive(linkHref) {
  const path = window.location.pathname;
  const currentFile = path.split('/').pop() || 'index.html';
  const linkFile = linkHref.split('/').pop();
  const inBlog = path.includes('/blog/');
  const linkInBlog = linkHref.includes('blog/');

  if (linkInBlog && inBlog) return true;
  if (!linkInBlog && !inBlog && currentFile === linkFile) return true;
  if (linkFile === 'index.html' && (currentFile === '' || currentFile === 'index.html') && !inBlog && !linkInBlog) return true;
  return false;
}

function injectNav() {
  const root = window.ROOT_PATH || '';
  const links = [
    { href: root + 'index.html',       label: '홈' },
    { href: root + 'blog/index.html',  label: '블로그' },
    { href: root + 'guide.html',       label: '이용방법' },
    { href: root + 'contact.html',     label: '문의' },
  ];

  const desktopLinks = links.map(l =>
    `<a href="${l.href}"${_isActive(l.href) ? ' class="active"' : ''}>${l.label}</a>`
  ).join('');
  const mobileLinks = links.map(l =>
    `<a href="${l.href}"${_isActive(l.href) ? ' class="active"' : ''}>${l.label}</a>`
  ).join('');

  const html = `
<nav class="nav">
  <div class="nav-inner">
    <a class="nav-logo" href="${root}index.html">₿ 비트코인 계산기</a>
    <div class="nav-links">${desktopLinks}</div>
    <div class="nav-controls">
      <button class="icon-btn" id="theme-btn" onclick="toggleTheme()">🌙</button>
      <button class="icon-btn nav-hamburger" id="hamburger" onclick="toggleMobileMenu()" aria-label="메뉴">☰</button>
    </div>
  </div>
  <div class="mobile-menu" id="mobile-menu">${mobileLinks}</div>
</nav>`;

  const ph = document.getElementById('nav-placeholder');
  if (ph) ph.outerHTML = html;
}

function injectFooter() {
  const root = window.ROOT_PATH || '';
  const html = `
<footer class="footer">
  <div class="footer-inner">
    <div class="footer-links">
      <a href="${root}terms.html">이용약관</a>
      <a href="${root}privacy.html">개인정보처리방침</a>
      <a href="${root}disclaimer.html">면책조항</a>
      <a href="${root}contact.html">문의</a>
      <a href="${root}about.html">소개</a>
    </div>
    <p class="footer-copy">© 2026 비트코인 계산기. All rights reserved.</p>
    <p class="footer-disclaimer">본 사이트는 투자 조언을 제공하지 않으며, 정보 제공 목적으로만 운영됩니다.</p>
  </div>
</footer>`;

  const ph = document.getElementById('footer-placeholder');
  if (ph) ph.outerHTML = html;
}

/* ── Init ── */
document.addEventListener('DOMContentLoaded', function () {
  injectNav();
  injectFooter();
  _updateThemeBtn();
});
