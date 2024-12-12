import express from 'express';
import { select } from './controllers/select.js';
import { insert } from './controllers/insert.js';
import { del } from './controllers/delete.js'
import { update } from './controllers/update.js';
import bodyParser from 'body-parser';
import cors from 'cors';


const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.get('/', select);
app.post('/insert', insert);
app.post('/delete', del);
app.patch('/update', update);



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})