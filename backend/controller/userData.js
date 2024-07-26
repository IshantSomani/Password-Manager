const jwt = require("jsonwebtoken");
const { UserData, UserLogin } = require("../model/userData");
const bcrypt = require("bcrypt");

// Helper function to capitalize words
const capitalizeWords = (input) => {
  return input.replace(/\b\w/g, (char) => char.toUpperCase());
};

// Get all user data by ID
exports.getAllUserData = async (req, res) => {
  try {
    const userId = req.params.id;
    const userData = await UserData.find({ userLogin: userId });
    if (!userData) {
      return res.status(404).send({ message: "User not found" });
    }
    res.status(200).json(userData);
  } catch (error) {
    console.error("Error in getUserDataById:", error);
    return res.status(500).send({ message: "Error", error: error.message });
  }
};

// Create new user data
exports.createUserData = async (req, res) => {
  try {
    const { appName, userName, password, loginEmail } = req.body;

    const capitalizedAppName = capitalizeWords(appName.trim());

    const existingUserLogin = await UserLogin.findOne({ loginEmail });
    if (existingUserLogin) {
        const existingUser = await UserData.findOne({
          appName: capitalizedAppName,
          userLogin: existingUserLogin._id,
        });
      if (existingUser) {
        return res.status(400).send({ message: "Data already exists" });
      } else {
          const userData = new UserData({
            appName: capitalizedAppName,
            userName, password,
            userLogin: existingUserLogin._id, // Assign the ObjectId of userLogin
          });
        await userData.save();
        return res.status(201).send({ message: "User created successfully", data: userData });
      }
    } else {
        const userLogin = new UserLogin({ loginEmail });
        await userLogin.save();
        const userData = new UserData({
          appName: capitalizedAppName,
          userName, password,
          userLogin: userLogin._id,
        });
        await userData.save();
        return res.status(201).send({ message: "User created successfully", data: userData });
    }
  } catch (error) {
    console.error("Error in createUserData:", error);
    return res.status(500).send({ message: "Error", error: error.message });
  }
};

// Update user data
exports.updateUserData = async (req, res) => {
  const id = req.params.id;
  const reqBody = req.body;

  try {
    const existingUser = await UserData.findById({ _id: id }).populate("userLogin");
    if (!existingUser) {
      return res.status(404).send({ message: "User not found" });
    }
    if (existingUser.userLogin.loginEmail !== reqBody.loginEmail) {
      return res.status(401).send({ message: "Unauthorized access" });
    }

    const updatedUserData = await UserData.findByIdAndUpdate(id, reqBody, {
      new: true, // Return the updated document
      runValidators: true, // Run Mongoose validators to ensure data integrity
    });
    return res.status(202).send({ message: "Data has been updated", data: updatedUserData });
  } catch (error) {
    console.error("Error occurred during update:", error);
    return res.status(500).send({ message: "Error updating data", error: error });
  }
};

// Login user
exports.login = async (req, res) => {
  const { loginEmail, loginPassword } = req.body;
  try {
    const user = await UserLogin.findOne({ loginEmail: loginEmail });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    const isMatched = await bcrypt.compare(loginPassword, user.loginPassword); // Compare passwords
    if (!isMatched) {
      return res.status(401).send({ message: "Invalid Password" });
    }
    const token = jwt.sign({
      _id: user._id,
      loginEmail: user.loginEmail,
      name: user.name,
    }, 'yourjwtsectrate', {expiresIn: '10'})
    // Password matched, return success response
    return res.status(200).send({ message: "User LoggedIn", data: user, token : token });
  } catch (error) {
    console.error("Error occurred during login:", error);
    return res.status(500).send({ message: "Error logging in", error: error });
  }
};

// Signup new user
exports.signup = async (req, res) => {
  const { name, loginEmail, loginPassword } = req.body;
  try {
    const existingUser = await UserLogin.findOne({ loginEmail: loginEmail });
    if (existingUser) {
      return res.status(400).send({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(loginPassword, 10); // Hash the password

    const newUser = new UserLogin({
      name: name,
      loginEmail: loginEmail.toLowerCase(),
      loginPassword: hashedPassword,
    });

    await newUser.save();
    return res.status(201).send({ message: "User Created", data: newUser });
  } catch (error) {
    console.error("Error occurred during signup:", error);
    return res.status(500).send({ message: "Error creating user", error: error });
  }
};

// Delete user data
exports.deleteUserData = async (req, res) => {
  const id = req.params.id;
  try {
    const existingUser = await UserData.findById(id);
    if (!existingUser) {
      return res.status(404).send({ message: "User not found" });
    }
    await UserData.findByIdAndDelete(id);
    res.status(202).send({ message: "Data has been deleted" });
  } catch (error) {
    return res.status(500).send({ message: "error", error: error });
  }
};

// Update password
exports.updatePassword = async (req, res) => {
  try {
    const loginEmail = req.params.id;
    const { loginPassword } = req.body;
    const existingUser = await UserLogin.findOne({ loginEmail: loginEmail });

    if (!existingUser) {
      return res.status(404).send({ message: "User not found" });
    }
    
    const hashedPassword = await bcrypt.hash(loginPassword, 10);
    existingUser.loginPassword = hashedPassword

    await existingUser.save()
    res.status(202).send({ message: "Data has been updated", data: existingUser });
  } catch (error) {
    return res.status(500).send({ message: "error", error: error });
  }
};
