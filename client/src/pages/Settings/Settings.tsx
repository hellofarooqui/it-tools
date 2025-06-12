import React from "react";
import { Button } from "../../components/ui/button";
import axios from "axios";
import useDevices from "../../hooks/useDevices";
import { useNavigate } from "react-router-dom";
import ListDeviceTypes from "../../components/custom/ListDeviceTypes";
import ListVendors from "../../components/custom/ListVendors";

const Settings = () => {
  const navigate = useNavigate()

  return (
    <div className="">
      <div className="w-full bg-white flex justify-between items-center p-4 shadow-sm">
        <h2 className="font-bold text-2xl">Settings</h2>
      </div>

      <div className="bg-white m-4 rounded-[15px] shadow-md border overflow-hidden">
        <div className="flex justify-between items-center mb-4 bg-slate-700 p-2 px-4">
          <h2 className="text-xl font-bold text-white">Device Types</h2>
          <Button
            className="bg-slate-100 text-slate-700"
            onClick={() => navigate("device-type/new")}
          >
            New Device
          </Button>
        </div>
        <ListDeviceTypes />
      </div>

      <div className="bg-white m-4 mt-8 rounded-[15px] shadow-md border overflow-hidden">
        <div className="flex justify-between items-center mb-4 bg-slate-700 p-2 px-4">
          <h2 className="text-xl font-bold text-white">Vendors</h2>
          <Button
            className="bg-slate-100 text-slate-700"
            onClick={() => navigate("vendors/new")}
          >
            New Vendor
          </Button>
        </div>
        <ListVendors/>
      </div>
    </div>
  );
};

export default Settings;
