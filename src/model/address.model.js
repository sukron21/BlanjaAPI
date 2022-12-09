const db = require('../config/db');

const addressModel = {
    // get all user's address
    selectUserAddress: (id) => {
        return new Promise((resolve, reject) => {
            db.query(`
            select * from address join users on users.id_user = address.userid where userid = ${id};
            `, (err, res) => {
                if(err) return reject(err);
                resolve(res);
            })
        })
    },

    // get user's address detail
    selectAddressDetail: (id) => {
        return new Promise((resolve, reject) => {
            db.query(`
            select * from address join users on users.id_user = address.userid where id_address = ${id};
            `, (err, res) => {
                if(err) return reject(err);
                resolve(res);
            })
        })
    },

    // insert new address
    insertAddress: (data) => {
        return new Promise((resolve, reject) => {
            db.query(`
            with ins1 as (
                insert into address (userid, address_name, recipient_name, recipient_phone, address, post_code, city)
                values
                (${data.userid}, '${data.address_name}', '${data.recipient_name}', '${data.recipient_phone}', '${data.address}', '${data.post_code}', '${data.city}')
                returning id_address as addressid
            )
            select addressid from ins1;
            `, (err, res) => {
                if(err) return reject(err);
                resolve(res);
            })
        })
    },

    // update address
    updateAddress: (id, data) => {
        return new Promise((resolve, reject) => {
            db.query(`
            update address set
            address_name = coalesce ($2, address_name),
            recipient_name = coalesce ($3, recipient_name),
            recipient_phone = coalesce ($4, recipient_phone),
            address = coalesce ($5, address),
            post_code = coalesce ($6, post_code),
            city = coalesce ($7, city)
            where id_address = $1;
            `, 
            [id, data.address_name, data.recipient_name, data.recipient_phone, data.address, data.post_code, data.city],
            (err, res) => {
                if(err) return reject(err);
                resolve(res);
            })
        })
    },

    // delete address
    deleteAddress: (id) => {
        return new Promise((resolve, reject) => {
            db.query(`
            delete from address where id_address = ${id};
            `, (err, res) => {
                if(err) return reject(err);
                resolve(res);
            })
        })
    },
}

module.exports = addressModel;