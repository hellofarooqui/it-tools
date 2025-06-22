import { useEffect, useState } from "react";
import ListInternetConnections from "../../components/custom/ListInternetConnections";
import useInternet from "../../hooks/useInternet";
import { Link } from "react-router-dom";
import { useHeader } from "../../context/HeaderContext";

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
  const { header, setHeader } = useHeader();

  useEffect(() => {
    setHeader({ ...header, title: "Internet" });
  }, []);
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
    <div className="p-8">
      <ListInternetConnections connections={connections} />
    </div>
  );
};
export default Internet;
