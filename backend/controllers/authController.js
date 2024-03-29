import authModel from "../models/signupuser.js"
import bcryptjs from 'bcryptjs'
import jwt from "jsonwebtoken"

class authController {
    static userRegistration = async (req,res) => {
        const {name,email,password} =  req.body;
        try {
            if(name && email && password) {
                const isUser = await authModel.findOne({email: email});
                if(isUser) {
                    return res.status(400).json({message: "User Already Exists"});
                } else {
                    // Password Hashing
                    const genSalt = await bcryptjs.genSalt(10);
                    const hashedPassword = await bcryptjs.hash(password,genSalt);

                    // Saving user in database
                    const newUser = authModel({
                        name,
                        email,
                        password:hashedPassword,
                    })
                              const resUser = await newUser.save();
          if(resUser) {
                        return res.status(201).json({message: "User Registered Sucessfully" , user:resUser});
                    }
                }
            } 

        } catch (error) {
            return res.status(400).json({message: error.message});
        }
    }
    static userLogin = async (req,res) => {
        const {email,password} = req.body;
        try {
            if(email && password) {
                const isUser = await authModel.findOne({email: email});
                if(isUser) {
                    if(email === isUser.email && (await bcryptjs.compare(password,isUser.password))) {
                        // Generate Token
                        const token = jwt.sign({userId: isUser._id},"please", {
                            expiresIn: "2d",
                        })
                        return res.status(200).json({message: "Login Successfully",token, name: isUser.name});
                    }
                }
                else {
                    return res.status(400).json({message: "User Not Registered"});
                }
            }
            else {
                return res.status(400).json({message: "All Fields are req"});
            }
        } catch (error) {
            return res.status(400).json({message: message.error});
        }
    }
    static changePassword = async (req, res) => {
        const { newpassword, confirmpassword } = req.body;
        try {
          if (newpassword === confirmpassword) {
            const gensalt = await bcryptjs.genSalt(10);
            const hashedPassword = await bcryptjs.hash(newpassword, gensalt);
            await authModel.findByIdAndUpdate(req.user._id, {
              password: hashedPassword,
            });
            return res
              .status(200)
              .json({ message: "password Changed Successfully" });
          } else {
            return res
              .status(400)
              .json({ message: "password and confirm password does not match" });
          }
        } catch (error) {
          return res.status(400).json({ message: error.message });
        }
      };
}
export default authController