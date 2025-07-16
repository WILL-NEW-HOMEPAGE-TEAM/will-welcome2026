# WILL サークルホームページ

## プロジェクト概要
大学生のプログラミング・ITサークル「WILL」の公式ホームページです。

## ディレクトリ構造（改善後）

```
WILL-NEW-HOMEPAGE/
├── index.html                 # トップページ
├── pages/                     # 各ページのHTMLファイル
│   ├── about/
│   │   └── index.html
│   ├── activities/
│   │   └── index.html
│   ├── events/
│   │   ├── index.html
│   │   ├── event-1st.html
│   │   ├── event-2nd.html
│   │   └── event-3rd.html
│   ├── seminars/
│   │   └── index.html
│   ├── faq/
│   │   └── index.html
│   └── join/
│       └── index.html
├── assets/                    # 静的ファイル
│   ├── css/                   # スタイルシート
│   │   ├── common.css         # 共通スタイル
│   │   ├── components.css     # コンポーネントスタイル
│   │   └── pages/             # ページ別スタイル
│   │       ├── about.css
│   │       ├── activities.css
│   │       ├── events.css
│   │       ├── seminars.css
│   │       ├── faq.css
│   │       ├── join.css
│   │       └── top.css
│   ├── js/                    # JavaScriptファイル
│   │   ├── main.js
│   │   └── components.js
│   └── images/                # 画像ファイル
│       ├── common/            # 共通画像（ロゴ、アイコン等）
│       ├── pages/             # ページ別画像
│       │   ├── about/
│       │   ├── activities/
│       │   ├── events/
│       │   ├── seminars/
│       │   ├── faq/
│       │   ├── join/
│       │   └── top/
│       └── original/          # オリジナル画像（バックアップ）
├── docs/                      # ドキュメント
│   ├── design/                # デザイン関連
│   └── development/           # 開発関連
└── README.md
```

## 改善のメリット

1. **保守性の向上**
   - ファイルが用途別に整理される
   - 新規メンバーが理解しやすい構造

2. **拡張性の向上**
   - 新しいページやコンポーネントの追加が容易
   - 段階的な機能追加に対応

3. **開発効率の向上**
   - ファイルの検索・特定が容易
   - チーム開発での競合を減少

## 移行計画

1. **第一段階**: ディレクトリ構造の作成
2. **第二段階**: ファイルの移動とリネーム
3. **第三段階**: リンクの更新
4. **第四段階**: 動作確認

## 技術スタック
- HTML5
- CSS3
- JavaScript (ES6+)
- GitHub Pages (公開プラットフォーム)

## 開発方針
- レスポンシブデザイン対応
- アクセシビリティを考慮した実装
- 保守性を重視したコーディング
- 段階的な機能追加 