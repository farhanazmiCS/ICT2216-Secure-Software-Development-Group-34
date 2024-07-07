const express = require('express');
const router = express.Router();
const {
  authenticateUser,
  authorizePermissions,
} = require('../middleware/authentication');
const {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
  updateUserRole,
} = require('../controllers/userController');

router.get('/', authenticateUser, authorizePermissions('admin'), getAllUsers);
router.get('/showMe', authenticateUser, showCurrentUser);
router.patch('/updateUser', authenticateUser, updateUser);
router.patch('/updateUserPassword', authenticateUser, updateUserPassword);

// Route for updating user role by ID (admin only)
router.patch('/:id/role', authenticateUser, authorizePermissions('admin'), updateUserRole);

router.get('/:id', authenticateUser, getSingleUser);

module.exports = router;
