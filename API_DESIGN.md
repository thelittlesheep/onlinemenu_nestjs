# Customer Side API Usage

## Base URL

### Remote  ***<https://backend.lshuang.tw/>***

### Local  ***<http://localhost:3000/>***

## 顧客端

### Login | Logout

|功能|URI|HTTP Method|Request|Response|Status Code|
|:-:|:-:|:---------:|:-----:|:------:|:---------:|
|登入|~/user/login|POST|||404 \| 201|
|登出|~/user/logout|POST|||404 \| 201|

### User Data

|功能|URI|HTTP Method|Request|Response|Status Code|
|:-:|:-:|:---------:|:-----:|:------:|:---------:|
|新增|~/user|POST|||404 \| 201|
|修改|~/user/{user_id}|UPDATE|||404 \| 201|
|查詢|~/user/{user_id}|GET|||404 \| 200|
|刪除|無實作|\-|\-|\-|\-|

### Order Data

|功能|URI|HTTP Method|Request|Response|Status Code|
|:-:|:-:|:---------:|:-----:|:------:|:---------:|
|新增|~/order|POST|||404 \| 201|
|修改|~/order/{order_id}?storeid={store_id}|UPDATE|||404 \| 201|
|查詢|~/user/{order_id}?storeid={store_id}|GET|||404 \| 200|
|刪除|無實作|\-|\-|\-|\-|

## 店家端

### Login | Logout

|功能|URI|HTTP Method|Request|Response|Status Code|
|:-:|:-:|:---------:|:-----:|:------:|:---------:|
|登入|~/user/login|POST|||404 \| 201|
|登出|~/user/logout|POST|||404 \| 201|

### User Data

|功能|URI|HTTP Method|Request|Response|Status Code|
|:-:|:-:|:---------:|:-----:|:------:|:---------:|
|新增|~/user|POST|||404 \| 201|
|修改|~/user/{user_id}|UPDATE|||404 \| 201|
|查詢|~/user/{user_id}|GET|||404 \| 201|
|刪除|無實作|\-|\-|\-|\-|