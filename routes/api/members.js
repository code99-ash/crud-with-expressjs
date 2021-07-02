const express = require('express');
const uuid = require('uuid');
const router = express.Router();
const members = require('../../Members');


// Get all Members
router.get('/', (req, res) => res.json(members));
 
// Get Single Member
router.get('/:id', (req, res) => {
    const id = req.params.id;
    const found = members.some(member => member.id === parseInt(id));

    if(found) {
        return res.json(members.filter(member => member.id === parseInt(id)))
    }

    res.status(400).json({msg: `Member with id ${id} does not exist`})
});

// Create member
router.post('/', (req, res) => {
    const newMember = {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email,
        status: 'active'
    }
    if(!newMember.name || !newMember.email) {
        return res.status(400).json({msg: 'Please include a name and email'});
    }
    members.push(newMember);
    // res.json(members);
    res.redirect('/');
});

// Update member
router.put('/:id', (req, res) => {
    const id = req.params.id;
    const found = members.some(member => member.id === parseInt(id));

    if(found) {
        const updatedMember = req.body;
        members.map(member => {
            if(member.id === parseInt(id)) {
                member.name = updatedMember.name? updatedMember.name : member.name;
                member.email = updatedMember.email? updatedMember.email : member.email;

                res.json({msg: 'Member was update', member})
            }
        });
    }

    res.status(400).json({msg: `Member with id ${id} does not exist`})
});

// Delete Member
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    const found = members.some(member => member.id === parseInt(id));

    if(found) {
        return res.json({ msg: 'Member deleted', members: members.filter(member => member.id !== parseInt(id)) })
    }

    res.status(400).json({msg: `Member with id ${id} does not exist`})
});

module.exports = router;