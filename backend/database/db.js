const mysql = require("mysql");

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

try{
connection.connect((err) => {
  if (err) console.log(err);
  else console.log("MySQL is connected...");
});
}catch(e){
  console.log(e)
}

module.exports = connection;
