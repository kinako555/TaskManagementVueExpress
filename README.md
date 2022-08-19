# Task Management Site

## 開発環境 
firebase authを利用しています   
docker,docker-composeを事前に導入しておいてください    

### 事前準備ファイル
firebase authの設定ファイルをそれぞれ配置してください

```
# Server Side
:projectDirectory/api/config/vuefirebasefb-firebase-adminsdk.json
# Client Side
:projectDirectory/app/src/firebase.ts
```

### サーバー起動
```
docker compose up -d
```

### DBに事前に必要なデータを登録する
```
docker compose exec api npx type-orm-ts-node-commonjs migration:run -d ./data-source.ts
```
