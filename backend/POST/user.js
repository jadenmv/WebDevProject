const User = require("../models/User")
const crypto = require("crypto")
const bcrypt = require("bcrypt")

async function createNewUser(req, res) {
 try {
    const { username, email, password } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email is required" })
    }

    const cleanedEmail = email.toLowerCase().trim();

    const existingEmail = await User.exists({ email: cleanedEmail })
    if (existingEmail) {
      return res.status(400).json({ error: "Email already in use" })
    }

    let finalUsername = username?.trim()

    if (!finalUsername) {
      finalUsername = await generateUniqueUsername()
    } else {
      const existingUsername = await User.exists({ username: finalUsername })
      if (existingUsername) {
        return res.status(400).json({ error: "Username already taken" })
      }
    }

    let passwordHash = null;
    if (password) {
      passwordHash = await bcrypt.hash(password, 10);
    }

    const newUser = new User({
      username: finalUsername,
      email: cleanedEmail,
      passwordHash
    });

    const savedUser = await newUser.save();

    return res.status(201).json(savedUser)
  }  catch (error) {
    console.error(error)

    if (error.code === 11000) {
      return res.status(400).json({ error: "Duplicate field value" })
    }
    
    res.status(500).json({ error: "cannot create new user" })
  }
}

function generateUsername() {
  return "AnonymousUser_" + crypto.randomBytes(4).toString("hex")
}

async function generateUniqueUsername() {
  let username;
  let exists = true;

  while (exists) {
    username = generateUsername();
    exists = await User.exists({ username })
  }

  return username
}

module.exports = { createNewUser }
