import mongoose from 'mongoose';

const DeviceSchema = new mongoose.Schema({
  deviceType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'DeviceType',
    required: true,
  },
  deviceName: {
    type: String,
    required: true,
  },
  deviceSerialNumber: {
    type: String,
    required: true,
  },
  notes: {
    type: String,
    
  },
  image:{
    type: String,
  },
  addedOn:{
    type: Date,
    default: Date.now,
  }
},{timestamps:true});

DeviceSchema.index({ deviceName: 1, deviceSerialNumber: '1' });



const Device = mongoose.model('Device', DeviceSchema);
export default Device;

