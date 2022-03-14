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
});

const Owners = mongoose.model('owners', ownerSchema);
const Pets = mongoose.model('pets', petSchema);
const mySchema = { owners: Owners, pets: Pets };

module.exports = mySchema;
