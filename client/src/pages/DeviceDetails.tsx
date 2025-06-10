import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useDevices from "../hooks/useDevices";
import { Button } from "../components/ui/button";

interface Device {
  _id: string | null;
  deviceType: string;
  deviceName: string | null;
  deviceSerialNumber: string | null;
  image: string | null;
}

const DeviceDetails = () => {
  const params = useParams();
  const deviceId = params.deviceId;

  const [device, setDevice] = React.useState<Device | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");
  const navigate = useNavigate();
  const { getDeviceDetails, deleteDevice } = useDevices();
  useEffect(() => {
    const fetchDevice = async () => {
      try {
        const response = await getDeviceDetails(deviceId);
        if (response) {
          //console.log(response);
          setDevice(response);
          setLoading(false);
          setError("");
        } else {
          console.error("Error fetching device details");
          setError("Error fetching device details");
        }
      } catch (error) {
        console.error("Error fetching device details", error);
        setError("Error fetching device details");
      }
    };
    fetchDevice();
  }, [deviceId]);

  const handleDeviceDelete = async (device: Device) => {
    const deviceId = device._id;
    try {
      const response = await deleteDevice(deviceId);
      if (response) {
        console.log(response);
        navigate(-1);
        setLoading(false);
        setError("");
      } else {
        console.error("Error deleting device");
        setError("Error deleting device");
      }
    } catch (error) {
      console.error("Error deleting device", error);
      setError("Error deleting device");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h2 className="font-bold text-2xl">Loading...</h2>
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h2 className="font-bold text-2xl">Error: {error}</h2>
      </div>
    );
  }
  return (
    <div className="">
      <div className="w-full bg-white flex justify-between items-center p-4 shadow-sm">
        <h2 className="font-bold text-2xl">Device Details</h2>
        <div className="flex gap-x-2">
          <Button variant="outline" onClick={() => navigate("edit")}>
            Edit
          </Button>
          <Button onClick={() => handleDeviceDelete(device)}>Delete</Button>
        </div>
      </div>
      <div className="p-8">

     
      <div className=" bg-white shadow-md  p-6 rounded-lg flex justify-between items-center gap-x-4">
        <div className="flex-1 text-gray-600  mt-4 flex flex-col gap-y-6">
          <div className="">
            <h3 className="font-bold">Device Type</h3>
            <p className="text-sm">{device.deviceType.name}</p>
          </div>
          <div className="">
            <h3 className="font-bold">Device Name</h3>
            <p className="text-sm">{device.deviceName}</p>
          </div>
          <div>
            <h3 className="font-bold">Device Serial Number</h3>
            <p className="text-sm">{device.deviceSerialNumber}</p>
          </div>
          <div>
            <h3 className="font-bold">Notes</h3>
            <p className="text-sm">{device.notes ? device.notes : "NA"}</p>
          </div>
        </div>
        <div className="w-[30%] h-36 object-contain flex justify-center items-start border rounded-md">
          {device.image && <img src={device.image} alt={`${device.deviceName} Image`} />}
        </div>
      </div>

      <div className="mt-8 mb-2 p-8">
        <h2 className="font-bold text-xl">Device Tickets</h2>
        <div>
          <p className="text-gray-600">No tickets yet</p>
        </div>
      </div>
       </div>
    </div>
  );
};

export default DeviceDetails;
