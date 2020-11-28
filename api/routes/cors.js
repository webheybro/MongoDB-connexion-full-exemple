module.exports = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3001');
    next();
}