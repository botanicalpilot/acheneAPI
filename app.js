import express from 'express';
import db from './db/db';
import bodyParser from 'body-parser';
import router from './routes/index';


const app = express();

// parse incoming data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const PORT = 5000; 

// create a web server with app.listen
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
});




app.use(bodyParser.urlencoded({ extended: false }));
app.use(router);






