# README(Backend) 

### 事前準備
1. プロジェクトルートディレクトリのREADMEの事前準備を完了する

2. sdk.jsonファイルをapi/configフォルダ直下に配置する
  firebaseプロジェクトに設定したWEBアプリよりAdminSdkの秘密鍵を作成し、ファイル名を「task-management-firebase-adminsdk.json」に変更してapi/configに配置してください
```
プロジェクトルート/api/config/task-management-firebase-adminsdk.json
```

3. パッケージインストール
```bash
# プロジェクトルートディレクトリで実行してください
$ docker compose run --rm api npm install
```

4. DBコンテナで「ExpressTest」を作成する(詳細省略)


