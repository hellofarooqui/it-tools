import React from "react";
import { Button } from "../../components/ui/button";
import axios from "axios";
import useDevices from "../../hooks/useDevices";
import { useNavigate } from "react-router-dom";
import ListDeviceTypes from "../../components/custom/ListDeviceTypes";

const Settings = () => {
  const navigate = useNavigate()

  return (
    <div className="">
      <div className="w-full bg-white flex justify-between items-center p-4 shadow-sm">
        <h2 className="font-bold text-2xl">Settings</h2>
      </div>

      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Device Types</h2>
          <Button onClick={()=>navigate("device-type/new")}>Add New</Button>
        </div>
        <ListDeviceTypes/>
      </div>
    </div>
  );
};

export default Settings;
