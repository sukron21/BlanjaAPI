const userModel = require('../model/user.model');
const chatModel = require('../model/chat.model');
const {successWithToken ,failed, success}= require('../helper/response');
const bcrypt= require('bcrypt');
const jwtToken = require('../helper/generateJWT');

const userController = {
  // get list user
  list: (req, res) => {
    userModel
    .selectAll()
    .then((result) => {
      success(res, result, 'success', 'get all user success')
    })
    .catch((err) => {
      failed(res, err.message, 'failed', 'get all user failed')
    })
  },

  // get detail user
  detail: (req, res) => {
    const id = req.params.id;

    userModel
    .selectDetail(id)
    .then((result) => {
      success(res, result, 'success','get user by id success')
    })
    .catch((err) => {
      failed(res, err.message,'failed','failed to get user by id')
    })
  },

  // check email user
  checkEmail: (req, res) => {
    const email = req.params.email;

    userModel.checkUEmail(email)
    .then((result) => {
      success(res, result.rows, 'success','get user by email success')
    })
    .catch((err) => {
      failed(res, err.message,'failed','failed to get user by email')
    })
  },

  // get all customer
  listCustomer: (req, res) => {
    userModel.selectCustomer()
    .then((result) => {
        success(res, result.rows, 'success', 'get all customer success');
    })
    .catch((err) => {
        failed(res, err.message, 'failed', 'failed to get all customer');
    })
  },

  // get all seller
  listSeller: (req, res) => {
    userModel.selectSeller()
    .then((result) => {
        success(res, result.rows, 'success', 'get all seller success');
    })
    .catch((err) => {
        failed(res, err.message, 'failed', 'failed to get all seller');
    })
  },

  // get customer detail
  detailCustomer: (req, res) => {
    const id = req.params.id;

    userModel.selectCustomerId(id)
    .then((result) => {
      success(res, result.rows, 'success', `get detail customer success`);
    })
    .catch((err) => {
      failed(res, err.message, 'failed', `failed to get customer detail`);
    })
  },

  // get seller detail
  detailSeller: (req, res) => {
    const id = req.params.id;

    userModel.selectSellerId(id)
    .then((result) => {
        success(res, result.rows, 'success', `get detail seller success`);
    })
    .catch((err) => {
        failed(res, err.message, 'failed', `failed to get seller detail`);
    })
  },

  // update customer
  updateCustomer: (req, res) => {
    const id = req.params.id;
    const body = req.body;
    const newPass = body.password ? bcrypt.hashSync(body.password, 10) : null;

    userModel.updateCustomer(id, body, newPass)
    .then((result) => {
      userModel.selectCustomerId(id)
      .then((result) => {
        success(res, result.rows, "success", "update customer success");
      })
      .catch((err) => {
        failed(res, err.message, "failed", "failed to get seller detail");
      })
    })
    .catch((err) => {
        failed(res, err.message, "failed", "failed to update customer");
    });
  },

  // update seller
  updateSeller: (req, res) => {
    const id = req.params.id;
    const body = req.body;
    const newPass = body.password ? bcrypt.hashSync(body.password, 10) : null;

    userModel.updateSeller(id, body, newPass)
    .then((result) => {
      userModel.selectSellerId(id)
      .then((result) => {
        success(res, result.rows, "success", "update seller success");
      })
      .catch((err) => {
        failed(res, err.message, "failed", "failed to get seller detail");
      })
    })
    .catch((err) => {
        failed(res, err.message, "failed", "failed to update seller");
    });
  },

  updatePhoto: async(req, res) => {
    const id = req.params.id;
    const image  = req.file.filename;

    await userModel.updatePhoto(id, image)
    .then((result) => {
      success(res, result.rowCount, "success", "update photo success");
    })
    .catch((err) => {
      failed(res, err.message, "failed", "failed to update photo");
    });
  },

  destroy: (req, res) => {
    userModel
    .delete(req.params.id)
    .then((result) => {
      success(res, result.rowCount, "success", "delete user success");
    })
    .catch((err) => {
      failed(res, err.message, "failed", "failed to delete user");
    })
  },

  chat: (req, res) => {
    const id = req.params.id;

    chatModel.userChat(id)
    .then((result) => {
      success(res, result.rows, "success", "get user's chat success");
    })
    .catch((err) => {
      failed(res, err.message, "failed", "failed to get user's chat");
    });
  },

  register:(req, res)=>{
    try{
      const { name, email, password, user_type, phone, store_desc } = req.body;

      bcrypt.hash(password,10,(err,hash)=>{
        if (err) {
          failed(res, err.message, 'failed','hash password failed')
        }

        const data={
          name,
          email,
          password: hash,
          user_type,
          image: "default.png",
          phone,
          store_desc,
        }

        userModel.checkUEmail(email)
        .then((result) => {
          if(result.rowCount === 0){
            userModel
            .register(data).then((result)=>{
              success(res, result, 'success','register success')
            }).catch((err)=>{
              failed(res, err.message,'failed','register fail')
            })
          }else{
            failed(res, null, 'failed', `email already taken`);
          }
        })
        .catch((err) => {
          failed(res, err.message, 'failed', `failed to check email user`);
        })
      })
    }catch(err){
      failed(res, err.message,'failed','internal server error')
    }
  },

  login: async (req, res) => {
    const {email, password} = req.body;

    userModel.checkUEmail(email).then((result) => {
      const user = result.rows[0];
      let data = {};

      if(result.rowCount > 0) {
        bcrypt.compare(password, user.password)
        .then(async (result) => {
          if(result) {
            if(user.user_type === 1){
              await userModel.selectCustomerId(user.id_user)
              .then((result) => {
                data = result.rows[0];
              })
              .catch((err) => {
                console.error(err);
              })
            }else{
              await userModel.selectSellerId(user.id_user)
              .then((result) => {
                data = result.rows[0];
              })
              .catch((err) => {
                console.error(err);
              })
            }
            
            const token = await jwtToken({
              email: data.email,
              level: data.user_type
            })
            delete data.password;

            successWithToken(res, data, token, "success", "login success");
          } else {
            failed(res, null, 'failed', 'name or password is incorrect');
          }
        })
      } else {
        failed(res, null, 'failed', 'name or password is incorrect');
      }
    }).catch((err) => {
      failed(res, err, 'failed', 'internal server error');
    })
  }
}

module.exports = userController
