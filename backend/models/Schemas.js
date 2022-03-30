const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ownerSchema = Schema({
  name: { type: String, required: true },
  tel: { type: String, required: true },
  email: { type: String, required: true },
});

const mapSchema = Schema({
  lat: { type: Number, required: true },
  lng: { type: Number, required: true },
});

const imageSchema = Schema({
  image: { type: String, required: true },
});

const petSchema = Schema({
  name: { type: String, required: true },
  details: { type: String, required: true, max: 500 },
  lost_date: { type: Date, required: true },
  owner: { type: Schema.Types.ObjectId, ref: 'owners' },
  map: { type: Schema.Types.ObjectId, ref: 'maps' },
  image: { type: Schema.Types.ObjectId, ref: 'images' },
});

const Owners = mongoose.model('owners', ownerSchema);
const Maps = mongoose.model('maps', mapSchema);
const Images = mongoose.model('images', imageSchema);
const Pets = mongoose.model('pets', petSchema);
// const Images = mongoose.model('images', imageSchema);
const mySchema = { owners: Owners, maps: Maps, images: Images, pets: Pets };

module.exports = mySchema;
