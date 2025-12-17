// イベントリスト表示とページネーション機能

// イベントデータ（直接埋め込み）
const eventsData = [
  {
    "title": "房総半島へドライブしました！",
    "date": "2025.10.12",
    "image": "../../assets/images/events/202510_recreation_bousou-drive.webp",
    "imageAlt": "房総半島ドライブの様子",
    "description": "10月レクとして房総半島ドライブを開催しました！房総半島で美味しい海鮮丼を味わい、鋸山の絶景や「道の駅 保田小学校」も巡って、大満足の1日でした！"
  },
  {
    "title": "U22プログラミングコンテストに参加しました！",
    "date": "2025.8.29",
    "image": "../../assets/images/events/202508_u22-pro-con.webp",
    "imageAlt": "U22プログラミングコンテスト参加の様子",
    "description": "WILLの有志メンバーで、7月末から8月29日にかけて「U22プログラミングコンテスト」に参加しました！開発したアプリの詳細は、以下のリンクよりご確認いただけます！<br><a href=\"https://protopedia.net/prototype/private/3b37b4fe-5169-48fc-b195-483930bab3d3\" target=\"_blank\" rel=\"noopener noreferrer\">作品紹介ページ</a>"
  },
  {
    "title": "Wheel-upを開催しました！",
    "date": "2025.7.16",
    "image": "../../assets/images/events/202507_wheel-up.webp",
    "imageAlt": "Wheel-upイベントの様子",
    "description": "チーム開発イベント「Wheel-up」を開催しました！約7週間、開発の基礎から学び、生成AIを用いてチームでWebアプリを開発しました。"
  },
  {
    "title": "新歓BBQを開催しました！",
    "date": "2025.5.18",
    "image": "../../assets/images/events/202505_bbq.webp",
    "imageAlt": "新歓BBQの様子",
    "description": "新入生も慣れてきた頃ということで、息抜きも兼ねてBBQを開催しました！当日雨予報でしたが、当日なんとか曇りで楽しむことができました。"
  },
  {
    "title": "銀座で街歩き謎解きをしました！",
    "date": "2025.4.27",
    "image": "../../assets/images/events/202504_recreation_nazotoki.webp",
    "imageAlt": "銀座で街歩き謎解きイベントの様子",
    "description": "4月レクとして、銀座で街歩き謎解きに参加しました！今回は新入生を含む8人が参加し、みんなで協力して謎を解き進め、無事最後までクリアしました。"
  },
  {
    "title": "新歓の時期がやってきました！",
    "date": "2025.4.1",
    "image": "../../assets/images/shinkan.webp",
    "imageAlt": "イベント写真",
    "description": "今年もやります！WILLの新歓！新入生、既存生、早大生かどうか関係なく、<br>プログラミングに興味ある方はぜひ一度説明会に参加してみてください！"
  },
  {
    "title": "新サイトを開設しました！",
    "date": "2025.4.1",
    "image": "../../assets/images/event-photo.webp",
    "imageAlt": "イベント写真",
    "description": "この度、WILLの新規HPを開設致しました！これから随時このサイトで<br>入会に関する新規情報やイベント情報などを発信していくので、<br>ぜひチェックお願いします！"
  },
];

// アセットパスを取得する関数（main.jsの関数を使用）
// main.jsのgetAssetsPath()が既に定義されている場合はそれを使用し、
// 定義されていない場合のみフォールバック処理を行う
function getAssetsPathForEvents() {
  // main.jsのgetAssetsPath()が利用可能な場合はそれを使用
  if (typeof getAssetsPath === 'function') {
    return getAssetsPath();
  }
  
  // フォールバック（main.jsが読み込まれていない場合）
  if (window.location.protocol === 'file:') {
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
  const assetsPath = getAssetsPathForEvents();
  
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
      // 他のページはリンク付きボタン（ボタン全体をaタグに）
      const currentPath = window.location.pathname;
      const pageParam = i === 1 ? '' : `?page=${i}`;
      buttonsHTML += `<a href="${currentPath}${pageParam}" class="button">${i}</a>`;
    }
  }
  
  pageButtons.innerHTML = buttonsHTML;
}

// ページ読み込み時に実行
document.addEventListener('DOMContentLoaded', loadEvents);
