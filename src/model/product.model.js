const db = require("../config/db");
const productModel = {
	// router
	selectAll: () => {
		return new Promise((resolve, reject) => {
			db.query(
				"SELECT * FROM product join seller on seller.id_seller = product.seller join users on seller.id_seller = users.id_user",
				(err, result) => {
					if (err) {
						reject(err);
					} else {
						resolve(result);
					}
				}
			);
		});
	},
	selectDetail: (id) => {
		return new Promise((resolve, reject) => {
			db.query(
				`SELECT * FROM product where id_product =${id}`,
				(err, result) => {
					if (err) {
						reject(err);
					}
					resolve(result);
				}
			);
		});
	},
	selectJoin: (id) => {
		return new Promise((resolve, reject) => {
			db.query(
				`select * from product left join seller on seller.id_seller = product.seller left join users on seller.id_seller = users.id_user where id_product=${id}`,
				(err, result) => {
					if (err) {
						reject(err);
					}
					resolve(result);
				}
			);
		});
	},
	checkProduct: (data) => {
		return new Promise((resolve, reject) => {
			db.query(
				`select * from product where product_name ilike '%${data}%'`,
				(err, result) => {
					if (err) {
						reject(err);
					}
					resolve(result);
				}
			);
		});
	},
	store: (data) => {
		return new Promise((resolve, reject) => {
			db.query(
				`
            INSERT INTO product (seller,product_name, price ,stock,condition,photo,color,size,category,description)
            VALUES
            (${data.seller},'${data.product_name}',${data.price},${data.stock},${data.condition},'${data.photo}','${data.color}','${data.size}','${data.category}','${data.description}')
            `,
				(err, res) => {
					if (err) {
						reject(err);
					}
					resolve(res);
				}
			);
		});
	},
	updateProduct: (data) => {
		return new Promise((resolve, reject) => {
			db.query(
				`
        UPDATE product SET
        product_name = COALESCE ($1, product_name),
        price = COALESCE ($2, price),
        stock = COALESCE ($3, stock),
        condition = COALESCE ($4, condition),
        photo = COALESCE ($5, photo),
        color = COALESCE ($6, color),
        size = COALESCE ($7, size),
        category = COALESCE ($8, category),
        description = COALESCE ($9, description)
        WHERE id_product = $10
        `,
				[
					data.product_name,
					data.price,
					data.stock,
					data.condition,
					data.photo,
					data.color,
					data.size,
					data.category,
					data.description,
					data.id,
				],
				(err, res) => {
					if (err) {
						reject(err);
					}
					resolve(res);
				}
			);
		});
	},

	delete: (id) => {
		return new Promise((resolve, reject) => {
			db.query(`DELETE FROM product WHERE id_product = ${id};`, (err, res) => {
				if (err) {
					reject(err);
				}
				resolve(res);
			});
		});
	},

	selectUserProduct: (id) => {
		return new Promise((resolve, reject) => {
			db.query(
				`SELECT * FROM product join seller on seller.id_seller = product.seller where seller = ${id}`,
				(err, result) => {
					if (err) {
						reject(err);
					} else {
						resolve(result);
					}
				}
			);
		});
	},

	searchProduct: (data) => {
		return new Promise((resolve, reject) => {
			let counter = 1;
			let max = 0;

			const offset = (data.page - 1) * data.limit;

			const body = {
				product_name: data.product_name,
				color: data.color,
				size: data.size,
				category: data.category,
			};

			for (var key in body) {
				if (body[key] !== null) max = max + 1;
			}
     
			const addCount = () => {
				counter = counter + 1;
				return "or ";
			};

			db.query(
				`
        SELECT * FROM product join seller on seller.id_seller = product.seller join users on users.id_user = product.seller
        where
        ${data.product_name ? `product_name ilike ${data.product_name} ${counter < max ? addCount() : ' '}` : ''}
        ${data.color ? `color ilike ${data.color} ${counter < max ? addCount() : ' '}` : ''}
        ${data.size ? `size ilike ${data.size} ${counter < max ? addCount() : ' '}` : ''}
        ${data.category ? `category ilike ${data.category} ${counter < max ? addCount() : ' '}` : ''}
        ${max < 1 ? `product_name ilike '%%'` : ''}
        order by ${data.sortBy} ${data.sortOrd} limit ${data.limit} offset ${offset}
        `,
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        }
      );
    });
  },
};

module.exports = productModel;
