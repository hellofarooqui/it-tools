import Device from "../models/Device.js";

export const getAllDevices = async (req, res) => {
  try {
    const q = req.query.q;
    if (q == "count") {
      const deviceCount = await Device.estimatedDocumentCount();
      return res.status(200).json({ deviceCount });
    }
    const devices = await Device.find().populate(["deviceType"]);
    res.status(200).json(devices);
  } catch (error) {
    console.error("Error fetching devices:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
export const getDeviceById = async (req, res) => {
  try {
    const { deviceId } = req.params;
    const device = await Device.findById(deviceId).populate(["deviceType"]);
    if (!device) {
      return res.status(404).json({ error: "Device not found" });
    }
    return res.status(200).json(device);
  } catch (error) {
    console.log("Get Device By ID");
    console.error("Error fetching device:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
export const createDevice = async (req, res) => {
  console.log("Request body:", req.body);
  try {
    const { deviceType, deviceName, deviceSerialNumber, vendor, notes, image } =
      req.body;
    const newDevice = new Device({
      deviceType,
      deviceName,
      deviceSerialNumber,
      notes,
      image,
      vendor
    });
    await newDevice.save();
    res.status(201).json(newDevice);
  } catch (error) {
    console.error("Error creating device:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
export const updateDevice = async (req, res) => {
  try {
    const { deviceId } = req.params;
    const { deviceName, deviceSerialNumber, notes, image } = req.body;
    const updatedDevice = await Device.findByIdAndUpdate(
      deviceId,
      { deviceName, deviceSerialNumber, notes, image },
      { new: true }
    );
    if (!updatedDevice) {
      return res.status(404).json({ error: "Device not found" });
    }
    res.status(200).json(updatedDevice);
  } catch (error) {
    console.error("Error updating device:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
export const deleteDevice = async (req, res) => {
  try {
    const { deviceId } = req.params;
    const deletedDevice = await Device.findByIdAndDelete(deviceId);
    if (!deletedDevice) {
      return res.status(404).json({ error: "Device not found" });
    }
    res.status(200).json({ message: "Device deleted successfully" });
  } catch (error) {
    console.error("Error deleting device:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
export const searchDevices = async (req, res) => {
  try {
    const { query } = req.query;
    console.log("Search query:", query);
    if (!query) {
      return res.status(400).json({ error: "Query parameter is required" });
    }
    const devices = await Device.find({
      $or: [
        { deviceName: { $regex: query, $options: "i" } },
        { deviceSerialNumber: { $regex: query, $options: "i" } },
      ],
    });
    res.status(200).json(devices);
  } catch (error) {
    console.error("Error searching devices:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
