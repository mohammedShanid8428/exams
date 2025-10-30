const express = require('express');
const expenseController = require('../controller/expenseController');
const router = express.Router();

router.post('/expense', expenseController.createExpense);
router.get('/expense', expenseController.getAllExpenses);
router.put('/expense/:id', expenseController.updateExpense);
router.delete('/expense/:id', expenseController.deleteExpense);
router.get('/expense/total', expenseController.getTotalExpenses);

module.exports = router;



