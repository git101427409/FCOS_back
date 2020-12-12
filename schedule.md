# 進度表

+ 10/27 重整資料庫模型、新增菜單分類(menuCategory)
+ 10/28 更新全部model
    + menu.js 更名為 meal.js
+ 10/29 更新三個controller: customer menuCategory meal
+ 10/30 更新三個controller:
    1. orderReceiptController
    2. receiptDetailController
    3. restaurantController
+ 10/31
    1. 建立路由: menuCategory
    2. 建立objectHandler.js: 用來過濾Objectll中的null及undefined
    3. 完成測試API: customer
+ 11/2 完成測試API: restaurant
+ 11/3
    1. 完成測試API: menuCategory
    2. 完成測試API: meal
    3. 完成測試API: orderReceipt
    4. 完成測試API: receiptDetail
+ 11/13 
    + 建立docController.js 做為統整過後的專用接口
    + 新增路由"api/doc/restaurant"
+ 11/21
    + 新增路由"api/doc/menu/:restaurant_id"
+ 11/22
+ 11/23
    + 新增路由"meal_findByMenuCategoryId"

## 待辦
+ **api檢查測試**
+ 建立 資料操作的前端頁面