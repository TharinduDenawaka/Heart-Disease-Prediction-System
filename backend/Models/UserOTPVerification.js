const mongoose = require("mongoose");

const UserOTPVerificationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  expiresAt: {
    type: Date,
    default: () => Date.now() + 15 * 60 * 1000, // Set to 15 minutes from now
    index: { expires: 900 }, // TTL Index to expire documents after 15 minutes (900 seconds)
  },
});

// Ensure the TTL index is created on the expiresAt field with a 15-minute expiration time
UserOTPVerificationSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 900 });

const UserOTPVerification = mongoose.model(
  "UserOTPVerification",
  UserOTPVerificationSchema
);

module.exports = UserOTPVerification;
