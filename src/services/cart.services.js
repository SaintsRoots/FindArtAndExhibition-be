import Cart from '../models/cart.model';
import Arts from '../models/arts.model';

// Add item to Cart
export const addItemToCart = async (userId, productId, quantity) => {
    try {
        // Fetch the product details from the Arts model
        const productDetails = await Arts.findById(productId);

        if (!productDetails) {
            return 'Product not found';
        }

        const product = productDetails._id;
        const price = productDetails.price;
        let availableQuantity = productDetails.available_arts;

        // Validate quantity
        const quantityInt = parseInt(quantity, 10);
        if (isNaN(quantityInt) || quantityInt <= 0) {
            return 'Invalid quantity';
        }

        // Check if the requested quantity exceeds the available quantity
        if (quantityInt > availableQuantity) {
            return 'Quantity exceeds available stock';
        }

        // Fetch the user's active cart
        const cart = await Cart.findOne({ user: userId, status: 'active' });

        if (!cart) {
            const newCart = await Cart.create({
                user: userId,
                items: [{ product, quantity: quantityInt, price }],
                totalPrice: quantityInt * price,
                totalItems: quantityInt,
            });
            return newCart;
        }

        const existingItem = cart.items.find(item => item.product.equals(product));
        if (existingItem) {
            if (existingItem.quantity + quantityInt > availableQuantity) {
                return 'Quantity exceeds available stock';
            }
            existingItem.quantity += quantityInt;
            existingItem.price = price;
        } else {
            if (quantityInt > availableQuantity) {
                return 'Quantity exceeds available stock';
            }
            cart.items.push({ product, quantity: quantityInt, price });
        }

        // Recalculate totalPrice to ensure accuracy
        cart.totalPrice = cart.items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
        cart.totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);

        // Save the updated cart
        await cart.save();

        return cart;
    } catch (error) {
        console.error(error);
        return 'An error occurred while adding the item to the cart';
    }
};

export const removeItemFromCart = async (userId, productId) => {
    try {
        const cart = await Cart.findOne({ user: userId, status: 'active' });
        if (!cart) return 'Cart not found';

        const itemIndex = cart.items.findIndex(item => item.product.equals(productId));
        if (itemIndex === -1) return 'Item not found in cart';

        const item = cart.items[itemIndex];
        cart.totalPrice -= item.quantity * item.price;
        cart.totalItems -= item.quantity;

        cart.items.splice(itemIndex, 1);
        await cart.save();
        return cart;
    } catch (error) {
        console.error(error);
        return 'An error occurred while removing the item from the cart';
    }
};

// Update item quantity in the cart
export const updateItemQuantity = async (userId, productId, newQuantity) => {
    try {
        // Validate the new quantity
        const quantityInt = parseInt(newQuantity, 10);
        if (isNaN(quantityInt) || quantityInt <= 0) {
            return 'Invalid quantity';
        }

        // Fetch the product details to get available stock
        const productDetails = await Arts.findById(productId);
        if (!productDetails) {
            return 'Product not found';
        }
        const availableQuantity = productDetails.available_arts;

        // Fetch the user's active cart
        const cart = await Cart.findOne({ user: userId, status: 'active' });
        if (!cart) {
            return 'Cart not found';
        }

        const item = cart.items.find(item => item.product.equals(productId));
        if (!item) {
            return 'Item not found in cart';
        }

        // Check if the new quantity exceeds the available stock
        if (quantityInt > availableQuantity) {
            return 'Quantity exceeds available stock';
        }

        // Update totalPrice and totalItems
        cart.totalPrice += (quantityInt - item.quantity) * item.price;
        cart.totalItems += (quantityInt - item.quantity);

        // Update item quantity
        item.quantity = quantityInt;

        // Save the updated cart
        await cart.save();

        return cart;
    } catch (error) {
        console.error(error);
        return 'An error occurred while updating the item quantity in the cart';
    }
};

export const getCart = async (userId) => {
    try {
        const cart = await Cart.findOne({ user: userId, status: 'active' }).populate('items.product').sort({ createdAt: -1 });
        if (!cart) return 'Cart not found';
        return cart;
    } catch (error) {
        console.error(error);
        return 'An error occurred while fetching the cart';
    }
};

export const completeCart = async (userId) => {
    try {
        const cart = await Cart.findOne({ user: userId, status: 'active' });
        if (!cart) return 'Cart not found';

        cart.status = 'completed';
        await cart.save();
        return cart;
    } catch (error) {
        console.error(error);
        return 'An error occurred while completing the cart';
    }
};

export const deleteCart = async (cartId) => {
    try {
        const cart = await Cart.findById(cartId);
        if (!cart) return 'Cart not found';
        await Cart.findByIdAndDelete(cartId);
        return 'Cart deleted successfully';
    } catch (error) {
        console.error(error);
        return 'An error occurred while deleting the cart';
    }
};
