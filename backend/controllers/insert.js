import { connection } from "../backend.js";




export function insert(req, res){
const task = req.body.task;

console.log(task);

const sql = `INSERT INTO tasks(task) VALUES(?)`;
 
connection.query(sql, [task], function(err, results) {
    if(err) {
        console.log(err);
        return res.json(err);
    }
    else res.json(results)
});
}