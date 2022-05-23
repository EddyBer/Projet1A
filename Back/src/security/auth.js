const { sign } = require('jsonwebtoken');

exports.generateAuthToken = (userId, firstName, roles) => {
  return sign(
    { userId, firstName, roles },
    process.env.JWT_SECRET,
    { expiresIn: "1h" },
  );
};

exports.verifyToken = (req,res,next) => {
    console.log(req)
    let token = req.body.token || req.query.token || req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send("A token is required for authentication");
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }
    return next();
};