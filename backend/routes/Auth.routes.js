// ✅ Importing Router from express for creating modular route handlers
import { Router } from "express";
// ✅ Importing body and validationResult for validating incoming requests
import { body, validationResult } from "express-validator";
// ✅ Importing the User model from your mongoose schema file
import { User } from "../module/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import fetchuser from "../middleware/fetchuser.js";

// ✅ Initializing the router object
//route1
const router = Router();

// ✅ Route to create a user (Sign-up endpoint)
router.post(
  "/Sign-up",
  [
    // ✅ Validate that 'name' is at least 6 characters long
    body("name")
      .isLength({ min: 6 })
      .withMessage("name must be in 6 character"),

    // ✅ Validate that 'email' is a valid email format
    body("email").isEmail().withMessage("invalid email"),

    // ✅ Validate that 'password' is at least 6 characters long
    body("password")
      .isLength({ min: 6 })
      .withMessage("password must be in 6 character"),
  ],
  async (req, res) => {
    let success = false;
    // ✅ Get the validation result
    const errors = validationResult(req);

    // ✅ If validation errors exist, return 400 with error array
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }

    try {
      // ⚠️ No check here to see if the email already exists (can cause duplicate key error)
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({
          success,
          error: "sorry user with this email exist already ",
        });
      }
      const salt = await bcrypt.genSalt(10);
      const secpass = await bcrypt.hash(req.body.password, salt);

      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secpass, // ⚠️ Storing password in plain text (security issue!)
      });

      const data = {
        user: {
          id: user.id,
        },
      };
      const AuthToken = jwt.sign(data, process.env.JWT_SCREATS);
      success = true;
      res.json({ success: true, authtoken: AuthToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("internal server error");
    }
  }
);

//.......authenticate a user using post "/api/auth/login"
//route2
router.post(
  "/login",
  [
    // ✅ Validate that 'email' is a valid email format
    body("email", "invalid email").isEmail(),

    // ✅ Validate that 'password' is at least 6 characters long
    body("password", "Password cannot be blanked").exists(),
  ],
  async (req, res) => {
    let success = false;
    // ✅ Get the validation result
    const errors = validationResult(req);

    // ✅ If validation errors exist, return 400 with error array
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        success = false;
        return res
          .status(400)
          .json({ error: "please try to login with correct credentials" });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        success = false;
        return res.status(400).json({
          success,
          error: "please try to login with correct credentials",
        });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      const AuthToken = jwt.sign(data, process.env.JWT_SCREATS);
      success = true;
      res.json({ success, authtoken: AuthToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("internal server error");
    }
  }
);

//get logged-in user details using post............
//route3
router.post("/fetchuserdata", fetchuser, async (req, res) => {
  try {
    const userid = req.user.id;
    const user = await User.findById(userid).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("internal server error");
  }
});

// ✅ Exporting the router to be used in main app
export default router;
