const productModel = require('../model/product.model');
const cloudinary = require("../helper/cloudinary");
const { failed, success } = require('../helper/response');

const productController = {
  // method

  list: (req, res) => {
    productModel
      .selectAll()
      .then((result) => {
        success(res, result, 'success', 'get all products success');
      })
      .catch((err) => {
        failed(res, err.message, 'failed', 'failed to get all products');
      });
  },
  detail: (req, res) => {
    const id = req.params.id;
    productModel
      .selectDetail(id)
      .then((result) => {
        success(res, result, 'success', 'by id user success');
      })
      .catch((err) => {
        failed(res, err.message, 'failed', 'by id user failed');
      });
  },
  detailProduct: (req, res) => {
    const id = req.params.id;
    productModel
      .selectJoin(id)
      .then((result) => {
        success(res, result, 'success', 'get detail product success');
      })
      .catch((err) => {
        failed(res, err.message, 'failed', 'failed to get product detail');
      });
  },
  searchName: (req, res) => {
    const search = req.params.search;
    productModel
      .checkProduct(search)
      .then((result) => {
        success(res, result, 'success', 'find product by name success');
      })
      .catch((err) => {
        failed(res, err.message, 'failed', 'failed to find product by name');
      });
  },
  insert: async(req, res) => {
    try {
      const image = await cloudinary.uploader.upload(req.file.path);
      const { seller, product_name, price, stock, condition, color, size, category, description } = req.body;

      const data = {
        seller,
        product_name,
        price,
        stock,
        condition,
        photo: `${image.secure_url}|&&|${image.public_id}`,
        color,
        size,
        category,
        description,
      };

      productModel
        .store(data)
        .then((result) => {
          success(res, result, 'success', 'insert product success');
        })
        .catch((err) => {
          failed(res, err.message, 'failed', 'insert product failed');
        });
    } catch (err) {
      failed(res, err.message, 'failed', 'internal server error');
    }
  },
  update: (req, res) => {
    try {
      const id = req.params.id;

      const { product_name, price, stock, condition, color, size, category, description } = req.body;
      const data = {
        product_name,
        price,
        stock,
        condition,
        color,
        size,
        category,
        description,
        id,
      };

      productModel
        .updateProduct(data)
        .then((result) => {
          productModel
            .selectJoin(id)
            .then((result) => {
              success(res, result.rows, 'success', 'update product success');
            })
            .catch((err) => {
              failed(res, err.message, 'failed', 'failed to get product detail');
            });
        })
        .catch((err) => {
          failed(res, err.message, 'failed', 'update product failed');
        });
    } catch (err) {
      failed(res, err.message, 'failed', 'internal server error');
    }
  },

  updatePhoto: async(req, res) => {
    try {
      const id = await req.params.id;
      const photo = await cloudinary.uploader.upload(req.file.path);

      productModel
        .selectJoin(id)
        .then(async (result) => {
          const img = result.rows[0].photo + '||' + `${photo.secure_url}|&&|${photo.public_id}`;

          const data = {
            id,
            photo: img,
          };

          await productModel
            .updateProduct(data)
            .then((result) => {
              success(res, result.rowCount, 'success', 'update product photo success');
            })
            .catch((err) => {
              failed(res, err.message, 'failed', 'failed to update product photo');
            });
        })
        .catch((err) => {
          failed(res, err.message, 'failed', 'failed to get product detail');
        });
    } catch (err) {
      failed(res, err.message, 'failed', 'internal server error');
    }
  },

  destroy: (req, res) => {
    productModel
      .delete(req.params.id)
      .then((result) => {
        success(res, result, 'success', 'delete product success');
      })
      .catch((err) => {
        failed(res, err.message, 'failed', 'delete product failed');
      });
  },

  userProduct: (req, res) => {
    const id = req.params.id;

    productModel
      .selectUserProduct(id)
      .then((result) => {
        success(res, result.rows, 'success', 'get user products success');
      })
      .catch((err) => {
        failed(res, err.message, 'failed', 'failed to get user products');
      });
  },

  filter: (req, res) => {
    const body = req.body;

    const data = {
      product_name: body.product_name !== null ? `'%${body.product_name}%'` : null,
      color: body.color !== null ? `'%${body.color}%'` : null,
      size: body.size !== null ? `'%${body.size}%'` : null,
      category: body.category !== null ? `'%${body.category}%'` : null,
      sortBy: body.sortBy || 'product_name',
      sortOrd: body.sortOrd || 'asc',
      page: body.page < 1 ? 1 : body.page,
      limit: body.limit || 5,
    };

    productModel
      .searchProduct(data)
      .then((result) => {
        success(res, result.rows, 'success', 'search products success');
      })
      .catch((err) => {
        failed(res, err.message, 'failed', 'failed to search products');
      });
  },
};

module.exports = productController;
