
import express, { Router } from 'express';
import { updateEmailValidator, updatePasswordValidator, userForgotPassword, userLoginValidator, userRegisterValidator, userResetPassword, userValidateEmailValidator } from '../middlewares/validators/authValidators';
import { checkUserName, forgotPassword, login, logoutHandler, protect, refreshAccessToken, register, resendValidationEmail, resetPassword, updateEmail, updatePassword, validateEmail } from '../controllers/authController'
import { getUser, updateMe } from '../controllers/userController';

const router: Router = express.Router();

// Auth 🔐
router.post('/auth/register', userRegisterValidator, register);
router.post('/auth/login', userLoginValidator, login);
router.get('/auth/refresh-token', refreshAccessToken);
router.post('/auth/resend-validation-email', protect, resendValidationEmail);
router.patch('/auth/validate-email', protect, userValidateEmailValidator, validateEmail);
router.patch('/auth/forgot-password', userForgotPassword, forgotPassword);
router.patch('/auth/reset-password', userResetPassword, resetPassword);
router.patch('/auth/update-password', updatePasswordValidator, protect, updatePassword)
router.patch('/auth/update-email', updateEmailValidator, protect, updateEmail)
router.get('/auth/username', checkUserName)
router.get('/auth/logout', logoutHandler)


// User data
router.get('/:username', getUser)
router.patch('/update-me', protect, updateMe)

export default router;
