const express = require('express');
const studentController = require('../controller/studentController');
// const jwtMiddleware = require('../middleware/jwtMiddleware'); // ✅ import
const router = express.Router();

// ✅ Protect all student routes with JWT
// router.post('/student', jwtMiddleware, studentController.createStudent);
// router.get('/student', jwtMiddleware, studentController.getAllStudents);
// router.put('/student/:id', jwtMiddleware, studentController.updateStudent);
// router.delete('/student/:id', jwtMiddleware, studentController.deleteStudent);
router.post('/student', studentController.createStudent);
router.get('/student', studentController.getAllStudents);
router.put('/student/:id', studentController.updateStudent);
router.delete('/student/:id', studentController.deleteStudent);

module.exports = router;
