import { connection } from "../backend.js";

export function update(req, res) {
    const task = req.body.task;  
    const completed = req.body.completed; 
  
    const sql = "UPDATE tasks SET completed = ? WHERE task = ?";

    connection.query(sql, [complited, task], function(err, results) {
        if (err) {
            console.log(err);
            return res.json(err);
        } else {
            res.json(results);
        }
    });
}