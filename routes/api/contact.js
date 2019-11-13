const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const Contact = require('../../models/Contacts');
// const Profile = require('../../models/Profile');
const User = require('../../models/User');

// @route   POST api/contacts
// @desc    Create a contact
// @access  Private
router.post(
    '/',
    [
        auth,
        [
            check('contactName', 'contact name is required')
                .not()
                .isEmpty()
        ]
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            // const user = await User.findById(req.user.id).select('-password');

            const newContact = new Contact({
                contactName: req.body.contactName,
                contactAddress: req.body.contactAddress,
                contactPhoneNumber: req.body.contactPhoneNumber,
                contactEmail: req.body.contactEmail,
                user: req.user.id
            });
            const contact = await newContact.save();

            res.json(contact);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error - Create a contact');
        }
    }
);

// @route   POST api/contacts
// @desc    Get all contacts
// @access  Private
router.get('/', auth, async (req, res) => {
    try {
        const contacts = await Contact.find().sort({ contactName: -1 });
        res.json(contacts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error - Get all contacts');
    }
});

// @route   POST api/contacts/:id
// @desc    Get contact by ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);
        if (!contact) {
            return res.status(404).json({ msg: 'Contact not found' });
        }
        res.json(contact);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Contact not found' });
        }
        res.status(500).send('Server error - Get a contact');
    }
});

// @route   DELETE api/contacts/:id
// @desc    Delete a contact
// @access  Private
router.delete('/:id', auth, async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);

        // Check on contact
        if (!contact) {
            return res.status(404).json({ msg: 'Contact not found' });
        }

        await contact.remove();

        res.json({ msg: 'contact removed' });
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Contact not found' });
        }
        res.status(500).send('Server error - Delete contact');
    }
});

module.exports = router;
