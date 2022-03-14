const express = require('express');
const router = express.Router();
const Schemas = require('../models/Schemas');

// router.get('/owners', (req, res) => {
//   const owners = Schemas.owners;

//   const realOwners = owners.populate('pets').exec((err, ownerData) => {
//     if (err) {
//       res.send(err);
//       console.log(err);
//     } else {
//       console.log(ownerData);
//       res.json(ownerData);
//     }
//     if (ownerData) {
//       res.end(JSON.stringify(ownerData));
//     } else {
//       res.send('No pets found');
//     }
//   });
// });

router.get('/pets', async (req, res) => {
  const pets = Schemas.pets;

  //   const ownerPets = await pets.find({}, (err, petData) => {
  const ownerPets = await pets
    .find({})
    .populate('owner')
    .exec((error, petData) => {
      if (error) {
        res.end('Error getting pets');
        console.log(error);
      } else {
        // console.log(petData);
        res.json(petData);
      }
      if (petData) {
        // res.end(JSON.stringify(petData));
        console.log('Pets found');
      } else {
        // console.log('No pets found');
        res.end('Pets not found');
      }
    });
});

router.post('/handleSubmit', async (req, res) => {
  // handle Owner data
  const owner = {
    name: req.body.ownerName,
    tel: req.body.tel,
    email: req.body.email,
  };
  const newOwner = new Schemas.owners(owner);

  try {
    await newOwner.save(async (err, newUserResult) => {
      if (err) {
        console.log(err);
      } else {
        console.log('New owner created');
        res.redirect('/lostpet');
        res.end('New owner created');
      }
    });
  } catch (err) {
    console.log(err);
    res.redirect('/');
    res.end('Error creating owner');
  }

  // handle Pet data
  const pet = {
    name: req.body.petName,
    details: req.body.details,
    lost_date: req.body.lostDate,
  };
  const pet_owner = newOwner;
  // const ownerId = await pet_owner.findOne({ name: 'John Smith' }).exec();
  // const ownerId = await owners.exec();

  const newPet = new Schemas.pets({
    name: pet.name,
    details: pet.details,
    lost_date: pet.lost_date,
    owner: pet_owner._id,
  });

  try {
    await newPet.save((err, newPetResult) => {
      if (err) console.log(err);
      else {
        console.log('New pet created');
        res.redirect('/lostpet');
        res.end('New pet created');
      }
    });
  } catch (err) {
    console.log(err);
    redirect('/');
    res.end();
  }
});

module.exports = router;
