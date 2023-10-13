const express = require('express');
const cors = require("cors");
require('./models/db');

const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());

// Existing routes
app.use('/signup', require('./routes/signup'))
app.use('/login', require('./routes/login'))
app.use('/upload', require('./routes/userRoutes/upload'))
app.use('/viewallnotes', require('./routes/userRoutes/viewallnotes'))
app.use('/pendingnotes', require('./routes/adminRoutes/pendingnotes'))
app.use('/status', require('./routes/adminRoutes/status'))
app.use('/acceptNotes', require('./routes/adminRoutes/acceptNotes'));
app.use('/rejectNotes', require('./routes/adminRoutes/rejectNotes'));
app.use('/allNotes', require('./routes/adminRoutes/allNotes'));
app.use('/myNotes', require('./routes/userRoutes/myNotes'));
app.use('/viewUsers', require('./routes/adminRoutes/viewUsers'));
app.use('/contact', require('./routes/contact'));
app.use('/viewQueries', require('./routes/adminRoutes/viewQueries'));
app.use('/contactQuerie', require('./routes/adminRoutes/contactQuerie'));

app.listen(5000, () => {
    console.log(`App running on port 5000`)
});
