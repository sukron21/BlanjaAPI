const db = require('../config/db')
const userModel = {
  // get all user
  selectAll: () => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM users', (err, result) => {
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
  },

  // get user detail
  selectDetail: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM users where id_user=${id}`, (err, result) => {
        if (err) {
          reject(err)
        } 
        resolve(result)
      })
    })
  },

  // get all customers
  selectCustomer: () => {
    return new Promise((resolve, reject) => {
      db.query(`
      select * from customer join users on users.id_user = customer.id_customer;
      `, (err, res) => {
          if(err) return reject(err);
          resolve(res);
        })
    })
  },

  // get all seller
  selectSeller: () => {
    return new Promise((resolve, reject) => {
        db.query(`
        select * from seller join users on users.id_user = seller.id_seller;
        `, (err, res) => {
            if(err) return reject(err);
            resolve(res);
          })
      })
  },

  // get customer detail
  selectCustomerId: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`
      select * from customer join users on users.id_user = customer.id_customer where customer.id_customer = ${id};
      `, (err, res) => {
        if(err) return reject(err);
        resolve(res);
      })
    })
  },

  // get seller detail
  selectSellerId: (id) => {
    return new Promise((resolve, reject) => {
        db.query(`
        select * from seller join users on users.id_user = seller.id_seller where seller.id_seller = ${id};
        `, (err, res) => {
            if(err) return reject(err);
            resolve(res);
        })
    })
  },
  
  // register user
  register:({name, email, password, user_type, store_desc, phone, image})=>{
    return new Promise((resolve,reject)=>{
      db.query(`
      with ins1 as (
        insert into users (name, email, password, user_type, phone, image, user_created) 
        values
        ('${name}','${email}','${password}', ${user_type}, '${phone}', '${image}', now())
        returning id_user as user_id
      )
      insert into ${user_type === 1 ? 'customer' : 'seller'}
      (id_${user_type === 1 ? 'customer' : 'seller, store_desc' }) 
      values ((select user_id from ins1)
      ${user_type === 1 ? '' : `, '${store_desc}'`});
      `, (err,res)=>{
        if (err) {
            reject(err)
          }
          resolve(res)
        }
      )
    })
  },
  
  // update customer
  updateCustomer: (id, data, pass) => {
    return new Promise((resolve, reject) => {
      db.query(`
      with upd as (
        update users set
        name = coalesce ($1, name),
        email = coalesce ($2, email),
        password = coalesce ($3, password),
        phone = coalesce ($4, phone),
        image = coalesce ($6, image),
        main_address = coalesce ($7, main_address)
        from customer
        where users.id_user = customer.id_customer and users.id_user = $8
        returning *
      )
      update customer set
      gender = coalesce ($5, customer.gender),
      birth_date = coalesce ($9, customer.birth_date)
      from upd
      where customer.id_customer = $8;
      `,
      [data.name, data.email, pass, data.phone, data.gender, data.image, data.main_address, id, data.birth_date],
      (err, res) => {
          if(err) return reject(err);
          resolve(res);
      })
    })
  },
  
  // update seller
  updateSeller: (id, data, pass) => {
    return new Promise((resolve, reject) => {
      db.query(`
      with upd as (
        update users set
        name = coalesce ($1, name),
        email = coalesce ($2, email),
        password = coalesce ($3, password),
        phone = coalesce ($4, phone),
        image = coalesce ($6, image),
        main_address = coalesce ($7, main_address)
        from seller
        where users.id_user = seller.id_seller and users.id_user = $8
        returning *
      )
      update seller set
      store_desc = coalesce ($5, seller.store_desc)
      from upd
      where seller.id_seller = $8;
      `,
      [data.name, data.email, pass, data.phone, data.store_desc, data.image, data.main_address, id],
      (err, res) => {
          if(err) return reject(err);
          resolve(res);
      })
    })
  },
  
  // update image
  updatePhoto: (id, data) => {
    return new Promise((resolve, reject) => {
      db.query(`
      update users set image = '${data}' where id_user = ${id};
      `, (err, res) => {
        if(err) return reject(err);
        resolve(res);
      })
    })
  },
  
  // delete user
  delete: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`DELETE FROM users WHERE id_user = ${id};`, (err, res) => {
        if (err) {
          reject(err)
        }
        resolve(res)
      })
    })
  },

  checkUEmail:(email)=>{
    return new Promise((resolve, reject)=>{
      db.query(`select * from users where email='${email}'`, (err, result)=>{
        if (err) {
          reject(err)
        }
        resolve(result);
      })
    })
  },
}
module.exports = userModel