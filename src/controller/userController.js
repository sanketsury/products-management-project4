const userModel = require("../Model/userModel")
const { uploadFile } = require("../controller/aws")
const bcrypt = require("bcrypt")



const creatUser = async function (req, res) {
    try {
        const data = req.body
           
        const password = data.password
        const profileImage = req.files
        const uploadedImage = await uploadFile(profileImage[0])
        const cypt = await bcrypt.hash(password, 10)
        data.profileImage = uploadedImage
        data.password = cypt
   
        const register = await userModel.create(data)


        return res.status(201).send({ msg: "User created successfully", data: register })

    }
    catch (err) {
        return res.status(500).send({ msg: err })
    }

}
module.exports = { creatUser }
