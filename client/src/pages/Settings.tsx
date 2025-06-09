import React from "react";
import { Button } from "../components/ui/button";
import axios from "axios";
import useDevices from "../hooks/useDevices";

const Settings = () => {
    const {getAllDeviceTypes } = useDevices();
    const [deviceTypes, setDeviceTypes] = React.useState([]);

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
        }
    };
  return (
    <div className="">
      <div className="w-full bg-white flex justify-between items-center p-4 shadow-sm">
        <h2 className="font-bold text-2xl">Settings</h2>
      </div>

      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Device Types</h2>
          <Button>Add New</Button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
