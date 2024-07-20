// Importing services
import * as UserService from "../services/users.services"
import { sendEmailAdminApproveArts, sendEmailApproveArts, sendWelcomeEmailToAdmin } from "../utils/emailTemplate";
import generateToken from "../utils/generateToken";
import { validateCreateUser, validateUpdateUser, validateForgotPassword, validateResetPassword, ValidateChangePassword } from "../validations/users.validation";
// getAllUsers controller
export const getAllUsers = async (req, res) => {
  try {
    const users = await UserService.findAllUsers();
    res.status(200).json({
      status: "200",
      message: "Account Retrieved Successfully",
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      status: "500",
      message: "Failed to Retrieve Account",
      error: error.message,
    });
  }
};

// getOneUser controller
export const getOneUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserService.findUserById(id);
    if (!user) {
      return res.status(404).json({
        status: "404",
        message: "User Id Not Found",
      });
    }
    res.status(200).json({
      status: "200",
      message: "Account Retrieved Successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      status: "500",
      message: "Failed to Retrieve Account",
      error: error.message,
    });
  }
};

// createUser controller
export const createUser = async (req, res) => {
  const { error, value } = validateCreateUser(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  try {
    const user = await UserService.createUser(value, req.file);
    res.status(201).json({
      status: "201",
      message: "Account Created Successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      status: "500",
      message: "Failed to Create Account",
      error: error.message,
    });
  }
};

// updateUser controller
export const updateUser = async (req, res) => {
  const { error, value } = validateUpdateUser(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  try {
    const { id } = req.params;
    await UserService.updateUserById(id, value, req.file);
    res.status(200).json({
      status: "200",
      message: "Account Updated Successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "500",
      message: "Failed to Update Account",
      error: error.message,
    });
  }
};

// Approve status change
export const approveStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserService.approveStatusChange(id);
    sendEmailApproveArts(user.email, user.name, user.role, user.updatedAt);
    return res.status(200).json({
      status: "200",
      message: `Account status changed to ${user.status}`,
      user,
    });
  } catch (error) {
    return res.status(500).json({
      status: "500",
      message: "Failed to change account status",
      error: error.message,
    });
  }
};
export const cancelArtistRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserService.cancelArtistRequest(id);
    sendEmailApproveArts(user.email, user.name, user.role, user.updatedAt);
    return res.status(200).json({
      status: "200",
      message: `Account status changed to ${user.status}`,
      user,
    });
  } catch (error) {
    return res.status(500).json({
      status: "500",
      message: "Failed to change account status",
      error: error.message,
    });
  }
};
// Approve status change
export const approveAdminStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserService.approveAdminStatusChange(id);
    sendEmailAdminApproveArts(user.email, user.name,  user.updatedAt);
    return res.status(200).json({
      status: "200",
      message: `Account status changed to ${user.status}`,
      user,
    });
  } catch (error) {
    return res.status(500).json({
      status: "500",
      message: "Failed to change account status",
      error: error.message,
    });
  }
};
// deleteUser controller
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await UserService.deleteUserById(id);
    res.status(200).json({
      status: "200",
      message: "Account Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "500",
      message: "Failed to Delete Account",
      error: error.message,
    });
  }
};

// login controller
export const login = async (req, res) => {
  const { error, value } = validateUpdateUser(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  try {
    const user = await UserService.loginUser(value);
    const token = generateToken(user._id);
    sendWelcomeEmailToAdmin(value.email, user.name)
    res.status(200).json({
      message: "Logged in successfully",
      data: user,
      token,
    });
  } catch (error) {
    res.status(500).json({
      status: "500",
      message: "Failed to login",
      error: error.message,
    });
  }
};

// forgot password controller
export const forgotPassword = async (req, res) => {
  try {
    const { error, value } = validateForgotPassword(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    await UserService.forgotPasswordService(value.email);
    return res.status(200).json({ message: "We sent you Code to reset password on your email" });
  } catch (error) {
    return res.status(500).json({
      status: "500",
      message: "failed to send password reset code on your email",
      error: error.message,
    });
  }
};

// reset password controller
export const resetPassword = async (req, res) => {
  try {
    const { error, value } = validateResetPassword(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    await UserService.resetPasswordService(value.code, value.password, value.confirmPassword);
    return res.status(200).json({
      status: "200",
      message: "Password changed!.. you can now login with new password",
    });

  }
  catch (error) {
    return res.status(500).json({
      status: "500",
      message: "failed to reset password",
      error: error.message,
    });
  }
};

// controller to change password
export const changePassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { error, value } = ValidateChangePassword(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    await UserService.changePassword(id, value);
    return res.status(200).json({
      status: "200",
      message: "Password Updated",
    });
  } catch (error) {
    return res.status(500).json({
      status: "500",
      message: "failed to change password",
      error: error.message,
    });
  }
};