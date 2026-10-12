# イベントタイムテーブル作成

TicketDiveのイベントURL、またはTicketDiveへのリンクを含むX投稿URLから情報と画像を読み込みます。別のX投稿をフライヤー画像の取得元に指定することもできます。出演者・時間を確認してExcel形式のタイムテーブルを作成します。

## 公開サイト

GitHub Pages: https://m0ch4771.github.io/ticket-timetable-builder/

## 使い方

1. TicketDive・t-dv.com・X投稿のURLを入力します。別のフライヤー投稿がある場合は読み込み前に指定します。
2. 「イベントを読み込む」で基本情報と候補画像を取得します。
3. 時間が載った画像を最大3枚選び、「選んだ画像を読み取る」を押します。画像は拡大して確認できます。
4. 出演者と時刻を確認します。開始・終了がそろうと出演時間を自動計算し、行から離れると時刻順に並び替えます。
5. 要確認の行を元画像と照合します。チェックボタンはOCR結果の確認に使用します。未入力や時間の重なりは別途表示されます。
6. 整理番号欄は必要に応じて表示・入力し、ExcelまたはGoogleスプレッドシートに出力します。

## 編集と保存

- スマホはカード形式、PCは表形式で編集できます。
- 下書きは同じ端末・ブラウザーに自動保存します。別端末への同期はありません。
- 「元に戻す」「やり直す」で最大30操作を戻せます。操作履歴はページを閉じると消えます。
- 整理番号欄の入力は再描画・下書き・Excel・Googleスプレッドシートに保持されます。
- 画像読み取りはボタンを押したときだけ行います。再読み取り前には置き換えを確認します。
- サンプルと手入力はOCR APIを呼び出しません。
- 設定から保存した下書きを削除できます。

## 構成

画面はGitHub Pagesで公開します。TicketDiveページ、公開X投稿、フライヤー画像の取得にはWorker APIを利用します。X投稿の読み込みにはXの公開投稿用シンジケーションAPIを使用します。


## 高精度OCRのAPI設定

GitHub Pagesは画面を配信し、Cloudflare WorkerがTicketDiveの取得とOCR API呼び出しを担当します。OCRはCloud Vision（最大3枚）とGemini 3.6 Flash（最大3枚をまとめて1リクエスト）を組み合わせます。Cloud Visionが未設定・エラー時はGemini単独で動作します。確信度が低い行や出演者名候補と一致しない行は黄色で表示し、手動確認してください。

### 無料枠

- Gemini APIは無料枠があります。リクエスト数の上限はプロジェクトやモデルごとに変わり、Google AI Studioの「Rate limits」で確認できます。上限超過時は読み取りを止めます。課金アカウントを紐づけなければ、無料枠超過分を有料利用に切り替えません。
- Cloud Visionはプロジェクトで課金を有効にする必要がありますが、月1,000画像リクエストまでは無料です。イベント1件の読み取りで最大3画像をOCR補助に使います。月1,000画像を超えると1,000画像あたり $1.50 になるため、請求を避けたい場合はGOOGLE_VISION_API_KEYを設定せず、Geminiだけで利用してください。
- Geminiの無料利用では入力データがGoogleのサービス改善に使われることがあります。公開イベント画像の読み取りに限定してください。

### Cloudflare Workerのデプロイ

1. MacにNode.jsを入れ、リポジトリをダウンロードしてそのフォルダーをターミナルで開きます。
2. Cloudflareアカウントで npx wrangler login を実行し、ブラウザーでログインします。
3. リポジトリのルートで npx wrangler deploy を実行します。初回はWorkerを作成します。
4. Google AI Studioで、課金を有効にしていないプロジェクトのGemini APIキーを作成します。2026年10月時点では新しいキーは認証キーが標準です。キーを画面やGitHubへ貼らず、npx wrangler secret put GEMINI_API_KEY を実行して表示される入力欄に貼り付けます。
5. Cloud Visionも使う場合はGoogle CloudでVision APIを有効にし、Vision APIキーを作って npx wrangler secret put GOOGLE_VISION_API_KEY で設定します。課金が必要なため、完全無料で使う場合はこのキーを設定しません。
6. npx wrangler secret put のあと秘密情報がWorkerへ反映されます。
7. 発行されたWorker URLを画面右上の設定 →「Google連携・APIの詳細」→「Worker API URL」へ入力して保存します。

APIキーはGitHubへコミットしないでください。wrangler.toml はWorker名とエントリーポイントのみを設定し、秘密情報はCloudflareに保存します。
