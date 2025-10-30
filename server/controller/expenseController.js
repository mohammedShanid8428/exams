const Expense = require('../model/expenseModel');

exports.createExpense = async (req, res) => {
  try {
    const newExpense = new Expense(req.body);
    await newExpense.save();
    res.status(201).json({ message: "Expense added successfully", newExpense });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to add expense", error: err.message });
  }
};


exports.getAllExpenses = async (req, res) => {
  try {
    const { category, from, to } = req.query;
    const filter = {};

    if (category) filter.category = category;
    if (from && to) filter.date = { $gte: new Date(from), $lte: new Date(to) };

    const expenses = await Expense.find(filter).sort({ date: -1 });
    res.status(200).json({ message: "Expenses fetched successfully", expenses });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch expenses", error: err.message });
  }
};




exports.updateExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Expense.findByIdAndUpdate(id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Expense not found" });
    res.status(200).json({ message: "Expense updated successfully", updated });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating expense", error: err.message });
  }
};


exports.deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Expense.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "Expense not found" });
    res.status(200).json({ message: "Expense deleted successfully", deleted });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting expense", error: err.message });
  }
};

// 💰 Total Expenses
exports.getTotalExpenses = async (req, res) => {
  try {
    const result = await Expense.aggregate([
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);
    res.status(200).json({ total: result[0]?.total || 0 });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error calculating total", error: err.message });
  }
};


