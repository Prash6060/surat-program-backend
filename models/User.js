// models/User.js
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Schema = mongoose.Schema;

// Define the User schema
const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,      // Ensures email is unique
    trim: true,        // Removes whitespace from both ends of the string
    lowercase: true,   // Converts email to lowercase
  },
  password: {
    type: String,
    required: true,
  },
});

// Method to generate JWT token
userSchema.methods.generateToken = async function () {
  try {
    // Creating a JWT payload with user information
    const payload = {
      userId: this._id.toString(), // Convert user ID to a string
      email: this.email,
    };

    // Signing the payload to create a JWT
    const token = jwt.sign(
      payload,                    // Payload to be encoded in the token
      process.env.JWTSECRETKEY,   // Secret key used to sign the token
      { expiresIn: '30d' }        // Token expiration time (30 days)
    );

    // Returning the generated JWT
    return token;
  } catch (error) {
    // Handling errors, if any
    console.error('Error generating token:', error);
  }
};

// Create and export the User model based on the schema
const User = mongoose.model('User', userSchema);

module.exports = User;
