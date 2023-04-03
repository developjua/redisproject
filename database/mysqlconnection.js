const mysql = require('mysql2')
//const util = require('util')


const connection  = mysql.createPool({
    user: process.env.USER,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    host: process.env.HOST
})

connection.getConnection(function(err){
    if(err){
     console.log(err.message)
  }
  console.log('connected to database')
})

/* 
function mysqlconnection(){
    return new Promise((resolve,reject)=>{


            resolve(connection)

        })
    
    
}
 */
const promisePool = connection.promise();
module.exports = promisePool

