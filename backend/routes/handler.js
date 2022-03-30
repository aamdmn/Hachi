const express = require('express');
const router = express.Router();
const Schemas = require('../models/Schemas');

router.get('/pets', (req, res) => {
  const pets = Schemas.pets;

  pets
    .find({})
    .populate('owner')
    .populate('map')
    .populate('image')
    .exec((error, petData) => {
      if (error) {
        res.end('Error getting pets');
        console.log(error);
      } else {
        res.json(petData);
      }
      if (!petData) {
        console.log('Pets not found');
      }
    });
});
router.get('/pets/:id', (req, res) => {
  const pets = Schemas.pets;

  pets
    .find({ _id: req.params.id })
    .populate('owner')
    .populate('map')
    .populate('image')
    .exec(async (error, petData) => {
      if (error) {
        res.end('Error getting pets');
        console.log(error);
      } else {
        res.json(petData);
      }
      if (!petData) {
        console.log('Pets not found');
      }
    });
});

router.post('/handleSubmit', async (req, res) => {
  //owner data

  const owner = {
    name: req.body.ownerName,
    tel: req.body.tel,
    email: req.body.email,
  };
  const newOwner = await new Schemas.owners(owner);

  // map data

  const map = {
    lat: req.body.lat,
    lng: req.body.lng,
  };

  const newMap = await new Schemas.maps(map);

  // image data
  const image = {
    image: req.body.image,
  };

  const newImage = await new Schemas.images(image);

  //pet data

  const pet = {
    name: req.body.petName,
    details: req.body.details,
    lost_date: req.body.lostDate,
  };

  const pet_owner = newOwner;
  const map_cor = newMap;
  const pet_images = newImage;

  const newPet = await new Schemas.pets({
    name: pet.name,
    details: pet.details,
    lost_date: pet.lost_date,
    owner: pet_owner._id,
    map: map_cor._id,
    image: pet_images._id,
  });

  const handleOwner = async (req, res) => {
    try {
      await newOwner.save(async (err, newUserResult) => {
        if (err) {
          console.log(err);
        } else {
          console.log('New owner created');
        }
      });
    } catch (err) {
      console.log(err);
      res.redirect('/');
    }
  };

  async function handleMap(req, res) {
    try {
      await newMap.save(async (err, newMapResult) => {
        if (err) {
          console.log(err);
        } else {
          console.log('New map created');
        }
      });
    } catch (err) {
      console.log(err);
    }
  }

  async function handleImage(req, res) {
    try {
      await newImage.save(async (err, newImageResult) => {
        if (err) {
          console.log(err);
        } else {
          console.log('Images stored');
        }
      });
    } catch (err) {
      console.log(err);
    }
  }

  async function handlePet(req, res) {
    try {
      await newPet.save((err, newPetResult) => {
        if (err) console.log(err);
        else {
          console.log('New pet created');
          res.redirect('/map');
        }
      });
    } catch (err) {
      console.log(err);
      res.end();
    }
  }

  //handle Owner data
  handleOwner(req, res);

  //handle Map data
  handleMap(req, res);

  //handle Image data
  handleImage(req, res);

  //handle Pet data
  handlePet(req, res);
});

module.exports = router;
