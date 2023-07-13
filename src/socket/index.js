// const {store, list, userChat} = require('../model/chat.model')

// module.exports = (io, socket) => {
//     // sender
//     socket.on('ping', (data) => {
//         // receiver
//         socket.emit('ping-response', data);
//     })
    
//     // private room
//     socket.on('join-room', (data) => {
//         socket.join(data);
//     })

//     // store message
//     socket.on('send-message', (data) => {
//         store(data)
//         .then(async() => {
//             const listChat = await list(data.sender, data.receiver)
//             io.to(data.receiver).emit('send-message-response', listChat.rows);
//         })
//         .catch((err) => {
//             console.log(err)
//         })
//     });

//     // contact
//     socket.on("contact-history", async(data) => {
//         try{
//             const contactList = await userChat(data);
//             io.to(data).emit("send-message-response", contactList.rows);
//         }catch(err){
//             console.log('Error fetching contact history')
//         }
//     });

//     // history
//     socket.on("chat-history", async(data) => {
//         try{
//             const listChat = await list(data.sender, data.receiver);
//             io.to(data.sender).emit("send-message-response", listChat.rows);
//         }catch(err){
//             console.log('Error fetching chat history')
//         }
//     });
// }