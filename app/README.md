# README(Client)

## 事前準備
1. プロジェクトルートディレクトリのREADMEの事前準備を完了する 
2. .envファイルをappフォルダ直下に作成する
  firebaseプロジェクトに設定したWEBアプリよりSDK設定の値を記載する
```env
VUE_APP_API_KEY=hoge
VUE_APP_AUTH_DOMAIN=hoge
VUE_APP_PROJECT_ID=hoge
VUE_APP_STORAGE_BUCKET=hoge
VUE_APP_MESSAGING_SEND_ID=hoge
VUE_APP_APP_ID=hoge
```

3. パッケージインストール
```bash
# プロジェクトルートディレクトリで実行してください
$ docker compose run --rm app npm install
```