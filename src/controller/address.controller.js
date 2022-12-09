const addressModel = require('../model/address.model');
const { success, failed } = require('../helper/response');

const addressController = {
    // get user's address
    list: (req, res) => {
        const id = req.params.id;

        addressModel.selectUserAddress(id)
        .then((result) => {
            success(res, result.rows, 'success', 'get all user address success')
        })
        .catch((err) => {
            failed(res, err.message, 'failed', 'failed to get all user address')
        })
    },

    // get address detail
    detail: (req, res) => {
        const id = req.params.id;

        addressModel.selectAddressDetail(id)
        .then((result) => {
            success(res, result.rows, 'success', 'get address detail success')
        })
        .catch((err) => {
            failed(res, err.message, 'failed', 'failed to get address detail')
        })
    },

    // insert new address
    insert: (req, res) => {
        const body = req.body;

        addressModel.insertAddress(body)
        .then((result) => {
            success(res, result.rows, 'success', 'insert new address success')
        })
        .catch((err) => {
            failed(res, err.message, 'failed', 'failed to insert new address')
        })
    },

    // update address
    update: (req, res) => {
        const id = req.params.id;
        const body = req.body;

        addressModel.updateAddress(id, body)
        .then((result) => {
            addressModel.selectAddressDetail(id)
            .then((result) => {
                success(res, result.rows, 'success', 'update user address success')
            })
            .catch((err) => {
                failed(res, err.message, 'failed', 'failed to get address detail')
            })
        })
        .catch((err) => {
            failed(res, err.message, 'failed', 'failed to update user address')
        })
    },

    // delete address
    destroy: (req, res) => {
        const id = req.params.id;

        addressModel.deleteAddress(id)
        .then((result) => {
            success(res, result.rowCount, 'success', 'delete user address success')
        })
        .catch((err) => {
            failed(res, err.message, 'failed', 'failed to delete user address')
        })
    },
}

module.exports = addressController;