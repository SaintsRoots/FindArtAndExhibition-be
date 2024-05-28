import * as cartService from '../services/cart.services';

export const addItem = async (req, res) => {
    try {
        const { quantity } = req.body;
        const { productId } = req.params;
        const userId = req.User._id;

        const cart = await cartService.addItemToCart(userId, productId, quantity);
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const removeItem = async (req, res) => {
    try {
        const { productId } = req.params;
        const userId = req.User._id;

        const cart = await cartService.removeItemFromCart(userId, productId);
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateItem = async (req, res) => {
    try {
        const { quantity } = req.body;
        const { productId } = req.params;
        const userId = req.User._id;

        const cart = await cartService.updateItemQuantity(userId, productId, quantity);
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getCart = async (req, res) => {
    try {
        const userId = req.User._id;

        const cart = await cartService.getCart(userId);
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const completeCart = async (req, res) => {
    try {
        const userId = req.User._id;

        const cart = await cartService.completeCart(userId);
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// delete cart
export const deleteCart = async (req, res) => {
    try {
        const { id } = req.params;

        const cart = await cartService.deleteCart(id);
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

