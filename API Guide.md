# API Guide
__Fried Checken Ordering System 共有6個資料模型__
1. 顧客 customer
2. 顧客點餐收據 orderReceipt
3. 收據明細 receiptDetail
4. 餐廳 restaurant
5. 餐點 meal
6. 菜單分類 menuCategory


## customer
### get
+ get
+ get by id: id用params傳入
### delete
+ delete by id: id用params傳入


## menuCategory
__get:略__
__delete:略__
### post
+ **暫不提供insertMany**
+ create: 從body傳入restaurant_id, categoryName
### patch
+ 只能用來更新categoryName.從body傳入, id從params傳入
+ **restaurant_id 不提供更新**


## meal
### post
+ create: 從body傳入menuCategory_id, mealName, mealPrice
### patch
+ 只能用來更新mealName, mealPrice從body傳入, id從params傳入
+ **menuCategory_id 不提供更新**


## orderReceipt
### post
+ create: 從body傳入customer_id, date
### patch
+ update: 從params傳入id, 從body傳入totalPrice


## receiptDetail
### post
+ create: 從body傳入orderReceipt_id, meal_id, mealAmount
### patch
+ update: 從params傳入id, 從body傳入mealAmount


## restaurant
### post
+ create: 從body傳入name, address, phone
+ createMany: 接收JSON格式內容為陣列, 陣列內容為物件{ name, address, phone }
### patch
+ update: 從params傳入id,從body傳入name, address, phone