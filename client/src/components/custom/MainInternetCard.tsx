import React from "react";

import type { InternetType } from "../../pages/Internet/Internet";

const MainInternetCard = ({ connection }: { connection: InternetType }) => {
  return (
    <div>
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-2">
          {connection.name || "Unnamed Connection"}
        </h2>
        <p className="text-gray-600 mb-4">
          {connection.description || "No description available."}
        </p>
        <ul className="list-disc pl-5">
          <li>
            <strong>IP Address:</strong> {connection.ipAddress || "N/A"}
          </li>
          <li>
            <strong>Subnet Mask:</strong> {connection.subnetMask || "N/A"}
          </li>
          <li>
            <strong>Gateway:</strong> {connection.gateway || "N/A"}
          </li>
          <li>
            <strong>Provider:</strong> {connection.provider || "N/A"}
          </li>
          <li>
            <strong>Bandwidth:</strong> {connection.bandwidth} Mbps
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MainInternetCard;
