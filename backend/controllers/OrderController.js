const Stripe = require('stripe');
const Order = require('../models/Order');
const User = require('../models/User');
require('dotenv').config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const OrderController = {
    index : async (req, res) => {
        try {
            let orders = await Order.find().sort({ createdAt : -1});
            return res.json(orders);
        } catch (e) {
            console.error(e);
            return res.json({msg : 'Error'});
        }
    },
    placeOrder : async (req, res) => {

        const frontend_url = "http://localhost:5173"

        try {
            const newOrder = new Order({
                userId : req.body.userId,
                items : req.body.items,
                amount : req.body.amount,
                address : req.body.address
            })
            await newOrder.save();
            await User.findByIdAndUpdate(req.body.userId , {cartData : {}});

            const line_items = req.body.items.map((item) => ({
                price_data : {
                    currency : 'usd',
                    product_data : {
                        name : item.name
                    },
                    unit_amount : item.price * 100 
                },
                quantity : item.quantity
            }))

            line_items.push({
                price_data : {
                    currency : 'usd',
                    product_data : {
                        name : 'Delivery Charges'
                    },
                    unit_amount : 2 * 100 
                },
                quantity : 1    
            })

            const session = await stripe.checkout.sessions.create({
                line_items : line_items,
                mode : 'payment',
                success_url : `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
                cancel_url : `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
            })

            return res.json({msg : 'success', session_url : session.url})

        } catch (e) {
            console.error(e);
            return res.json({msg : 'Error'});
        }
    },
    verifyOrder : async(req, res) => {
        try {
            const { orderId, success } = req.body;
            if(success === 'true') {
                await Order.findByIdAndUpdate(orderId , {payment : true}); 
                return res.json({ msg : 'Paid'});  
            }
            else {
                await Order.findByIdAndDelete(orderId);
                return res.json({ msg : 'Not Paid'});
            }
        } catch (e) {
            console.error(e);
            return res.json({ msg : 'Error'});
        }
    },
    userOrders : async(req, res) => {
        try {
            const orders = await Order.find({ userId : req.body.userId})
            return res.json(orders);
        } catch (e) {
            console.error(e);
            return res.json({ msg : 'Error'});
        }
    },
    updateStatus : async(req, res) => {
        try {
            let { orderId, status } = req.body;
            await Order.findByIdAndUpdate(orderId, { status });
            return res.json({msg : 'updated status'})
        } catch (e) {
            console.error(e);
            return res.json({ msg : 'Error'});
        }
    }
}

module.exports = OrderController;