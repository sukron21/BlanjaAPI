const db = require('../config/db');

module.exports = {
    store: (data) => {
        const {sender, receiver, message} = data;
        return new Promise((resolve, reject) => {
            db.query(`insert into chat(sender, receiver, message, date_time)
            values (${sender}, ${receiver}, '${message}', now())
            `, (err, res) => {
                if(err) reject(err);
                resolve(res);
            })
        });
    },

    list: (sender, receiver) => {
        return new Promise((resolve, reject) => {
            db.query(`select chat.message, userSender.name as sender, userReceiver.name as receiver, chat.date_time,
            userSender.id_user as senderid, userReceiver.id_user as receiverid, userSender.image as senderimg, userReceiver.image as receiverimg
            from chat left join users as userSender on chat.sender = userSender.id_user
            left join users as userReceiver on chat.receiver = userReceiver.id_user
            where (sender = ${sender} and receiver = ${receiver}) or (sender = ${receiver} and receiver = ${sender})
            order by chat.id desc
            `, (err, res) => {
                if(err) reject(err);
                resolve(res);
            })
        });
    },

    userChat: (user) => {
        return new Promise((resolve, reject) => {
            db.query(`
            select distinct on (involved) involved as userid, s.id, s.sender, u.name as name, message, date_time, u.image
            from (select c.*,
            case sender when ${user} then receiver else sender end as involved
            from chat c where c.sender = ${user} or c.receiver = ${user}) s
            join users u on s.involved = u.id_user
            order by involved, s.id desc;
            `, (err, res) => {
                if(err) reject(err);
                resolve(res);
            })
        });
    },

    delete: (id) => {
        return new Promise((resolve, reject) => {
            db.query(`
            delete from chat where id = ${id};
            `, (err, res) => {
                if(err) return reject(err);
                resolve(res);
            })
        })
    },
}