import mongoose from 'mongoose';

const DeviceSchema = new mongoose.Schema({
  deviceName: {
    type: String,
    required: true,
  },
  deviceSerialNumber: {
    type: String,
    required: true,
  }
});

const Device = mongoose.model('Device', DeviceSchema);
export default Device;

