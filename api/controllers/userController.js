const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

async function register(req, res) {
  try {
    const data = req.body;

    const salt = await bcrypt.genSalt();

    data.password = await bcrypt.hash(data.password, salt);

    const result = await User.createUser(data);

    res.status(201).json({
      id: result.id,
      username: result.username,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function login(req, res) {
  const data = req.body;

  try {
    const user = await User.findByUsername(data.username);

    if (!user) {
      throw new Error("No user with this username");
    }

    const match = await bcrypt.compare(data.password, user.password);

    if (match) {
      const payload = { id: user.id, username: user.username };

      const sendToken = (err, token) => {
        if (err) {
          throw new Error("Error in token generation");
        }

        res.status(200).json({
          success: true,
          token: token,
        });
      };

      jwt.sign(
        payload,
        process.env.SECRET_TOKEN,
        { expiresIn: 3600 },
        sendToken,
      );
    } else {
      throw new Error("User could not be authenticated");
    }
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
}

async function updateScore(req, res) {
  const { score } = req.body;

  if (score === undefined) {
    return res.status(400).json({ err: "Score is required" });
  }
  try {
    const response = await User.insertScore({
      user_id: req.user.id,
      score: score,
    });

    res.status(200).json({ response });
  } catch (err) {
    res.status(404).json({ err: err });
  }
}

module.exports = { register, login, updateScore };
