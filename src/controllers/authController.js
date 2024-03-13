
const Admin = require('../models/Admin');

exports.register1 = async (req,res) => {

    const username = req.body.username;
    const password = req.body.password
    const existingUser = await Admin.findOne({ username });
    if (existingUser){
        return res.status(400).json({
            status: "failed",
            data: [],
            message: "It seems you already have an account, please log in instead.",
        });
    }
    try {
        const admin = new Admin({
            username : username,
            password : password,
          });
      
          await admin.save();
          res.json({ message: 'Admin created successfully.', admin });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}

