const express = require('express');
const bodyParser = require('body-parser');
const login = express();
const mysql = require('mysql2');
const { response } = require('express');
login.use(bodyParser.json());


//parse application/json
login.use(bodyParser.json());

//Database Connection 
const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',                         /* MySQL User */
  password: 'rootpassword',              /* Password */
  database: 'userinformation'           /*  Database */
});

//Shows Mysql Connect to the database
con.connect((err) => {
  if (!err)
    console.log('NODE Connected to the database successfully');
  else
    console.log('Connection Failed \n Error:' + JSON.stringify(err, undefined, 2));
})

//Get All data from table 
login.get('/api/get', (req, res) => 
{
  con.query('SELECT * FROM user', (err, rows, fields) => 
  {
    if (!err)

      res.send(rows);
    else
      res.send(err);
  });
});

//Get Single record from table by using GET() method

login.get('/api/:id', (req, res) =>
 {
  con.query('SELECT * FROM usertype_master WHERE id = ?', [req.params.id], (err, rows, fields) => 
  {
    if (!err)
      // res.send(rows);
      console.log(rows);
    else
      console.log(err);
  })
});

//Create or Insert new record into table by using POST() method
login.post('/add', (req, res) => {

  res.json(req.body);

  const applicantname = req.body.applicantname;
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const mobile = req.body.mobile;
  const usertype = req.body.usertype;

  let sql = "INSERT INTO user (applicantname,username,email,password,mobile,usertype) VALUES ('" + applicantname + "','" + username + "','" + email + "','" + password + "','" + mobile + "','" + usertype + "')";

  con.query(sql, function (err, rows, fields) {
    if (err) throw err;
    console.log("1 record inserted");
  });

});

//Delete single or multiple record from table
login.delete('/del/:email', (req, res) => {
  res.json(req.body);

  const applicantname = req.body.applicantname;
  const username = req.body.username;
  const email = req.body.email;
  const Password = req.body.Password;
  const mobile = req.body.mobile;
  const usertype = req.body.usertype;

  let query = "DELETE FROM user WHERE applicantname = 'NULL' ";

  con.query(query, function (err, rows, fields) {
    if (err) throw err;
    console.log("1 record deleted");
  });

});

//set login port
login.listen(2000, () => console.log('Express server is running at port no:2000'));









//  });
// Update single record from table

//  let query1="UPDATE userinfo SET usertype='Admin' WHERE UserName='Supriya Sawant' ";
//  con.query(query1, (err, rows) =>
//  {
//        if(err) throw err;

//       console.log('Number of rows updated = ' + rows.affectedRows);
// });

// Change or Alter column name from table
//   let query2="alter table userinfo change Name ApplicantName varchar(25)";

//   con.query(query2, (err, rows) =>
//   {
//         if(err) throw err;

//        console.log('Number of rows affected = ' + rows.affectedRows);
//  });