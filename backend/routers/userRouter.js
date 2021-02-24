import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import generateToken from '../utils/generateToken.js';

const router  = new express.Router();

// router.get('/seed', async (req, res) => {
//     const createdUsers = await User.insertMany(data);
// });

// @desc   Auth user & get token
// @route  POST /api/users/login
// @access Public

router.post('/login', expressAsyncHandler(async(req, res) => {
    const user = await User.findOne({email: req.body.email});
    if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
            res.send({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdin: user.isAdmin,
                token: generateToken(user)
            });
            return;
        }
    }
    res.status(401).send({ message: 'Invalid email or password'});
}));

export default router;



// import express from 'express';
// const router = express.Router();
// import { authUser, registerUser, getUserProfile, updateUserProfile, getUsers, deleteUser, getUserById, updateUser } from '../controllers/userController.js';
// import { protect, admin } from '../middleware/authMiddleware.js';

// router.route('/').post(registerUser).get(protect, admin, getUsers);
// router.post('/login', authUser);
// router
//     .route('/profile')
//     .get(protect, getUserProfile)
//     .put(protect, updateUserProfile);
// router
//     .route('/:id')
//     .delete(protect, admin, deleteUser)
//     .get(protect, admin, getUserById)
//     .put(protect, admin, updateUser);

// export default router