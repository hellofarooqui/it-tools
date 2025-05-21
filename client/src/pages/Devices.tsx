import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./../components/ui/table";

import { Button } from "../components/ui/button";
import { FilePenLine, FileText, Loader2, Trash2 } from "lucide-react";
import useDevices from "../hooks/useDevices.js";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import CustomTooltip from "../components/custom/CustomToolTip.js";

const storageLocation = "http://localhost:3000";

interface Device {
  _id: string;
  deviceName: string;
  deviceSerialNumber: string;
  image: string;
}

const Devices = () => {
  const [devices, setDevices] = useState<Device[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { getAllDevices, deleteDevice } = useDevices();

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const response = await getAllDevices();
        if (response) {
          console.log(response);
          setDevices(response);
          setLoading(false);
          setError("");
        } else {
          console.error("Error fetching devices");
          setError("Error fetching devices");
        }
      } catch (error) {
        console.error("Error fetching devices", error);
        setError("Error fetching devices");
      }
    };
    fetchDevices();
  }, []);

  const handleEditDevice = (device: Device) => {
    console.log("edit device");
    //navigate({ pathname: `/devices/${device._id}/edit` , state: {data: device}})
    navigate(`/devices/${device._id}/edit`, { state: { data: device } });
  };

  const handleDeleteDevice = async (device: Device) => {
    const deviceId = device._id;
    try {
      const response = await deleteDevice(deviceId);
      if (response) {
        console.log(response);
        setDevices(devices.filter((device) => device._id !== deviceId));
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
        <h2 className="font-bold text-2xl">
          <Loader2 className="animate-spin" />
        </h2>
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
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold text-2xl">Devices</h2>
        <Button onClick={() => navigate("new")}>Create New</Button>
      </div>

      {/* Add your device management components here */}

      <Table>
        <TableHeader>
          <TableRow className="bg-gray-800 hover:bg-gray-700">
            <TableHead className="text-white">Device</TableHead>
            <TableHead className="text-white">Name</TableHead>
            <TableHead className="text-white">Serial Number</TableHead>
            <TableHead className="text-white">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {devices.map((device) => (
            <TableRow key={device._id} className=" h-16">
              <TableCell className="text-gray-700">
                {device.image && (
                  <img
                    src={`${storageLocation}/${device.image}`}
                    className="w-32 h-12"
                  />
                )}
              </TableCell>
              <TableCell className="text-gray-700">
                {device.deviceName}
              </TableCell>
              <TableCell className="text-gray-700 ">
                {device.deviceSerialNumber}
              </TableCell>
              <TableCell className="text-gray-700">
                <CustomTooltip content="Details">
                <Button variant="outline" size="icon">
                  <Link
                    to={`/devices/${device._id}`}
                    state={{ data: device }}
                    key={device._id}
                  >
                    <FileText />
                  </Link>
                </Button>
                </CustomTooltip>
                <CustomTooltip content="Edit">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleEditDevice(device)}
                >
                  <FilePenLine />
                </Button>
                </CustomTooltip>
                <CustomTooltip content="Delete">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleDeleteDevice(device)}
                >
                  <Trash2 />
                </Button>
                </CustomTooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Devices;
