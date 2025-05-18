import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useDevices from "../hooks/useDevices";
import { Button } from "../components/ui/button";

const DeviceDetails = () => {
  const params = useParams();
  const deviceId = params.deviceId;

  const [device, setDevice] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");
  const navigate = useNavigate();
  const { getDeviceDetails, deleteDevice } = useDevices();
  useEffect(() => {
    const fetchDevice = async () => {
      try {
        const response = await getDeviceDetails(deviceId);
        if (response) {
          console.log(response);
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

  const handleDeviceDelete = async (device) => {
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
    <div>
      <div className="w-full flex justify-between items-center">
        <h2 className="font-bold text-2xl">Device Details</h2>
        <div className="flex gap-x-2">
            <Button variant="outline" onClick={()=>navigate("edit")}>Edit</Button>
            <Button  onClick={()=>handleDeviceDelete(device)}>Delete</Button>
        </div>
      </div>
      <div className="flex justify-between items-center gap-x-4">
        <div className="flex-1 bg-white shadow-md rounded-lg p-4 mt-4 flex flex-col gap-y-8">
          <div className="">
            <h3 className="font-bold text-lg">Device Name</h3>
            <p>{device.deviceName}</p>
          </div>
          <div>
            <h3 className="font-bold text-lg">Device Serial Number</h3>
            <p>{device.deviceSerialNumber}</p>
          </div>
          <div>
            <h3 className="font-bold text-lg">Notes</h3>
            <p>{device.notes ? device.notes : "NA"}</p>
          </div>
        </div>
        <div className="w-[30%] h-36 object-contain flex justify-center items-start border rounded-md">
          <img src={device.image} alt={`${device.deviceName} Image`} />
        </div>
      </div>

      <div className="mt-8 mb-2">
        <h2 className="font-bold text-2xl">Device Tickets</h2>
        <div>
          <p>No tickets yet</p>
        </div>
      </div>
    </div>
  );
};

export default DeviceDetails;
