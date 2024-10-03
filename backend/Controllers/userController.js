const User = require("../Models/User");
const UserOTPVerification = require("../Models/UserOTPVerification");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");

dotenv.config();

//Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.AUTH_EMAIL,
    pass: process.env.AUTH_PASS,
  },
});

const sendOTPverificationEmail = async (user) => {
  try {
    const otp = `${Math.floor(1000 + Math.random() * 9000)}`;

    const mailOptions = {
      from: process.env.AUTH_EMAIL,
      to: user.email,
      subject: "Verify Your Email",
      html: `<div> <p>Enter <b>${otp}</b> In the app to verify your email address</p>
      <p>this code <b>expire in 15 minutes</b>. </p> </div>`,
    };

    const salt = await bcrypt.genSalt(10);
    const hashedOTP = await bcrypt.hash(otp, salt);

    const newOTPVerification = UserOTPVerification({
      userId: user._id,
      otp: hashedOTP,
      createdAt: Date.now(),
      expiresAt: Date.now() + 900000, // 3600000 milliseconds = 1 hour  , 900000 is 15 minute
    });

    //save OTP records
    await newOTPVerification.save();
    await transporter.sendMail(mailOptions);
    console.log("Verification OTP email sent");
  } catch (error) {
    console.error("Error sending OTP email:", error.message);
  }
};

const verifyOTP = async (req, res) => {
  try {
    let { userId, otp } = req.body;
    if (!userId || !otp) {
      throw Error("Empty OTP details are not allowed");
    } else {
      const UserOTPVerificationRecords = await UserOTPVerification.find({
        userId,
      });
      if (UserOTPVerificationRecords.length <= 0) {
        throw new Error(
          "Account records doesn't exist or has been verified already. Please sign up or log in."
        );
      } else {
        //user OTP record exists
        const { expiresAt } = UserOTPVerificationRecords[0];
        const hashedOTP = UserOTPVerificationRecords[0].otp;

        if (expiresAt < Date.now()) {
          //user otp record has expired
          await UserOTPVerification.deleteMany({ userId });
          throw new Error("Code has expired. Please request again. ");
        } else {
          const validOTP = await bcrypt.compare(otp, hashedOTP);

          if (!validOTP) {
            //supplied OTP is wrong
            throw new Error("Invalid code passed.check email your inbox. ");
          } else {
            await User.updateOne({ _id: userId }, { verified: true });
            await UserOTPVerification.deleteMany({ userId });
            res.json({
              message: "User email verified successfully.",
            });
          }
        }
      }
    }
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
};

//resend varification
const resendOTPVerificationCode = async (req, res) => {
  try {
    let { userId, email } = req.body;
    if (!userId || !email) {
      throw Error("Empty user details are not allowed. ");
    } else {
      //delete existing records and resend
      await UserOTPVerification.deleteMany({ userId });
      await sendOTPverificationEmail({ _id: userId, email });
      res.json({ message: "OTP has been resent" });
    }
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
};

//create initial user
const createInitialUser = async () => {
  try {
    const existingUser = await User.findOne({
      email: "tharindudasun1997@outlook.com",
    });

    if (!existingUser) {
      const password = "denawaka";

      const user = new User({
        email: "tharindudasun1997@outlook.com",
        username: "Tharindu Dasun",
        password: password,
        verified: true,
      });
      await user.save();
      console.log("Initial user created successfully");
    } else {
      console.log(" User already exists");
    }
  } catch (error) {
    console.error("Error creating initial admin user:", error);
  }
};

// Function to register a new user
const signUpUser = async (req, res) => {
  console.log("Request body:", req.body);
  const { email, password, username } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const user = await User.create({
      email,
      password,
      username,
    });

    if (user) {
      await sendOTPverificationEmail(user);
      res.status(201).json({
        _id: user._id,
        email: user.email,
        username: user.username,
        token: generateToken(user._id),
        message: "Verification OTP email sent",
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Function to authenticate a user
const authUser = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);

  try {
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.status(200).json({
        _id: user._id,
        email: user.email,
        username: user.username,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Function to change password
const changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  try {
    const user = await User.findById(req.user._id);

    if (user && (await user.matchPassword(currentPassword))) {
      user.password = newPassword;
      await user.save();
      res.status(200).json({ message: "Password updated successfully" });
    } else {
      res.status(400).json({ message: "Current password is incorrect" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Function to handle forgot password
const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "Email not found" });
    }

    if (!user.verified) {
      return res.status(400).json({ message: "Email not verified" });
    }

    await sendOTPverificationEmail(user);
    res.status(200).json({ message: "OTP sent to email", userId: user._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Function to verify OTP for password reset
const verifyForgotPasswordOTP = async (req, res) => {
  try {
    let { userId, otp, newPassword } = req.body;
    if (!userId || !otp || !newPassword) {
      throw Error("Missing details");
    } else {
      const UserOTPVerificationRecords = await UserOTPVerification.find({
        userId,
      });
      if (UserOTPVerificationRecords.length <= 0) {
        throw new Error(
          "Account records don't exist or have been verified already. Please sign up or log in."
        );
      } else {
        const { expiresAt } = UserOTPVerificationRecords[0];
        const hashedOTP = UserOTPVerificationRecords[0].otp;

        if (expiresAt < Date.now()) {
          await UserOTPVerification.deleteMany({ userId });
          throw new Error("Code has expired. Please request again.");
        } else {
          const validOTP = await bcrypt.compare(otp, hashedOTP);

          if (!validOTP) {
            throw new Error("Invalid code passed. Check your email inbox.");
          } else {
            const user = await User.findById(userId);
            user.password = newPassword;
            await user.save();
            await UserOTPVerification.deleteMany({ userId });
            res.json({ message: "Password reset successfully." });
          }
        }
      }
    }
  } catch (error) {
    res.json({ message: error.message });
  }
};

module.exports = {
  createInitialUser,
  signUpUser,
  authUser,
  changePassword,
  forgotPassword,
  verifyForgotPasswordOTP,
  verifyOTP,
  resendOTPVerificationCode,
};
