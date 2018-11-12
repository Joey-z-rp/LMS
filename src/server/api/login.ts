import bcrypt from 'bcrypt';
import User from '../models/User';

// const SALT_ROUNDS = 10;

// export const registerUser = async (req, res) => {
//     console.log(req.body);
//
//     const user = new User({
//         name: 'Anton Strickland',
//         email: 'admin@gmail.com',
//         password: await bcrypt.hash('password', SALT_ROUNDS),
//         phone: '0456712342',
//         admin: true,
//         image: 'http://kotlijobs.com/images/admin3.png',
//     });
//
//     const result = await user.save();
//
//     res.json(result);
// };

export const login = async (req, res) => {
    const user = await User.findOne({ email: req.body.email });

    let status = 'failed';

    if (user) {
        const match = await bcrypt.compare(req.body.password, user.password);
        if (match) {
            status = 'successful';
            user.password = undefined;
            req.session.user = user;
            await new Promise((resolve, reject) => {
                req.session.save((err) => {
                    if (err) return reject(err);
                    return resolve();
                });
            });
        }
    }

    res.json({ status });
};
