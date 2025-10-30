require('dotenv').config();
const express = require('express');
const cors = require('cors');
require('./connection/dbConnection'); 





const studentRoutes = require('./routes/studentRoute');

const employeeRoutes = require('./routes/employeeRoutes');
const taskRoutes = require("./routes/taskRoutes");
const expenseRoutes = require('./routes/expenseRoutes');
const productRoutes = require('./routes/productRoutes');
const userRoutes=require('./routes/userRoutes')

const server = express();

server.use(cors());
server.use(express.json());


server.use('/api', studentRoutes);
server.use('/api',employeeRoutes)
server.use('/api',taskRoutes)
server.use('/api',expenseRoutes)
server.use('/api',productRoutes)
server.use('/api',userRoutes)


const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running at: ${PORT}`);
});


