const db = require('../config/db');
const orderModel = {
  // router
  selectAll: () => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM orders join product on product.id_product = orders.item join users on users.id_user = orders.userid', (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  },
  selectDetail: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM orders where id_order =${id}`, (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  },
  selectJoin: (id) => {
    return new Promise((resolve, reject) => {
      db.query(
        `select * from orders left join users on users.id_user = orders.userid
      left join product on product.id_product = orders.item where id_order = ${id}
      `,
        (err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result);
        }
      );
    });
  },
  selectUserOrder: (id) => {
    return new Promise((resolve, reject) => {
      db.query(
        `select orders.*, product.*, customer.name as buyer_name, seller.name as seller_name,
				 customer.image as buyer_image, seller.image as seller_image from orders join
				 users as customer on customer.id_user = orders.userid join product on item = product.id_product
				 join users as seller on seller.id_user = product.seller where userid = ${id};
      `,
				(err, result) => {
					if (err) {
						reject(err);
					}
					resolve(result);
				}
			);
		});
	},
	selectUserOrderWithStatus: (id, status) => {
		return new Promise((resolve, reject) => {
			db.query(
				`select orders.*, product.*, customer.name as buyer_name, seller.name as seller_name,
				 customer.image as buyer_image, seller.image as seller_image from orders join
				 users as customer on customer.id_user = orders.userid join product on item = product.id_product
				 join users as seller on seller.id_user = product.seller where userid = ${id} and status = ${status};
      `,
				(err, result) => {
					if (err) {
						reject(err);
					}
					resolve(result);
				}
			);
		});
	},
	selectAllOrderedProduct: (id) => {
		return new Promise((resolve, reject) => {
			db.query(
				`select orders.*, product.*, customer.name as buyer_name, seller.name as seller_name,
				 customer.image as buyer_image, seller.image as seller_image from orders join
				 users as customer on customer.id_user = orders.userid join product on item = product.id_product
				 join users as seller on seller.id_user = product.seller where product.seller = ${id};
      `,
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
          INSERT INTO orders (userid, item, quantity, item_color, item_size, status)
          VALUES
          (${data.userid}, ${data.item}, ${data.quantity}, '${data.color}', '${data.size}', ${data.status})
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
  updateOrder: (data) => {
    return new Promise((resolve, reject) => {
      db.query(
        `
        UPDATE orders SET
        quantity = COALESCE ($1, quantity),
        item_color = COALESCE ($2, item_color),
        item_size = COALESCE ($3, item_size),
        status = COALESCE ($4, status)
        WHERE id_order = $5
        `,
        [data.quantity, data.color, data.size, data.status, data.id],
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
      db.query(`DELETE FROM orders WHERE id_order = ${id};`, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  },
  storeTransaksi: (data) => {
		return new Promise((resolve, reject) => {
			db.query(
				`
          INSERT INTO transactions (userid, id_order,id_address, payment_method, total_price,transaction_date)
          VALUES
          (${data.userid}, ${data.id_order},${data.id_address}, '${data.payment_method}', ${data.total_price}, now())
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
  selectAllTransaction: () => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM transactions', (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  },
  selectTransactionID: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM transactions where id =${id}`, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  },
};
module.exports = orderModel;
