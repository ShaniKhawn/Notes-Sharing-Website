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
app.use('/upload', require('./routes/upload'))
app.use('/viewallnotes', require('./routes/viewallnotes'))
app.use('/pendingnotes', require('./routes/pendingnotes'))
app.use('/status', require('./routes/status'))
app.use('/acceptNotes', require('./routes/acceptNotes'));
app.use('/rejectNotes', require('./routes/rejectNotes'));
app.use('/allNotes', require('./routes/allNotes'));
app.use('/myNotes', require('./routes/myNotes'));
app.use('/viewUsers', require('./routes/viewUsers'));
app.use('/contact', require('./routes/contact'));
app.use('/viewQueries', require('./routes/viewQueries'));
app.use('/contactQuerie', require('./routes/contactQuerie'));
app.use('/profile', require('./routes/profile'));

app.listen(5000, () => {
    console.log(`App running on port 5000`)
});
