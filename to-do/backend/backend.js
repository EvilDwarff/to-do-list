import mysql from "mysql2";
  
export const connection = mysql.createConnection({
  host: "172.17.1.8",
  user: "root",
  database: "to-do_sva",
  password: "1234"
});

connection.connect(function(err){
    if (err) {
      return console.error("Ошибка: " + err.message);
    }
    else{
      console.log("Подключение к серверу MySQL успешно установлено");
    }
 });


// export function select(req, res){
//  connection.query("SELECT * FROM tasks",
//   function(err, results) {
//     if (err) {
//     console.log(err);
//     return res.json(err)
//     }
//     else return res.json(results)
// });
//  }
// const sql = `INSERT INTO taska(task, complited) VALUES('Задача', 'no')`;
 
// connection.query(sql, function(err, results) {
//     if(err) console.log(err);
//     console.log(results);
// });


// const express = require("express");
 
// const app = express();
// app.get("/", function(request, response){
     
//     response.send("<h1>Главная страница</h1>");
// });
// app.get("/about", function(request, response){
     
//     response.send("<h1>О сайте</h1>");
// });
// app.get("/contact", function(request, response){
     
//     response.send("<h1>Контакты</h1>");
// });
// app.listen(3000);


