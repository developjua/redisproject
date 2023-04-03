const connection = require('../database/mysqlconnection')

module.exports.handler = async (event)=>{

    const formData = {};

    event.body.split('--').forEach((part) => {
      const match = /name="(.*)"\r\n\r\n(.*)\r\n/.exec(part);
      if (match && match.length === 3) {
        formData[match[1]] = match[2];
      }
    });
    const {title,content,author} = formData
    if (!title && !content && !author ) {
        return {
          statusCode: 400,
          body:JSON.stringify({ message: 'title, description, category fields are required'})
        }
      } else if (!title) {
        return {
          statusCode: 400,
          body:JSON.stringify({ message: "Title is required" })
        }
      } else if (!content) {
        return {
          statusCode: 400,
          body:JSON.stringify({ message: "content is required"})
        }
      } else if (!author) {
        return {
          statusCode: 400,
          body:JSON.stringify({  message: "author is required"})
        }
      }
    try{
        const sql = 'INSERT INTO blogs (title,content,author) VALUES(?,?,?)';

        connection.query(sql,[title,content,author])
            return {
                statusCode: 200,
                body:JSON.stringify({  message: "successfully inserted"})
              }
        }
    catch(err){
        return {
            statusCode: 400,
            body:JSON.stringify({  error:err.message})
          }
    }
    

}
