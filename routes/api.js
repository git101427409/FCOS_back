const express = require('express')
const router = express.Router()
const restaurantController = require('../controllers/restaurantController.js')
const customerController = require('../controllers/customerController.js')
const menuCategoryController = require('../controllers/menuCategoryController')
const mealController = require('../controllers/mealController.js')
const orderReceiptController = require('../controllers/orderReceiptController')
const receiptDetailController = require('../controllers/receiptDetailController')
const docController = require('../controllers/docController')

router.get('/', (req, res) => {
    res.send('api index.')
})

router.get('/restaurants', restaurantController.restaurant_list)
router.get('/restaurant/:id', restaurantController.restaurant_detail)
router.post('/restaurant/create', restaurantController.restaurant_create)
router.post('/restaurant/createMany', restaurantController.restaurant_createMany)
router.delete('/restaurant/delete/:id', restaurantController.restaurant_delete)
router.patch('/restaurant/update/:id', restaurantController.restaurant_update)

router.get('/customers', customerController.customer_list)
router.get('/customer/:id', customerController.customer_detail)
router.post('/customer/create', customerController.customer_create)
router.delete('/customer/delete/:id', customerController.customer_detele)
router.patch('/customer/update/:id', customerController.customer_update)

router.get('/menuCategorys', menuCategoryController.menuCategory_list)
router.get('/menuCategory/:id', menuCategoryController.menuCategory_detail)
router.post('/menuCategory/create', menuCategoryController.menuCategory_create)
router.delete('/menuCategory/delete/:id', menuCategoryController.menuCategory_delete)
router.patch('/menuCategory/update/:id', menuCategoryController.menuCategory_update)
router.get('/menuCategoryFindByRestaurantId/:restaurant_id', menuCategoryController.menuCategory_findByRestaurantId)

router.get('/meals', mealController.meal_list)
router.get('/meal/:id', mealController.meal_detail)
router.post('/meal/create', mealController.meal_create)
router.delete('/meal/delete/:id', mealController.meal_delete)
router.patch('/meal/update/:id', mealController.meal_update)
router.get('/mealFindByMenuCategoryId/:menuCategory_id', mealController.meal_findByMenuCategoryId)

router.get('/orderReceipts', orderReceiptController.orderReceipt_list)
router.get('/orderReceipt/:id', orderReceiptController.orderReceipt_detail)
router.post('/orderReceipt/create', orderReceiptController.orderReceipt_create)
router.delete('/orderReceipt/delete/:id', orderReceiptController.orderReceipt_delete)
router.patch('/orderReceipt/update/:id', orderReceiptController.orderReceipt_update)

router.get('/receiptDetails', receiptDetailController.receiptDetail_list)
router.get('/receiptDetail/:id', receiptDetailController.receiptDetail_detail)
router.post('/receiptDetail/create', receiptDetailController.receiptDetail_create)
router.delete('/receiptDetail/delete/:id', receiptDetailController.receiptDetail_delete)
router.patch('/receiptDetail/update/:id', receiptDetailController.receiptDetail_update)

router.get('/doc/restaurant', docController.restaurant)
router.get('/doc/menu/:restaurant_id', docController.menu)

module.exports = router