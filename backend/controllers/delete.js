import { connection } from "../backend.js";

export function del(req, res) {
    const task = req.body.task;

    const sql = "DELETE FROM tasks WHERE task = ?";

    connection.query(sql, [task], function(err, results) {
        if (err) {
            console.log(err);
            return res.json(err);
        }
        res.json(results);
    });
}