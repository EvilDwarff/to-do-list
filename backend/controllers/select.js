import { connection } from "../backend.js";


export function select(req, res){
    connection.query("SELECT * FROM tasks",
     function(err, results) {
       if (err) {
       console.log(err);
       return res.json(err);
       }
       else return res.json(results)
   });
    }