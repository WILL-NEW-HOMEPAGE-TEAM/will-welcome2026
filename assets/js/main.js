// サイトのルートパスを取得する関数（リポジトリ名を考慮）
function getSiteRoot() {
  const pathname = window.location.pathname;
  const parts = pathname.split('/').filter(p => p);
  
  // 既知のディレクトリ名（サイトのルートにあるディレクトリ）
  const knownRootDirs = ['pages', 'assets'];
  
  // 最初に見つかった既知のディレクトリの位置を探す
  let rootIndex = -1;
  for (let i = 0; i < parts.length; i++) {
    // 既知のディレクトリか、HTMLファイルを検出
    if (knownRootDirs.includes(parts[i]) || parts[i].endsWith('.html')) {
      rootIndex = i;
      break;
    }
  }
  
  // 既知のディレクトリが見つからない場合
  if (rootIndex === -1) {
    // パスが空または/のみの場合、リポジトリ名がない
    if (parts.length === 0) {
      return '';
    }
    
    // parts.length > 0 の場合、最初の部分がリポジトリ名の可能性がある
    // ただし、それが既知のディレクトリでないことを確認
    // 例: /リポジトリ名/ → parts = ['リポジトリ名']
    if (parts.length === 1 && !knownRootDirs.includes(parts[0])) {
      // 単一のパーツで、既知のディレクトリでない場合、リポジトリ名と判断
      return '/' + parts[0];
    }
    
    // それ以外の場合は、リポジトリ名なしと仮定
    return '';
  }
  
  // リポジトリ名がある場合、その部分を返す
  // 例: ['WILL-NEW-HOMEPAGE', 'pages', 'about'] → '/WILL-NEW-HOMEPAGE'
  if (rootIndex > 0) {
    return '/' + parts.slice(0, rootIndex).join('/');
  }
  
  // リポジトリ名がない場合（ルートディレクトリが公開されている場合）
  return '';
}

// ベースパスを取得する関数（ローカル開発とGitHub Pagesの両方に対応）
function getBasePath() {
  const pathname = window.location.pathname;
  const siteRoot = getSiteRoot();
  
  // サイトルートを除いたパスを取得
  let relativePath = pathname;
  if (siteRoot && pathname.startsWith(siteRoot)) {
    relativePath = pathname.slice(siteRoot.length);
  }
  
  // パスを正規化（先頭と末尾のスラッシュを処理）
  if (!relativePath.startsWith('/')) {
    relativePath = '/' + relativePath;
  }
  if (relativePath.endsWith('/')) {
    relativePath = relativePath.slice(0, -1);
  }
  
  // ルートページ（/ または /index.html）の場合
  if (relativePath === '/' || relativePath === '/index.html' || 
      (relativePath.endsWith('/index.html') && !relativePath.includes('/pages/'))) {
    return '.';
  }
  
  // pagesディレクトリ内の場合
  if (relativePath.includes('/pages/')) {
    // パスを分割
    const parts = relativePath.split('/').filter(p => p);
    
    // pagesの位置を探す
    const pagesIndex = parts.indexOf('pages');
    if (pagesIndex === -1) {
      return '.';
    }
    
    // pages/以降のディレクトリ数を計算
    // 例: /pages/about/index.html → parts = ['pages', 'about', 'index.html']
    // pagesの後にあるディレクトリ数（HTMLファイルを除く）
    const afterPages = parts.slice(pagesIndex + 1);
    const dirCount = afterPages.filter(p => !p.endsWith('.html')).length;
    
    // ルートに戻るには、pagesディレクトリ分 + その後のディレクトリ分の..が必要
    // 例: /pages/about/index.html → ../../ (pages + about = 2階層上)
    const depth = dirCount + 1; // +1はpagesディレクトリ分
    return '../'.repeat(depth).slice(0, -1); // 最後のスラッシュを削除
  }
  
  // その他の場合（ルートページとして扱う）
  return '.';
}

// アセットパスを取得する関数（リポジトリ名を考慮）
function getAssetsPath() {
  const siteRoot = getSiteRoot();
  const basePath = getBasePath();
  
  // リポジトリ名がある場合、絶対パスを生成
  if (siteRoot) {
    return siteRoot + '/assets';
  }
  
  // リポジトリ名がない場合、相対パスを生成
  if (basePath === '.') {
    return './assets';
  }
  return basePath + '/assets';
}

