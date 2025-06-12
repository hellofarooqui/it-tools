import { useEffect, useState } from "react";
import useDevices from "../../hooks/useDevices";
import { Loader2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Button } from "../ui/button";

const ListDeviceTypes = () => {
  const { getAllDeviceTypes } = useDevices();
  const [deviceTypes, setDeviceTypes] = useState([]);
  const [showDeviceTypeDetails, setShowDeviceTypeDetails] = useState(false);
  const [deviceTypeDetailsCard, setDeviceTypeDetailsCard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const handleDeviceDetailsButton = (deviceType) => {
    setShowDeviceTypeDetails(!showDeviceTypeDetails);
    setDeviceTypeDetailsCard(deviceType)
  };

  const fetchDeviceTypes = async () => {
    try {
      // Fetch device types from the API
      const response = await getAllDeviceTypes();
      if (response) {
        console.log("Device Types:", response);
        setDeviceTypes(response);
      } else {
        console.error("Error fetching device types");
      }
    } catch (error) {
      console.error("Error fetching device types", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDeviceTypes();
  }, []);

  if (loading) {
    return <Loader2 className="animate-spin" />;
  }

  if (error) {
    return <p>{error}</p>;
  }
  return (
    <div className="p-4 mb-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5  gap-x-4 gap-y-4">
      {deviceTypes.map((type) => (
        <div
          className="flex flex-col justify-between gap-y-2 bg-white p-6 rounded-[12px] shadow-sm hover:shadow-lg hover:scale-101 border group transition-all ease-in-out duration-300"
          id={type._id}
        >
          <p className="text-xl font-semibold">{type.name}</p>
          <p className="text-sm line-clamp-2 text-gray-500">
            {type.description}
          </p>
          <Button
            onClick={()=>handleDeviceDetailsButton(type)}
            className="bg-gray-700 mt-4 font-bold transition-all ease-in-out duration-300"
          >
            Details
          </Button>
        </div>
      ))}
      {showDeviceTypeDetails && (
        <div className="absolute w-screen h-screen bg-gray-800/50 top-0 left-0 flex justify-center items-center">
          <div className="bg-white p-8 rounded-md w-[400px] flex flex-col gap-y-6">
            <p className="text-2xl font-bold">{deviceTypeDetailsCard.name}</p>
            <p className="text-lg  text-gray-700">{deviceTypeDetailsCard.description}</p>
            <Button onClick={()=>setShowDeviceTypeDetails(false)} className="text-lg font-bold">Close</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListDeviceTypes;
