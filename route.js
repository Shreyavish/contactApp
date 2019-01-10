const express = require('express');
const router  = express.Router();

const Contact = require('../contactlist/models/contacts');

//retrieving contacts
router.get('/contacts',(req,res)=>{
   //res.send('Retrieving the contact list');
    Contact.find(function(err,contact){
    res.send(contact);
    return;
    })
});

//add contacts-post method

router.post('/contacts',(req,res,next)=>{
//logic 
let newContact = new Contact({

    first_name : req.body.first_name,
    last_name: req.body.last_name,
    phone:req.body.phone
});

newContact.save((err,contact)=>{
    if(err){
        res.send({msg:'failed to add contact'});
    }
    else{
        res.send({msg:'added'});
    }

});

});

router.delete('/contacts/:id',(req,res,next)=>{
    Contact.remove({_id: req.params.id}, function(err,result){

        if(err){
            res.send('error in deleting '+ err);
        }
        else{
            res.send('succesfully deleted');
        }
    });


});


module.exports = router;