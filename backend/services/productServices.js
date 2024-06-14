const db = require("../database/db")

exports.allProducts = async (params)=>{
    const { page, limit } = params;

  let startValue;
  let endValue;

  if (page > 0) {
    startValue = page * limit - limit; // 0,10,20,30
    endValue = page * limit;
  } else {
    startValue = 0;
    endValue = 10;
  }
  return new Promise((resolve, reject) => {
    
  
  let sql = `SELECT p.id, p.title, p.image, p.price, p.short_desc, p.quantity,
        c.title as category FROM products p JOIN categories c ON
            c.id = p.cat_id LIMIT ${startValue}, ${limit}`

  db.query(sql,
    (err, result) => {
      if (err) { reject({
        data: err,
        message: "Something went wrong, please try again",
        statusCode: 400,
      });
    }      
    if (result.length > 0) {
        resolve({
          message: "product found successfully",
          data: result
        });
      }
    }
  );
});
}

exports.singleProduct = async (params) => {
    const { productId } = params;
    return new Promise((resolve, reject) => {
        let sql = `SELECT p.id, p.title, p.image, p.images, p.description, p.price, p.quantity, p.short_desc,
                c.title as category FROM products p JOIN categories c ON
                    c.id = p.cat_id WHERE p.id = ${productId}`
        db.query(sql,
            (err, result) => {
              if (result.length > 0){
                resolve({
                    message: "product found successfully",
                    data: result
                });
              }
              if(err){
                reject({
                    data: err,
                    message: "Something went wrong, please try again",
                    statusCode: 400,
                });
              } 
            }
          );
    })
}