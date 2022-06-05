# Customer Side API Usage

## Base URL

### Remote  ***<https://backend.lshuang.tw/>***

### Local  ***<http://localhost:3000/>***

``` text
測試一般帳號 : meimei123
測試一般密碼 : m987654321

測試管理員帳號 : adminyang
測試管理員密碼 : adminyang
```

## 通用

### Login & Logout

|功能|URI|HTTP Method|Request|Response Data|Response Status Code & Description|
|:--:|:--:|:--:|:--:|:--:|:--|
|登入|~/users/login|POST|userLoginDTO|credential cookie|401:錯誤的POST body<br>403:錯誤的帳號或密碼<br>201:成功登入
|登出|~/users/logout|POST|credential cookie|-|401:已經登出或尚未登入<br>201:成功登出|

## 顧客端

### User Data

|功能|URI|HTTP Method|Request|Response Data|
|:--:|:--:|:--:|:--:|:--:|
|新增|~/users|POST|userDTO|CreateResponse|
|修改|~/users/:user_id|PUT|userInfoDTO|UpdateResponse|
|查詢|~/users/:user_id|GET|\-|userInfoDTO|
|刪除|無實作|\-|\-|\-|

### User Order Data

|功能|URI|HTTP Method|Request|Response Data|
|:--:|:--:|:--:|:--:|:--:|
|新增|~/users/:user_id/orders|POST|createorderDTO|CreateResponse|
|修改|無實作|\-|\-|\-|
|查詢|~/users/:user_id/orders/:order_id|GET|\-|Array of getorderDTO|
|刪除|~/users/:user_id/orders/:order_id|DELETE|\-|DeleteRespones|

### User API Endpoint Schema

``` JSON
CreateResponse,
UpdateResponse,
DeleteRespones
{
  "statusCode": Number,
  "message": String
}
```

``` JSON
userLoginDTO
Content-type:application/json
{
  "user_account": String，開頭必需為英文字母，且需為6-9字元。,
  "user_password": String，必須為6-24個字元。
}
```

``` JSON
userDTO
Content-type:application/json
{
  "user_name": String,
  "user_email": String，需為正確之E-mail格式,
  "user_phone": String，但需為純數字字串,
  "user_age": Number,
  "user_account": String，開頭必需為英文字母，且需為6-9字元。,
  "user_password": String，必須為6-24個字元。
}
```

``` JSON
userInfoDTO
Content-type:application/json
{
  "user_name": String,
  "user_email": String，需為正確之E-mail格式,
  "user_phone": String，但需為純數字字串,
  "user_age": Number,
}
```

``` JSON
createorderDTO
Content-type:application/json
{
  "user_id": Number,
  "order_quantity": Number,
  "order_orderdate": String,
  "order_pickupdate": String,
  "order_products": {order_products_schema}
}
```

``` JSON
createorder_products_schema
{
  "order_product_id": Number,
  "order_product_quantity": Number,
  "order_product_adjustitem": {order_product_adjustitem_schema}
}
```

``` JSON
createorder_product_adjustitem_schema
{
"adjustitem_id": Number,
"adjustitem_name": Number,
"adjustitem_priceadjust": Number,
"adjusttype_id": Number
}
```

``` JSON
getorderDTO
{
  "order_product_id": Number,
  "order_product_quantity": Number,
  "product_name": String,
  "product_price": Number,
  "order_product_adjustitem":{order_product_adjustitem_schema}
}
```

## 店家端

### Product Data

|功能|URI|HTTP Method|Request|Response Data|
|:--:|:--:|:--:|:--:|:--:|
|新增|~/menu/products|POST|createproductDTO|CreateResponse|
|修改|~/menu/products/{product_id}|PUT|updateproductDTO|UpdateResponse|
|查詢|~/menu/products/{product_id}|GET|\-|getproductDTO|
|刪除|~/menu/products/{product_id}|DELETE|\-|DeleteRespones|

### Store Data (尚未實作)

|功能|URI|HTTP Method|Request|Response Data|
|:--:|:--:|:--:|:--:|:--:|
|新增|~/store|POST|\-|\-|
|修改|~/store/{store_id}|PUT\|PATCH|\-|\-|
|查詢|~/store/{store_id}|GET|\-|\-|
|刪除|~/store/{store_id}|DELETE|\-|\-|

### Employee account management (尚未實作)

|功能|URI|HTTP Method|Request|Response Data|
|:--:|:--:|:--:|:--:|:--:|
|新增|~/store/employee|POST|\-|\-|
|修改|~/store/employee/{employee_id}|PUT\|PATCH|\-|\-|
|查詢|~/store/employee/{employee_id}|GET|\-|\-|
|刪除|~/store/employee/{employee_id}|DELETE|\-|\-|

### Store API Endpoint Schema

``` JSON
CreateResponse,
UpdateResponse,
DeleteRespones
{
  "statusCode": Number,
  "message": String
}
```

``` JSON
createproductDTO
{
  "product_name": String,
  "product_price": Number,
  "product_image": String,
  "categoryid": {
   "category_id": Number,
   "category_name": String 
  }
}
```

``` JSON
updateproductDTO
{
  "product_name": String,
  "product_price": Number,
  "product_image": String,
  "categoryid": {
   "category_id": Number,
   "category_name": String 
  }
}
```

``` JSON
getproductDTO
{
  "product_id": Number,
  "product_name": String,
  "product_price": Number,
  "product_image": String,
  "categoryid": {
   "category_id": Number,
   "category_name": String 
  }
}
```
