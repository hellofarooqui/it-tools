import React from "react";
import type { InternetType } from "../../pages/Internet/Internet";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
const InternetDetails = ({
  connection,
  onClose,
}: {
  connection: InternetType;
}) => {
  const navigate = useNavigate();
  return (
    <div className="absolute bg-gray-700/30 z-20 top-0 left-0 w-screen h-screen flex justify-center items-center">
      <div className="bg-white rounded-[15px] p-8 grid grid-cols-[150px_auto] gap-x-4 gap-y-4 text-gray-600">
        <p className="font-semibold">Name</p>
        <p>{connection.name}</p>

        <p className="font-semibold">Description</p>
        <p>{connection.description}</p>

        <p className="font-semibold">IP Address</p>
        <p>{connection.ipAddress}</p>

        <p className="font-semibold">Subnet Mask</p>
        <p>{connection.subnetMask}</p>

        <p className="font-semibold">Gateway</p>
        <p>{connection.gateway}</p>

        <p className="font-semibold">Account Number</p>
        <p>{connection.accountNumber}</p>

        <p className="font-semibold">Account Name</p>
        <p>{connection.accountName}</p>

        <p className="font-semibold">Provider</p>
        <p>{connection.provider}</p>

        <p className="font-semibold">Bandwidth</p>
        <p>{connection.bandwidth}</p>

        <p className="font-semibold">Connection Type</p>
        <p>{connection.connectionType}</p>

        <p className="font-semibold">Username</p>
        <p>{connection.accountUsername}</p>

        <p className="font-semibold">Password</p>
        <p>{connection.accountPassword}</p>

        <p className="font-semibold">Support Contact</p>
        <p>{connection.supportContact}</p>

        <p className="font-semibold">Support Email</p>
        <p>{connection.supportEmail}</p>

        <p className="font-semibold">Support Phone</p>
        <p>{connection.supportPhone}</p>

        <div className="col-span-2 flex justify-center gap-x-4">
        <Button variant="outline" className=" mt-4 px-8" onClick={()=>navigate("edit/" + connection._id)}>
          Edit
        </Button>
        <Button className=" mt-4 px-8" onClick={onClose}>
          Close
        </Button>
        </div>
      </div>
    </div>
  );
};

export default InternetDetails;
