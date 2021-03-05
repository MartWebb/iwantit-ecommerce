import express, { request } from 'express';
import expressAsyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import generateToken from '../utils/generateToken.js';
import isAuth from '../utils/isAuth.js';

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
                isAdmin: user.isAdmin,
                token: generateToken(user)
            });
            return;
        }
    }
    res.status(401).send({ message: 'Invalid email or password'});
}));

// @desc   Register a new user
// @route  POST /api/users
// @access Public
router.post('/register', expressAsyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    };

    const user = await User.create({
        name,
        email,
        password
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user)
        })
    } else {
        res.status(404);
        throw new Error('Invalid user data');
    }
}));

router.get('/:id', expressAsyncHandler( async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
        res.send(user);
    } else {
        res.status(404).send({ message: "User not found" });
    }
}));

router.put('/profile', isAuth, expressAsyncHandler( async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if (req.body.password) {
            user.password = bcrypt.hashSync(req.body.password, 8);
        }
        const updatedUser = await user.save();
        res.send({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(updatedUser)
        });
    }
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