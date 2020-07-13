const User = require('../models/User')

module.exports = async (req, res, next) => {
    if(!req.session.isAuth) return next()

    req.user = await User.findById(req.session.user._id)
    next()
}