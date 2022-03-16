const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ownerSchema = Schema({
  name: { type: String, required: true },
  tel: { type: String, required: true },
  email: { type: String, required: true },
  entryDate: { type: Date, default: Date.now },
});

const petSchema = Schema({
  name: { type: String, required: true },
  details: { type: String, required: true },
  lost_date: { type: Date, required: true },
  owner: { type: Schema.Types.ObjectId, ref: 'owners' },
  map: { type: Schema.Types.ObjectId, ref: 'maps' },
});

const mapSchema = Schema({
  lat: { type: Number, required: true },
  lng: { type: Number, required: true },
});

const Owners = mongoose.model('owners', ownerSchema);
const Pets = mongoose.model('pets', petSchema);
const Maps = mongoose.model('maps', mapSchema);
const mySchema = { owners: Owners, pets: Pets, maps: Maps };

module.exports = mySchema;
