// ベースパスを取得する関数（ローカル開発とGitHub Pagesの両方に対応）
function getBasePath() {
  // ローカル開発環境（file://プロトコル）の場合
  if (window.location.protocol === 'file:') {
    const path = window.location.pathname;
    // ルートのindex.htmlの場合
    if (path === '/' || (path.includes('index.html') && !path.includes('/pages/'))) {
      return '.';
    }
    // pagesディレクトリ内の場合
    if (path.includes('/pages/')) {
      const pathAfterPages = path.split('/pages/')[1];
      if (pathAfterPages) {
        const dirs = pathAfterPages.split('/').filter(p => p && !p.endsWith('.html'));
        const depth = dirs.length + 1;
        return '../'.repeat(depth).slice(0, -1); // 最後のスラッシュを削除
      }
      return '../..';
    }
    return '.';
  }
  // HTTP/HTTPSの場合（GitHub Pages含む）
  // GitHub Pagesのリポジトリ名を考慮（通常は空文字列、サブディレクトリの場合は設定が必要）
  return '';
}

// アセットパスを取得する関数
function getAssetsPath() {
  const basePath = getBasePath();
  if (window.location.protocol === 'file:') {
    return basePath + '/assets';
  }
  return basePath + '/assets';
}

// 共通のヘッダーHTML
function getHeaderHtml() {
  const assetsPath = getAssetsPath();
  const basePath = getBasePath();
  return `
  <header class="page-header">
    <a class="will-logo" href="${basePath}/index.html">
      <img src="${assetsPath}/images/logo.svg" alt="TOPページへ戻る"/>
    </a>
    <div id="nav-wrapper" class="nav-wrapper">
      <div class="hamburger" id="js-hamburger">
        <span class="hamburger__line hamburger__line--1"></span>
        <span class="hamburger__line hamburger__line--2"></span>
        <span class="hamburger__line hamburger__line--3"></span>
      </div>
      <nav class="sp-nav">
        <ul>
          <li><a href="${basePath}/index.html">TOP</a></li>
          <li><a href="${basePath}/pages/about/index.html">About Us</a></li>
          <li><a href="${basePath}/pages/seminars/index.html">ゼミについて</a></li>
          <li><a href="${basePath}/pages/activities/index.html">活動紹介</a></li>
          <li><a href="${basePath}/pages/events/event-1st.html">イベント一覧</a></li>
          <li><a href="${basePath}/pages/join/index.html">新歓・入会</a></li>
          <li><a href="${basePath}/pages/faq/index.html">FAQ・お問い合わせ</a></li>
        </ul>
      </nav>
      <div class="black-bg" id="js-black-bg"></div>
    </div>
    <div class="link-box">
      <a class="text-link" href="${basePath}/index.html">Top</a>
      <a class="text-link" href="${basePath}/pages/about/index.html">About Us</a>
      <a class="text-link" href="${basePath}/pages/seminars/index.html">ゼミについて</a>
      <a class="text-link" href="${basePath}/pages/activities/index.html">活動紹介</a>
      <a class="text-link" href="${basePath}/pages/events/event-1st.html">イベント一覧</a>
      <a class="text-link" href="${basePath}/pages/join/index.html">新歓・入会</a>
      <a class="text-link" href="${basePath}/pages/faq/index.html">お問い合わせ・FAQ</a>
    </div>
  </header>
  `;
}

// 共通のフッターHTML
function getFooterHtml() {
  const assetsPath = getAssetsPath();
  return `
  <footer class="footer">
    <div class="footer-top">
      <div class="footer-sm-logo">
        <a
          class="x-logo"
          href="https://x.com/pgwu_info?prefetchTimestamp=1739769263751&mx=2"
          aria-label="x-logo"
          ><img src="${assetsPath}/images/x-logo.webp" alt=""
        /></a>
        <a
          class="instagram-logo"
          href="https://www.instagram.com/pgwu_info/"
          aria-label="instagram-logo"
          ><img src="${assetsPath}/images/instagram.svg" alt=""
        /></a>
      </div>
      <div class="footer-logo">
        <img src="${assetsPath}/images/footer-logo.svg" alt="" />
        <img src="${assetsPath}/images/footer-full-logo.webp" alt="" />
      </div>
    </div>
    <div class="footer-copyright">
      <img src="${assetsPath}/images/copyright.svg" alt="" />
      <p class="copyright-text">Waseda IT Leader Lab 2025</p>
    </div>
  </footer>`;
}

// 共通のヘッダー・フッターを読み込む関数
function loadCommonComponents() {
  try {
    // ヘッダーの読み込み
    const headerContainer = document.getElementById('header-container');
    if (headerContainer) {
      headerContainer.innerHTML = getHeaderHtml();
    }

    // フッターの読み込み
    const footerContainer = document.getElementById('footer-container');
    if (footerContainer) {
      footerContainer.innerHTML = getFooterHtml();
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


window.addEventListener("load", () => {
  const slider = document.querySelector(".slider");
  const slides = Array.from(slider.children);
  const gap = 48;
  const speed = 1.0;
  let offsetX = 0;

  // Clone original slides for seamless loop
  slides.forEach((slide) => {
    const clone = slide.cloneNode(true);
    slider.appendChild(clone);
  });

  // Allow layout to stabilize before measuring
  setTimeout(() => {
    const firstSlide = slides[0];
    const slideWidth = firstSlide.offsetWidth;

    const visibleSlides = 4; // How many are visible at once
    const totalVisibleWidth = (slideWidth + gap) * visibleSlides;

    const originalContentWidth = (slideWidth + gap) * slides.length;

    // 👇 Adjust this manually for better timing
    const resetPoint = originalContentWidth - totalVisibleWidth + 15.0;

    function loop() {
      offsetX -= speed;

      if (-offsetX >= resetPoint) {
        offsetX = 0;
        slider.style.transform = `translateX(0px)`;
      } else {
        slider.style.transform = `translateX(${offsetX}px)`;
      }

      requestAnimationFrame(loop);
    }

    loop();
  }, 50);
});