// パスを正規化する関数（リポジトリ名を考慮）
function normalizePath(basePath, path) {
  const siteRoot = getSiteRoot();
  
  // リポジトリ名がある場合、絶対パスを生成
  if (siteRoot) {
    // パスから先頭のスラッシュを削除
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;
    return siteRoot + '/' + cleanPath;
  }
  
  // リポジトリ名がない場合、相対パスを生成
  if (basePath === '.') {
    return path.startsWith('/') ? path.slice(1) : path;
  }
  return basePath + path;
}

// 現在のページを判定する関数
function getCurrentPage() {
  const pathname = window.location.pathname;
  const siteRoot = getSiteRoot();
  
  // サイトルートを除いたパスを取得
  let relativePath = pathname;
  if (siteRoot && pathname.startsWith(siteRoot)) {
    relativePath = pathname.slice(siteRoot.length);
  }
  
  // パスを正規化
  if (!relativePath.startsWith('/')) {
    relativePath = '/' + relativePath;
  }
  if (relativePath.endsWith('/')) {
    relativePath = relativePath.slice(0, -1);
  }
  
  // ルートページ（/ または /index.html）
  if (relativePath === '/' || relativePath === '/index.html' || 
      (relativePath.endsWith('/index.html') && !relativePath.includes('/pages/'))) {
    return 'top';
  }
  
  // 各ページの判定
  if (relativePath.includes('/pages/about/')) {
    return 'about';
  }
  if (relativePath.includes('/pages/seminars/')) {
    return 'seminars';
  }
  if (relativePath.includes('/pages/activities/')) {
    return 'activities';
  }
  if (relativePath.includes('/pages/events/')) {
    return 'events';
  }
  if (relativePath.includes('/pages/join/')) {
    return 'join';
  }
  if (relativePath.includes('/pages/faq/')) {
    return 'faq';
  }
  
  return 'top'; // デフォルト
}

// 共通のヘッダーHTML
function getHeaderHtml() {
  const assetsPath = getAssetsPath();
  const basePath = getBasePath();
  const siteRoot = getSiteRoot();
  const currentPage = getCurrentPage();
  
  // ルートリンクを生成（リポジトリ名を考慮）
  const rootLink = siteRoot ? siteRoot + '/index.html' : (basePath === '.' ? 'index.html' : normalizePath(basePath, '/index.html'));
  
  // 各リンクのURLとアクティブ状態
  const links = [
    { url: rootLink, text: 'Top', page: 'top', mobileText: 'TOP' },
    { url: normalizePath(basePath, '/pages/about/index.html'), text: 'About Us', page: 'about', mobileText: 'About Us' },
    { url: normalizePath(basePath, '/pages/seminars/index.html'), text: 'ゼミについて', page: 'seminars', mobileText: 'ゼミについて' },
    { url: normalizePath(basePath, '/pages/activities/index.html'), text: '活動紹介', page: 'activities', mobileText: '活動紹介' },
    { url: normalizePath(basePath, '/pages/events/index.html'), text: 'イベント一覧', page: 'events', mobileText: 'イベント一覧' },
    { url: normalizePath(basePath, '/pages/join/index.html'), text: '新歓・入会', page: 'join', mobileText: '新歓・入会' },
    { url: normalizePath(basePath, '/pages/faq/index.html'), text: 'お問い合わせ・FAQ', page: 'faq', mobileText: 'FAQ・お問い合わせ' }
  ];
  
  // モバイルメニューのHTMLを生成
  const mobileMenuItems = links.map(link => {
    const activeClass = currentPage === link.page ? ' class="active"' : '';
    return `<li><a href="${link.url}"${activeClass}>${link.mobileText}</a></li>`;
  }).join('\n          ');
  
  // PCメニューのHTMLを生成
  const pcMenuItems = links.map(link => {
    const activeClass = currentPage === link.page ? ' active' : '';
    return `<a class="text-link${activeClass}" href="${link.url}">${link.text}</a>`;
  }).join('\n      ');
  
  return `
  <header class="page-header">
    <a class="will-logo" href="${rootLink}">
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
          ${mobileMenuItems}
        </ul>
      </nav>
      <div class="black-bg" id="js-black-bg"></div>
    </div>
    <div class="link-box">
      ${pcMenuItems}
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
          href="https://x.com/pgwu_info"
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