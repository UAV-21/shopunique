const db = require("../database/db")
const { createProductValidation } = require("../middleware/validation");

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
      if (err) { 
        reject({
          status: false,
          message: "Something went wrong, please try again",
          data: err,
          statusCode: 400,
      });
    }      
    if (result.length > 0) {
        resolve({
          status: true,
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
              if(err){
                reject({
                    status: false,
                    message: "Something went wrong, please try again",
                    data: err,
                    statusCode: 400,
                });
              }
              if (result.length > 0){
                resolve({
                    status: true,
                    message: "product found successfully",
                    data: result
                });
              } 
            }
          );
    })
};

exports.createProduct = async(params) => {
  const { error } = createProductValidation(params);
  if(error) throw{ message: error.details[0].message, statusCode: 400 }

  const { cat_id, title, url_slug, image, images, description, price, quantity, short_desc } = params;

  let columns = ['cat_id', 'title', 'image', 'description', 'price', 'quantity'];
  let placeholders = ['?', '?', '?', '?', '?', '?'];
  let values = [ cat_id, title, image, description, price, quantity ];

  if(url_slug !== undefined){
    columns.push('url_slug');
    placeholders.push('?');
    values.push(url_slug);
  }
  if(images !== undefined){
    columns.push('images');
    placeholders.push('?');
    values.push(images);
  }
  if(short_desc !== undefined){
    columns.push('short_desc');
    placeholders.push('?');
    values.push(short_desc);
  }
  let sql = `INSERT INTO products (${columns.join(', ')}) values (${placeholders.join(', ')})`;

  return new Promise((resolve, reject) => {    
    
    db.query(sql,values,
      (err,result) => {
        if(err){
          console.error('Database query error:', err);
          reject({
            status: false,
            message: "Something went wrong, please try again",
            data: err,
            statusCode: 400,
          })
        }
        if(result.affectedRows > 0){
          const { affectedRows, insertId } = result;
          resolve({
            status: true,
            message: "product created successfully",
            data: { affectedRows, insertId }
          })
        }else{
          resolve({
            status: false,
            message: "No products created",
            data: result
        });
        }
        
      }
    )
  });
};