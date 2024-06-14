const jwt = require('jsonwebtoken');
const { User } = require('../models');

exports.register = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).send(user);
    } catch (error) {
        res.status(400).send(error);
    }
};

exports.login = async (req, res) => {
    try {
        const user = await User.findOne({ where: { username: req.body.username } });

        if (!user || !(await user.comparePassword(req.body.password))) {
            return res.status(401).send({ message: 'Invalid username or password' });
        }

        const token = jwt.sign({ id: user.id }, process.env.SECRET, { expiresIn: 86400 });
        res.send({ auth: true, token });
    } catch (error) {
        res.status(500).send(error);
    }
};
