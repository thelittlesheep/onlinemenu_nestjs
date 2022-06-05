# OnlineMenu Backend

主要使用 Nestjs(基於Express) + TypeScript 作為開發，搭配 MariaDB 所建立之後端專案。

系統內API可分為兩大類

1. 使用者
    - 新增使用者
    - 查詢使用者
    - 修改使用者資料
    - 新增使用者訂單
    - 查詢使用者訂單
    - 刪除使用者訂單
2. 商品 (使用CASL授權使用者)
   - 新增商品
   - 查詢商品資訊
   - 修改商品資訊
   - 刪除商品資訊

使用者系統中包含 Authentication 及 Session 儲存使用者登入資訊。
商品系統使用 CASL 進行使用者授權分類，達到權限分級功能。

## 資料庫ERD

[![資料庫](https://i.imgur.com/kMrlPBX.png "資料庫")](https://i.imgur.com/kMrlPBX.png)

## 使用

請參考  
[API_DESIGN.md](https://github.com/thelittlesheep/onlinemenu_nestjs/blob/master/API_DESIGN.md)  
[OnlineMenu openAPI](https://backend.lshuang.tw/api)

## License

Nest is [MIT licensed](LICENSE).
