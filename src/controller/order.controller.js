const orderModel = require('../model/order.model');
const productModel = require('../model/product.model');
const { failed, success } = require('../helper/response');

const orderController = {
  // method
  list: (req, res) => {
    orderModel
      .selectAll()
      .then((result) => {
        success(res, result, 'success', 'get all orders success');
      })
      .catch((err) => {
        failed(res, err.message, 'failed', 'get all orders failed');
      });
  },
  detail: (req, res) => {
    const id = req.params.id;
    orderModel
      .selectDetail(id)
      .then((result) => {
        success(res, result, 'success', 'by id orders success');
      })
      .catch((err) => {
        failed(res, err.message, 'failed', 'by id orders failed');
      });
  },
  detailOrder: (req, res) => {
    const id = req.params.id;

    orderModel
      .selectJoin(id)
      .then((result) => {
        success(res, result.rows, 'success', `get detail order success`);
      })
      .catch((err) => {
        failed(res, err.message, 'failed', `failed to get order detail`);
      });
  },
  detailUserOrder: (req, res) => {
    const id = req.params.id;

    orderModel
      .selectUserOrder(id)
      .then((result) => {
        success(res, result.rows, 'success', `get detail order success`);
      })
      .catch((err) => {
        failed(res, err.message, 'failed', `failed to get order detail`);
      });
  },
  detailUserOrderWithStatus: (req, res) => {
    const id = req.params.id;
    const status = req.query.status || 0

    orderModel.selectUserOrderWithStatus(id, status)
    .then((result) => {
        success(res, result.rows, 'success', `get detail order success`);
    })
    .catch((err) => {
        failed(res, err.message, 'failed', `failed to get order detail`);
    })
  },
  allOrderedProduct: (req, res) => {
    const id = req.params.id;

    orderModel
      .selectAllOrderedProduct(id)
      .then((result) => {
        success(res, result.rows, 'success', `get seller's ordered product success`);
      })
      .catch((err) => {
        failed(res, err.message, 'failed', `failed to get seller's ordered product`);
      });
  },
  insert: (req, res) => {
    try {
      const { userid, item, quantity, color, size, status } = req.body;

      const data = {
        userid,
        item,
        quantity,
        color,
        size,
        status,
      };

      orderModel
        .store(data)
        .then((result) => {
          success(res, result, 'success', 'insert order success');
        })
        .catch((err) => {
          failed(res, err.message, 'failed', 'insert order failed');
        });
    } catch (err) {
      failed(res, err.message, 'failed', 'internal server error');
    }
  },
  update: (req, res) => {
    const id = req.params.id;
    const { quantity, color, size, status } = req.body;
    const data = { quantity, color, size, status, id };
    orderModel
      .updateOrder(data)
      .then((result) => {
        success(res, result, 'success', 'update orders success');
      })
      .catch((err) => {
        failed(res, err.message, 'failed', 'internal server error');
      });
  },
  insertTransaction: (req, res) => {
    try {
      const { userid, id_order, id_address, payment_method, quantity, price, id, stockProduk } = req.body;
      const total_price = quantity * price + (5 / 100 * quantity * price);
      const data = {
        userid,
        id_order,
        id_address,
        payment_method,
        total_price,
      };
      orderModel
        .storeTransaksi(data)
        .then((result) => {
          const stock = stockProduk - quantity;
          const data1 = { stock, id };
          productModel.updateProduct(data1);
          const data3 = { id: id_order, status: 1 };
          orderModel.updateOrder(data3);
          success(res, result, 'success', 'insert transaction success');
        })
        .catch((err) => {
          failed(res, err.message, 'failed', 'insert transaction failed');
        });
    } catch (err) {
      failed(res, err.message, 'failed', 'internal server error');
    }
  },
  listTransaksi: (req, res) => {
    orderModel
      .selectAllTransaction()
      .then((result) => {
        success(res, result, 'success', 'get all transactions success');
      })
      .catch((err) => {
        failed(res, err.message, 'failed', 'get all transactions failed');
      });
  },
  listTransaksiID: (req, res) => {
    const id = req.params.id;
    orderModel
      .selectTransactionID(id)
      .then((result) => {
        success(res, result, 'success', 'get transaction detail success');
      })
      .catch((err) => {
        failed(res, err.message, 'failed', 'get transaction detail failed');
      });
  },
};

module.exports = orderController;
