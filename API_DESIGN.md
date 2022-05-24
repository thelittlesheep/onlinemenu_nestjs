# Customer Side API Usage

## Base URL

### Remote  ***<https://backend.lshuang.tw/>***

### Local  ***<http://localhost:3000/>***

## 顧客端

### Login & Logout

|功能|URI|HTTP Method|Request|Response|Response Status Code & Description|
|:--:|:--:|:--:|:--:|:--:|:--|
|登入|~/user/login|POST|{"user_account": String,"user_password": String}|credential cookie|401:錯誤的POST body<br>403:錯誤的帳號或密碼<br>201:成功登入
|登出|~/user/logout|POST|credential cookie|-|401:已經登出或尚未登入<br>201:成功登出|

### User Data

|功能|URI|HTTP Method|Request|Response|Response Status Code & Description|
|:--:|:--:|:--:|:--:|:--:|:--|
|新增|~/user|POST|||404 \| 201|
|修改|~/user/{user_id}|PUT\|PATCH|||404 \| 201|
|查詢|~/user/{user_id}|GET|||404 \| 200|
|刪除|無實作|\-|\-|\-|\-|

### Order Data

|功能|URI|HTTP Method|Request|Response|Response Status Code & Description|
|:--:|:--:|:--:|:--:|:--:|:--|
|新增|~/order|POST|||404 \| 201|
|修改|~/order/{order_id}?storeid={store_id}|PUT\|PATCH|||401 \| 201|
|查詢|~/user/{order_id}?storeid={store_id}|GET|||404 \| 200|
|刪除|無實作|\-|\-|\-|\-|

## 店家端

### Store Login & Logout

|功能|URI|HTTP Method|Request|Response|Response Status Code & Description|
|:--:|:--:|:--:|:--:|:--:|:--|
|登入|~/store/login|POST|||404 \| 201|
|登出|~/store/logout|POST|||404 \| 201|

### Store Data

|功能|URI|HTTP Method|Request|Response|Response Status Code & Description|
|:--:|:--:|:--:|:--:|:--:|:--|
|新增|~/store|POST|||404 \| 201|
|修改|~/store/{store_id}|PUT\|PATCH|||404 \| 201|
|查詢|~/store/{store_id}|GET|||404 \| 201|
|刪除|無實作|\-|\-|\-|\-|

### Employee account management

|功能|URI|HTTP Method|Request|Response|Response Status Code & Description|
|:--:|:--:|:--:|:--:|:--:|:--|
|新增|~/store/employee|POST|||404 \| 201|
|修改|~/store/employee/{employee_id}|PUT\|PATCH|||404 \| 201|
|查詢|~/store/employee/{employee_id}|GET|||404 \| 201|
|刪除|~/store/employee/{employee_id}|\-|\-|\-|\-|
