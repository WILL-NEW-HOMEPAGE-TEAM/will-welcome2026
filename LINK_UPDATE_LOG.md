# 内部リンク更新ログ

## 更新日時
2025年7月16日

## 更新内容

### 1. CSSファイルのパス更新

#### 更新前
```html
<link rel="stylesheet" href="./page_name.css" />
```

#### 更新後
```html
<link rel="stylesheet" href="../../assets/css/common.css" />
<link rel="stylesheet" href="../../assets/css/components.css" />
<link rel="stylesheet" href="../../assets/css/pages/page_name.css" />
```

#### 対象ファイル
- `index.html` → `./assets/css/` パスに変更
- `pages/about/index.html`
- `pages/activities/index.html`
- `pages/events/event-1st.html`
- `pages/events/event-2nd.html`
- `pages/events/event-3rd.html`
- `pages/seminars/index.html`
- `pages/faq/index.html`
- `pages/join/index.html`
- `top_page.html`

### 2. JavaScriptファイルのパス更新

#### 更新前
```html
<script src="./main.js"></script>
```

#### 更新後
```html
<script src="../../assets/js/main.js"></script>
```

#### 対象ファイル
- `index.html` → `./assets/js/` パスに変更
- 全ページファイル

### 3. 画像ファイルのパス更新

#### 更新前
```html
<img src="./images/image_name.webp" alt="" />
```

#### 更新後
```html
<img src="../../images/image_name.webp" alt="" />
```

#### 対象ファイル
- 全ページファイル（`index.html`と`top_page.html`は変更なし）

### 4. ページ間リンクの更新

#### 更新前
```html
<a href="./activity_page.html">活動紹介</a>
<a href="./seminar_page.html">ゼミ詳細</a>
<a href="./join_page.html">入会案内</a>
```

#### 更新後
```html
<a href="./pages/activities/">活動紹介</a>
<a href="./pages/seminars/">ゼミ詳細</a>
<a href="./pages/join/">入会案内</a>
```

#### 対象ファイル
- `index.html`

### 5. イベントページ間のナビゲーション更新

#### 更新前
```html
<a href="./event-1st-page.html">1</a>
<a href="./event-2nd-page.html">2</a>
<a href="./event-3rd-page.html">3</a>
```

#### 更新後
```html
<a href="./event-1st.html">1</a>
<a href="./event-2nd.html">2</a>
<a href="./event-3rd.html">3</a>
```

#### 対象ファイル
- `pages/events/event-1st.html`
- `pages/events/event-2nd.html`
- `pages/events/event-3rd.html`

### 6. 活動ページからのイベントリンク更新

#### 更新前
```html
<a href="./event-1st-page.html">もっと見る</a>
```

#### 更新後
```html
<a href="../events/event-1st.html">もっと見る</a>
```

#### 対象ファイル
- `pages/activities/index.html`

## 更新結果

### ✅ 完了した更新
1. 全HTMLファイルのCSSパス更新
2. 全HTMLファイルのJavaScriptパス更新
3. 全ページファイルの画像パス更新
4. ページ間リンクの更新
5. イベントページ間のナビゲーション更新

### 📋 確認が必要な項目
1. ヘッダー・フッターの共通化（現在は`#header-container`と`#footer-container`でプレースホルダー）
2. 実際のブラウザでの動作確認
3. レスポンシブデザインの動作確認
4. 画像の表示確認

## 注意事項

1. **相対パスの違い**
   - ルートファイル（`index.html`, `top_page.html`）: `./assets/`
   - ページファイル: `../../assets/`

2. **画像パスの統一**
   - 現在は`images/`ディレクトリをそのまま使用
   - 将来的には`assets/images/`に移動することを推奨

3. **共通コンポーネント**
   - ヘッダー・フッターは現在プレースホルダー状態
   - JavaScriptで動的に読み込む予定

## 次のステップ

1. **動作確認**: ブラウザで各ページの表示を確認
2. **画像整理**: `images/`ディレクトリを`assets/images/`に移動
3. **共通コンポーネント実装**: ヘッダー・フッターの共通化
4. **パフォーマンス最適化**: CSS・JSファイルの最適化 