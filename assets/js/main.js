// 共通のヘッダーHTML
const headerHtml = `<header class="page-header">
  <a class="will-logo" href="/index.html"
    ><img src="/assets/images/logo.svg" alt="TOPページへ戻る"
  /></a>
  <div id="nav-wrapper" class="nav-wrapper">
    <div class="hamburger" id="js-hamburger">
      <span class="hamburger__line hamburger__line--1"></span>
      <span class="hamburger__line hamburger__line--2"></span>
      <span class="hamburger__line hamburger__line--3"></span>
    </div>
    <nav class="sp-nav">
      <ul>
        <li><a href="/index.html">TOP</a></li>
        <li><a href="/pages/about/">About Us</a></li>
        <li><a href="/pages/seminars/">ゼミについて</a></li>
        <li><a href="/pages/activities/">活動紹介</a></li>
        <li><a href="/pages/events/event-1st.html">イベント一覧</a></li>
        <li><a href="/pages/join/">新歓・入会</a></li>
        <li><a href="/pages/faq/">FAQ・お問い合わせ</a></li>
      </ul>
    </nav>
    <div class="black-bg" id="js-black-bg"></div>
  </div>
  <div class="link-box">
    <a class="text-link" href="/index.html">Top</a>
    <a class="text-link" href="/pages/about/">About Us</a>
    <a class="text-link" href="/pages/seminars/">ゼミについて</a>
    <a class="text-link" href="/pages/activities/">活動紹介</a>
    <a class="text-link" href="/pages/events/event-1st.html">イベント一覧</a>
    <a class="text-link" href="/pages/join/">新歓・入会</a>
    <a class="text-link" href="/pages/faq/">FAQ・お問い合わせ</a>
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
        ><img src="/assets/images/x-logo.webp" alt=""
      /></a>
      <a
        class="instagram-logo"
        href="https://www.instagram.com/pgwu_info/"
        aria-label="instagram-logo"
        ><img src="/assets/images/instagram.svg" alt=""
      /></a>
    </div>
    <div class="footer-logo">
      <img src="/assets/images/logo.svg" alt="" />
      <img src="/assets/images/footer-full-logo.webp" alt="" />
    </div>
  </div>
  <div class="footer-copyright">
    <img src="/assets/images/copyright.svg" alt="" />
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