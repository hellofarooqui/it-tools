import { useEffect, useState } from "react";
import ListInternetConnections from "../../components/custom/ListInternetConnections";
import useInternet from "../../hooks/useInternet";
import { Link } from "react-router-dom";

export interface InternetType {
    _id: string;
  name: null;
  description: null;
  ipAddress: null;
  subnetMask: null;
  gateway: null;
  accountNumber: null;
  accountName: null;
  provider: null;
  bandwidth: number;
  connectionType: null;
  accountUsername: null;
  accountPassword: null;
  supportContact: null;
  supportEmail: null;
  supportPhone: null;
}

const Internet = () => {
    const [connections, setConnections] = useState<InternetType[]>([]);
    const { fetchInternetConnections } = useInternet();

    useEffect(() => {
        const loadConnections = async () => {
            try {
                const data = await fetchInternetConnections();
                setConnections(data);
            } catch (error) {
                console.error("Failed to load internet connections:", error);
            }
        };
        loadConnections();
    }, []);
  return (
    <div className="">
      <div className="w-full bg-white flex justify-between items-center p-4 shadow-sm">
        <h2 className="font-bold text-2xl">Internet</h2>
        <Link to="new" className="bg-gwhite  hover:bg-gray-100 border px-4 py-2 text-sm rounded-md  text-gray-800">Add New</Link>
      </div>
      <div className="p-8">
      <ListInternetConnections connections={connections} />

      </div>
    </div>
  );
};
export default Internet;
