const { Product } = require('../models');

exports.create = async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(201).send(product);
    } catch (error) {
        res.status(400).send(error);
    }
};

exports.findAll = async (req, res) => {
    try {
        const products = await Product.findAll();
        res.send(products);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.findOne = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) {
            return res.status(404).send({ message: 'Product not found' });
        }
        res.send(product);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.update = async (req, res) => {
    try {
        const [updated] = await Product.update(req.body, { where: { id: req.params.id } });
        if (!updated) {
            return res.status(404).send({ message: 'Product not found' });
        }
        res.send({ message: 'Product updated' });
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.delete = async (req, res) => {
    try {
        const deleted = await Product.destroy({ where: { id: req.params.id } });
        if (!deleted) {
            return res.status(404).send({ message: 'Product not found' });
        }
        res.send({ message: 'Product deleted' });
    } catch (error) {
        res.status(500).send(error);
    }
};
