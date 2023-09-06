const stripe = require('stripe')('sk_test_51NTdrxSC3lUfyefa8GSZ6oFaTELhX0YsnJVzKbZUpVpAqKAsHYXn7f0YqTBR0yo2muOvDhFOu24XyEKZoyyg3s1b00G5YNgym0');

exports.Payment = async (req, res) => {
    console.log(req.body.Token)
    const { price, Token} = req.body;

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: price*100,
            currency: 'inr',
            description: "Cart Items",
            payment_method_types: ['card'],
            receipt_email: Token.email,
        });

        res.json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        console.error('Error creating Payment Intent:', error);
        res.status(500).json({ error: 'An error occurred while creating the Payment Intent.' });
    }
};
