// 共通のヘッダーHTML
const headerHtml = `<header class="page-header">
  <a class="will-logo" href="./index.html"
    ><img src="./images/logo.svg" alt="TOPページへ戻る"
  /></a>
  <div id="nav-wrapper" class="nav-wrapper">
    <div class="hamburger" id="js-hamburger">
      <span class="hamburger__line hamburger__line--1"></span>
      <span class="hamburger__line hamburger__line--2"></span>
      <span class="hamburger__line hamburger__line--3"></span>
    </div>
    <nav class="sp-nav">
      <ul>
        <li><a href="./index.html">TOP</a></li>
        <li><a href="./about_us.html">About Us</a></li>
        <li><a href="./seminar_page.html">ゼミについて</a></li>
        <li><a href="./activity_page.html">活動紹介</a></li>
        <li><a href="./event-1st-page.html">イベント一覧</a></li>
        <li><a href="./join_page.html">新歓・入会</a></li>
        <li><a href="./faq_page.html">FAQ・お問い合わせ</a></li>
      </ul>
    </nav>
    <div class="black-bg" id="js-black-bg"></div>
  </div>
  <div class="link-box">
    <a class="text-link" href="./index.html">Top</a>
    <a class="text-link" href="./about_us.html">About Us</a>
    <a class="text-link" href="./seminar_page.html">ゼミについて</a>
    <a class="text-link" href="./activity_page.html">活動紹介</a>
    <a class="text-link" href="./event-1st-page.html">イベント一覧</a>
    <a class="text-link" href="./join_page.html">新歓・入会</a>
    <a class="text-link" href="./faq_page.html">FAQ・お問い合わせ</a>
  </div>
</header>`;

// 共通のフッターHTML
const footerHtml = `<footer class="footer">
  <div class="footer-top">
    <div class="footer-sm-logo">
      <a
        class="x-logo"
        href="https://x.com/pgwu_info?prefetchTimestamp=1739769263751&mx=2"
        aria-label="x-logo"
        ><img src="./images/x-logo.webp" alt=""
      /></a>
      <a
        class="instagram-logo"
        href="https://www.instagram.com/pgwu_info/"
        aria-label="instagram-logo"
        ><img src="./images/instagram.svg" alt=""
      /></a>
    </div>
    <div class="footer-logo">
      <img src="./images/footer-logo.svg" alt="" />
      <img src="./images/footer-full-logo.webp" alt="" />
    </div>
  </div>
  <div class="footer-copyright">
    <img src="./images/copyright.svg" alt="" />
    <p class="copyright-text">Waseda IT Leader Lab 2025</p>
  </div>
</footer>`;

// 共通のヘッダー・フッターを読み込む関数
function loadCommonComponents() {
  try {
    // ヘッダーの読み込み
    const headerContainer = document.getElementById('header-container');
    if (headerContainer) {
      headerContainer.innerHTML = headerHtml;
    }

    // フッターの読み込み
    const footerContainer = document.getElementById('footer-container');
    if (footerContainer) {
      footerContainer.innerHTML = footerHtml;
    }

    // ヘッダー・フッター読み込み完了後にハンバーガーメニューを初期化
    initializeHamburgerMenu();
  } catch (error) {
    console.error('共通コンポーネントの読み込みに失敗しました:', error);
  }
}

// ハンバーガーメニューの制御
function initializeHamburgerMenu() {
  var nav = document.getElementById("nav-wrapper");
  var hamburger = document.getElementById("js-hamburger");
  var blackBg = document.getElementById("js-black-bg");

  // ハンバーガーメニューが存在する場合のみ処理
  if (hamburger && nav && blackBg) {
    // ハンバーガーメニューのクリックイベント
    hamburger.addEventListener("click", function () {
      nav.classList.toggle("open");
    });

    // 背景クリックでメニューを閉じる
    blackBg.addEventListener("click", function () {
      nav.classList.remove("open");
    });

    // メニュー項目クリック時もメニューを閉じる（モバイル対応）
    var menuItems = nav.querySelectorAll('.sp-nav a');
    menuItems.forEach(function(item) {
      item.addEventListener("click", function () {
        nav.classList.remove("open");
      });
    });
  }
}

// ページ読み込み完了後に共通コンポーネントを読み込み
window.onload = function () {
  loadCommonComponents();
};
