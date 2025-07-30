import { useEffect, useRef, useState } from "react";
import { useHeader } from "../../context/HeaderContext";
import SearchMain from "./SearchMain";
import { useAuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { LogOut, ReceiptText, Settings, User } from "lucide-react";

// Define the type for header if not already defined
type HeaderType = {
  title: string;
  // add other properties if needed
};

const HeadingBar = () => {
  const { header } = useHeader() as { header: HeaderType };
  const showAvatarDropdownRef = useRef<HTMLDivElement>(null);
  const { logoutUser } = useAuthContext() as { logoutUser: () => void };
  const navigate = useNavigate();

  const [showAvatarDropdown, setShowAvatarDropdown] = useState(false);

  useEffect(() => {
    //console.log("Header", header)
  }, [header]);

  const handleRedirection = (path: string) => {
    setShowAvatarDropdown(false);
    navigate(path);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        showAvatarDropdownRef.current &&
        !showAvatarDropdownRef.current.contains(event.target as Node)
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
  }, [showAvatarDropdown]);

  return (
    <div className="w-full bg-white flex justify-between items-center p-4 shadow-sm">
      <h2 className="font-bold text-2xl">{header.title}</h2>
      <div className="flex gap-x-4">
        <SearchMain />
        <Button
          variant="outline"
          onClick={() => setShowAvatarDropdown(true)}
          className="p-2 relative h-12 w-12 rounded-full"
        >
          <User className="" />
          {showAvatarDropdown && (
            <div
              ref={showAvatarDropdownRef}
              className="absolute top-full mt-1 right-0 bg-white border rounded-md py-2"
            >
              <ul className="w-full text-gray-600/90 flex flex-col gap-1 items-start">
                <li
                  onClick={() => handleRedirection("/profile")}
                  className="w-full flex hover:bg-gray-100 items-center gap-x-4 px-8 py-2 "
                >
                  <ReceiptText /> View Profile
                </li>
                <li
                  onClick={() => handleRedirection("/settings")}
                  className="w-full flex hover:bg-gray-100 items-center gap-x-4 px-8 py-2"
                >
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
  );
};

export default HeadingBar;
