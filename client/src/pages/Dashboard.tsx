import React, { use, useEffect, useRef, useState } from "react";
import useDashboard from "../hooks/useDashboard";
import { Loader2, LogOut, ReceiptText, Search, Settings, User } from "lucide-react";
import { Button } from "../components/ui/button";
import useAuth from "../hooks/useAuth";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

interface Dashboard {
  activeTickets: number;
  activeRMA: number;
  deviceCount: number;
}

let defaultDashboard: Dashboard = {
  activeTickets: 0,
  activeRMA: 0,
  deviceCount: 0,
};

const Dashboard = () => {
  const navigate = useNavigate();
  const showAvatarDropdownRef = useRef(null)
  const [dashboard, setDashboard] = useState<Dashboard>(defaultDashboard);
  const [showAvatarDropdown, setShowAvatarDropdown] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { getActiveTickets, getActiveRMA, getDeviceCount } = useDashboard();
  //const {logoutUser} = useAuth()
  const {logoutUser} = useAuthContext()

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        showAvatarDropdownRef.current &&
        !showAvatarDropdownRef.current.contains(event.target)
      ) {
        setShowAvatarDropdown(false);
      }
    }

    if (showAvatarDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    // Cleanup listener on unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showAvatarDropdown])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const activeTicketsCount = await getActiveTickets();
        if (activeTicketsCount) {
          console.log("Active Tickets Count:", activeTicketsCount);
          //console.log("Active Tickets length", tickets.length);
          //console.log("Is Array", Array.isArray(tickets));

          setDashboard((prev) => ({
            ...prev,
            activeTickets: activeTicketsCount,
          }));
        }
        const rmas = await getActiveRMA();
        if (rmas) {
          //console.log(rmas);
          setDashboard((prev) => ({ ...prev, activeRMA: rmas.length }));
        }
        const devices = await getDeviceCount();
        if (devices) {
          setDashboard((prev) => ({
            ...prev,
            deviceCount: devices.deviceCount,
          }));
        }
      } catch (error) {
        setError("Something went wrong");
      } finally {
        //console.log("Active Tickets Length", dashboard.activeTickets);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSearchSubmit = (e)=>{
    e.preventDefault();
    const searchQuery = e.target.search.value.trim();
    if (searchQuery) {
      navigate(`/search?term=${encodeURIComponent(searchQuery)}`);
      e.target.search.value = ""; // Clear the search input after submission
    } else {
      alert("Please enter a search term");
    }
  }

  if (loading) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <Loader2 />
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="">
      <div className="w-full bg-white flex justify-between items-center p-4 shadow-sm">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex gap-x-4">
          <div className="rounded-md border  p-2 bg-gray-100 has-[input:focus]:bg-gray-200  group">
            <form onSubmit={handleSearchSubmit} className="flex items-center">
              <input
                className="placeholder-gray-400 focus:outline-none"
                name="search"
                placeholder="Search device, ticket..."
              />
              <button type="submit">
                <Search className="text-gray-400 group-hover:text-gray-700" />
              </button>
            </form>
          </div>
          <Button
            variant="outline"
            onClick={() => setShowAvatarDropdown(true)}
            className="p-2 relative"
          >
            <User />
            {showAvatarDropdown && (
              <div
                ref={showAvatarDropdownRef}
                className="absolute top-full mt-1 right-0 bg-white border rounded-md py-2"
              >
                <ul className="w-full text-gray-600/90 flex flex-col gap-1 items-start">
                  <li className="w-full flex hover:bg-gray-100 items-center gap-x-4 px-8 py-2 ">
                    <ReceiptText /> View Profile
                  </li>
                  <li className="w-full flex hover:bg-gray-100 items-center gap-x-4 px-8 py-2">
                    <Settings /> Settings
                  </li>
                  <li
                    onClick={logoutUser}
                    className="w-full flex hover:bg-gray-100 items-center gap-x-4 px-8 py-2 mt-1"
                  >
                    <LogOut /> Logout
                  </li>
                </ul>
              </div>
            )}
          </Button>
        </div>
      </div>
      <div className="p-8 grid grid-cols-6 gap-x-4">
        <div className="bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-400 p-8 flex flex-col gap-y-2 rounded-2xl shadow-sm">
          <p className="text-emerald-800 text-white text-lg font-semibold">
            Active Tickets
          </p>
          <p className="text-emerald-800 text-white text-3xl font-bold">
            {dashboard.activeTickets}
          </p>
        </div>
        <div className="bg-gradient-to-r from-indigo-600 via-indigo-500 to-indigo-400 p-8 flex flex-col gap-y-2 rounded-2xl shadow-sm">
          <p className="text-indigo-800 text-white text-lg font-semibold">
            Active RMA
          </p>
          <p className="text-indigo-800 text-white text-3xl font-bold">
            {dashboard.activeRMA}
          </p>
        </div>
        <div className="bg-gradient-to-r from-purple-600 via-purple-500 to-purple-400 p-8 flex flex-col gap-y-2 rounded-2xl shadow-sm">
          <p className="text-purple-800 text-white text-lg font-semibold">
            Devices
          </p>
          <p className="text-purple-800 text-white text-3xl font-bold">
            {dashboard.deviceCount}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
