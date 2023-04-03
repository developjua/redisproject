const redisClient = require('../database/redisconnection');
const connection = require('../database/mysqlconnection')

//const fetchdata = require('../utile/query');


exports.handler = async(event) => {

    const { queryStringParameters } = event;
    const blogId = queryStringParameters.blogId

  try {
    const cachedBlogData = await redisClient.get(`blog:${blogId}`);
    if (cachedBlogData) {
      console.log('Retrieving blog data from Redis cache...');
      return {
        statusCode: 200,
        body: JSON.stringify({
          message: 'Blog data retrieved from Redis cache',
          data: JSON.parse(cachedBlogData)
        })
      };
    }

    // If the blog data is not in Redis, retrieve it from MySQL
    const mysqlQuery= `SELECT * FROM blogs WHERE id = ${blogId}`;
    const [mysqlResult] = await connection.query(mysqlQuery);
    if (mysqlResult.length === 0) {
      return {
        statusCode: 404,
        body: JSON.stringify({
          message: 'Blog data not found'
        })
      };
    }

  
    const blogData = mysqlResult[0];
    const redisKey = `blog:${blogId}`;
    await redisClient.set(redisKey, JSON.stringify(blogData));
    console.log('Blog data cached in Redis...');
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Blog data retrieved from MySQL and cached in Redis',
        data: blogData
      })
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'An error occurred while retrieving blog data'
      })
    };
  }
};
    /* try {
        const { queryStringParameters } = event;
        const blogId = queryStringParameters.blogId
     const data = await redisClient.get(`blog:${blogId}`)
     console.log(data)
        /* if (err) {
          console.error(err);
        } */
         
     /*    if (data !=null) {
          console.log(`Retrieved blog data for blogId ${blogId} from Redis`);
          return {
            statusCode: 200,
            body: data
          };
        } else {
    
            const [results]= connection.query(`SELECT * FROM blogs WHERE id = ${blogId}`)
            
            if (results.length === 0) {
              console.log(`Blog data not found for blogId ${blogId}`);
              return {
                statusCode: 404,
                body: "Blog not found"
              };
            }
            const blogData = JSON.stringify(results[0]);
               
            redisClient.set(`blog:${blogId}`, blogData, (err) => {
              if (err) {
                console.error(err);
              }
              
              console.log(`Cached blog data for blogId ${blogId} in Redis`);
            });
            return {
              statusCode: 200,
              body: blogData
            };
        }
    } catch (error) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: error.message })
        };
    }  */
 


    /* try {
        const data = await redisClient.get(`blog:${blogId}`)
        if (data == null) {
            const [result] = connection.query(`SELECT * FROM blogs WHERE id = ${blogId}`)

            console.log(result)
            if (result.length === 0) {
                console.log(`Blog data not found for blogId ${blogId}`);
                return {
                    statusCode: 404,
                    body: "Blog not found"
                };
            } else {
                const blogData = JSON.stringify(results[0]);

                redisClient.set(`blog:${blogId}`, blogData, (err) => {
                    if (err) {
                        console.error(err);
                    }

                    console.log(`Cached blog data for blogId ${blogId} in Redis`);
                });
                return {
                    statusCode: 200,
                    body: blogData
                };

            }

        } else {

            console.log(`Retrieved blog data for blogId ${blogId} from Redis`);
            return {
                statusCode: 200,
                body: data
            };

        }
    }
    catch (error) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: error.message })
        };
    }
}

 */