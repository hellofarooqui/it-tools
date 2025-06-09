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

const ListDeviceTypes = () => {
  const { getAllDeviceTypes } = useDevices();
  const [deviceTypes, setDeviceTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
    <div>
      <Table className="border rounded-[20px] overflow-hidden">
        <TableHeader className="bg-gray-800">
          <TableRow>
            <TableHead className="text-white pl-6">Name</TableHead>
            <TableHead className="text-white">Description</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {deviceTypes.map((type) => (
            <TableRow id={type._id}>
              <TableCell className="pl-6">{type.name}</TableCell>
              <TableCell>{type.description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ListDeviceTypes;
