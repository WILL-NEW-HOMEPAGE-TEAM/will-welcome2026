// 活動写真データ管理

// 活動写真データ（直接埋め込み）
const activityPhotosData = [
  {
    "image": "./assets/images/events/202508_u22-pro-con.webp",
    "alt": "U22プログラミングコンテスト参加の様子",
    "name": "U22プログラミングコンテスト",
    "text": "有志メンバーでアプリを開発しました！"
  },
  {
    "image": "./assets/images/events/202507_wheel-up.webp",
    "alt": "Wheel-upイベントの様子",
    "name": "Wheel-up開催",
    "text": "チーム開発イベントを開催しました！"
  },
  {
    "image": "./assets/images/amongus.webp",
    "alt": "Among Usをプレイ",
    "name": "Among Usをプレイ！",
    "text": "究極の心理戦を楽しめました！"
  },
  {
    "image": "./assets/images/bbq.webp",
    "alt": "BBQ",
    "name": "BBQ",
    "text": "自然の中でのBBQを楽しみました！"
  },
  {
    "image": "./assets/images/dinner.webp",
    "alt": "打ち上げ",
    "name": "打ち上げ",
    "text": "秋学期終了を祝して打ち上げをしました！"
  },
  {
    "image": "./assets/images/nazotoki.webp",
    "alt": "メトロ謎解き",
    "name": "メトロ謎解き",
    "text": "皆で頑張って謎解き中..."
  },
  {
    "image": "./assets/images/tmc.webp",
    "alt": "TMC",
    "name": "TMC",
    "text": "TOKYO MYSTERY CIRCUSで謎解きをしてきました！"
  }
];

// アセットパスを取得する関数（main.jsの関数を使用）
function getAssetsPathForActivityPhotos() {
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

// トップページのカルーセル用に活動写真を表示
function displayActivityPhotosForCarousel() {
  const carouselInner = document.querySelector('.carousel-inner');
  if (!carouselInner) return;
  
  const assetsPath = getAssetsPathForActivityPhotos();
  
  // 既存のアイテムをクリア（クローンされたものを除く）
  const originalItems = [...carouselInner.querySelectorAll('.item')].filter(
    item => !item.classList.contains('cloned')
  );
  originalItems.forEach(item => item.remove());
  
  // 新しいアイテムを追加
  activityPhotosData.forEach(photo => {
    const item = document.createElement('div');
    item.className = 'item';
    
    // 画像パスを調整
    let imagePath = photo.image;
    if (imagePath.startsWith('./assets/')) {
      imagePath = imagePath.replace('./assets/', assetsPath + '/');
    }
    
    item.innerHTML = `
      <img src="${imagePath}" alt="${photo.alt}" />
      <div class="event-name">${photo.name}</div>
      <div class="event-text">${photo.text}</div>
    `;
    
    carouselInner.appendChild(item);
  });
}

// 活動ページのスライダー用に活動写真を表示
function displayActivityPhotosForSlider() {
  const slider = document.querySelector('.slider');
  if (!slider) return;
  
  const assetsPath = getAssetsPathForActivityPhotos();
  
  // スライダーをクリア
  slider.innerHTML = '';
  
  // オリジナルのスライドを追加
  activityPhotosData.forEach(photo => {
    const slide = document.createElement('div');
    slide.className = 'slide';
    
    // 画像パスを調整
    let imagePath = photo.image;
    if (imagePath.startsWith('./assets/')) {
      imagePath = imagePath.replace('./assets/', assetsPath + '/');
    }
    
    slide.innerHTML = `
      <img src="${imagePath}" alt="${photo.alt}" loading="lazy" />
      <div class="event-name">${photo.name}</div>
      <div class="event-text">${photo.text}</div>
    `;
    
    slider.appendChild(slide);
  });
  
  // 複製されたスライドを追加（スムーズなループ用）
  activityPhotosData.forEach(photo => {
    const slide = document.createElement('div');
    slide.className = 'slide';
    
    // 画像パスを調整
    let imagePath = photo.image;
    if (imagePath.startsWith('./assets/')) {
      imagePath = imagePath.replace('./assets/', assetsPath + '/');
    }
    
    slide.innerHTML = `
      <img src="${imagePath}" alt="${photo.alt}" loading="lazy" />
      <div class="event-name">${photo.name}</div>
      <div class="event-text">${photo.text}</div>
    `;
    
    slider.appendChild(slide);
  });
}

// ページ読み込み時に実行
document.addEventListener('DOMContentLoaded', () => {
  // カルーセルとスライダーのどちらが存在するかチェック
  if (document.querySelector('.carousel-inner')) {
    displayActivityPhotosForCarousel();
  }
  if (document.querySelector('.slider')) {
    displayActivityPhotosForSlider();
  }
});

