// イベントリスト表示とページネーション機能

// イベントデータ（直接埋め込み）
const eventsData = [
  {
    "title": "新サイトを開設しました！",
    "date": "2025.4.1",
    "image": "../../assets/images/event-photo.webp",
    "imageAlt": "イベント写真",
    "description": "この度、WILLの新規HPを開設致しました！これから随時このサイトで<br />入会に関する新規情報やイベント情報などを発信していくので、<br />ぜひチェックお願いします！"
  },
  {
    "title": "新歓の時期がやってきました！",
    "date": "2025.4.1",
    "image": "../../assets/images/shinkan.webp",
    "imageAlt": "イベント写真",
    "description": "今年もやります！WILLの新歓！新入生、既存生、早大生かどうか関係なく、<br />プログラミングに興味ある方はぜひ一度説明会に参加してみてください！"
  },
  // イベントを追加する場合は、以下の形式で追加してください：
  // ,{
  //   "title": "イベントタイトル",
  //   "date": "2025.3.15",
  //   "image": "../../assets/images/event-photo.webp",
  //   "imageAlt": "イベント写真",
  //   "description": "イベントの説明文"
  // }
];

// アセットパスを取得する関数（main.jsと同じロジック）
function getAssetsPath() {
  if (window.location.protocol === 'file:') {
    const scriptTag = document.querySelector('script[src*="events.js"]');
    if (scriptTag) {
      const scriptSrc = scriptTag.getAttribute('src');
      if (scriptSrc) {
        if (scriptSrc.startsWith('./assets/js/events.js')) {
          return './assets';
        } else if (scriptSrc.startsWith('../')) {
          const assetsPath = scriptSrc.replace(/\/js\/events\.js$/, '').replace(/\/events\.js$/, '');
          return assetsPath || './assets';
        }
      }
    }
    
    const path = window.location.pathname;
    if (path === '/' || (path.includes('index.html') && !path.includes('/pages/'))) {
      return './assets';
    }
    if (path.includes('/pages/')) {
      const pathAfterPages = path.split('/pages/')[1];
      if (pathAfterPages) {
        const dirs = pathAfterPages.split('/').filter(p => p && !p.endsWith('.html'));
        const depth = dirs.length + 1;
        return '../'.repeat(depth) + 'assets';
      }
      return '../../assets';
    }
    return './assets';
  }
  return '/assets';
}

// イベントデータを読み込んで表示
function loadEvents() {
  const assetsPath = getAssetsPath();
  
  try {
    const events = eventsData;
    
    if (!Array.isArray(events) || events.length === 0) {
      throw new Error('イベントデータが空です');
    }
    
    console.log('読み込んだイベント数:', events.length);
    
    // URLパラメータから現在のページ番号を取得（デフォルトは1）
    const urlParams = new URLSearchParams(window.location.search);
    const currentPage = parseInt(urlParams.get('page')) || 1;
    
    // 1ページあたりの表示件数
    const itemsPerPage = 5;
    
    // ページネーション計算
    const totalPages = Math.ceil(events.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentEvents = events.slice(startIndex, endIndex);
    
    // イベントリストを表示
    displayEvents(currentEvents, assetsPath);
    
    // ページネーションボタンを表示
    displayPagination(currentPage, totalPages);
    
  } catch (error) {
    console.error('イベントデータの読み込みに失敗しました:', error);
    const eventList = document.querySelector('.event-list');
    if (eventList) {
      eventList.innerHTML = 
        `<div style="color: var(--ivory); padding: 20px;">
          <p>イベントデータの読み込みに失敗しました。</p>
          <p style="font-size: 14px; margin-top: 10px;">エラー: ${error.message}</p>
        </div>`;
    }
  }
}

// イベントリストを表示
function displayEvents(events, assetsPath) {
  const eventList = document.querySelector('.event-list');
  if (!eventList) return;
  
  eventList.innerHTML = events.map(event => {
    // 画像パスを修正（相対パスの場合）
    let imagePath = event.image;
    if (imagePath.startsWith('../../')) {
      // 既に相対パスの場合はそのまま使用
      imagePath = imagePath;
    } else if (imagePath.startsWith('/assets/')) {
      // 絶対パスの場合、相対パスに変換
      imagePath = imagePath.replace('/assets/', assetsPath + '/');
    }
    
    return `
      <div class="event-block">
        <img src="${imagePath}" alt="${event.imageAlt || 'イベント写真'}" loading="lazy" />
        <div class="event-content">
          <div class="event-title-and-date">
            <div class="event-title">${event.title}</div>
            <div class="event-date">${event.date}</div>
          </div>
          <div class="event-description">
            ${event.description}
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// ページネーションボタンを表示
function displayPagination(currentPage, totalPages) {
  const pageButtons = document.querySelector('.page-buttons');
  if (!pageButtons) return;
  
  // ページが1つしかない場合はページネーションを非表示
  if (totalPages <= 1) {
    pageButtons.innerHTML = '';
    return;
  }
  
  // ページボタンを生成
  let buttonsHTML = '';
  
  for (let i = 1; i <= totalPages; i++) {
    if (i === currentPage) {
      // 現在のページはcurrent-buttonクラスを使用
      buttonsHTML += `<div class="current-button" style="pointer-events: none;">${i}</div>`;
    } else {
      // 他のページはリンク付きボタン
      const currentPath = window.location.pathname;
      const pageParam = i === 1 ? '' : `?page=${i}`;
      buttonsHTML += `<div class="button"><a href="${currentPath}${pageParam}">${i}</a></div>`;
    }
  }
  
  pageButtons.innerHTML = buttonsHTML;
}

// ページ読み込み時に実行
document.addEventListener('DOMContentLoaded', loadEvents);
