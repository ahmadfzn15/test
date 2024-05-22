import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  IconButton,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Typography,
} from "@material-tailwind/react";
import {
  HiChevronDown,
  HiUser,
  HiMagnifyingGlass,
  HiOutlineBell,
  HiOutlineEnvelope,
  HiArrowRightOnRectangle,
  HiXMark,
} from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";
import { Alert } from "@material-tailwind/react";
import { BsCheck2Circle } from "react-icons/bs";
import { MdError } from "react-icons/md";

export default function Navbar() {
  const [signOutDialog, setSignOutDialog] = useState(false);
  const [alert, setAlert] = useState({ open: false, type: "", message: "" });
  const route = useNavigate();

  const signOut = async () => {
    Cookies.remove("token");
    setAlert({
      open: true,
      type: "success",
      message: "Logout Successfully",
    });

    route("/login");
  };

  return (
    <>
      {alert.open ? (
        <Alert
          color={alert.type == "success" ? "green" : "red"}
          variant="gradient"
          className="fixed top-0 right-0 left-0 py-5"
          animate={{
            mount: { y: 0, opacity: 1 },
            unmount: { y: -30, opacity: 0 },
          }}
          icon={
            alert.type == "success" ? (
              <BsCheck2Circle className="w-6 h-6" />
            ) : (
              <MdError className="w-6 h-6" />
            )
          }
          open={alert.open}
          action={
            <HiXMark
              className="w-6 h-6 absolute right-0 mr-5 cursor-pointer"
              onClick={() => setAlert({ open: false })}
            />
          }
        >
          {alert.message}
        </Alert>
      ) : (
        <></>
      )}
      <div className="w-[calc(100vw-14rem)] left-56 fixed h-16 px-5 flex justify-between items-center bg-white shadow-sm shadow-slate-300 z-30">
        <div className="w-full flex justify-between gap-1 items-center">
          <div className="flex items-center w-full">
            <HiMagnifyingGlass className="w-5 h-5 text-slate-500" />
            <input
              type="text"
              className="w-full border-none focus:outline-none p-2 rounded-md text-slate-600 text-sm"
              placeholder="Type to search..."
            />
          </div>
          <div className="flex items-center gap-3">
            <Menu>
              <MenuHandler>
                <div className="w-10 h-10 rounded-full overflow-hidden flex shrink-0 justify-center items-center">
                  <img src="/img/ahmad.jpg" alt="Profile" />
                </div>
              </MenuHandler>
              <MenuList>
                <MenuItem className="flex items-center gap-2 text-blue-500">
                  <HiUser className="w-4 h-4" />
                  Profile
                </MenuItem>
                <MenuItem
                  className="flex items-center gap-2 text-blue-500"
                  onClick={() => setSignOutDialog(!signOutDialog)}
                >
                  <HiArrowRightOnRectangle className="w-4 h-4" />
                  Sign out
                </MenuItem>
              </MenuList>
            </Menu>
            <HiChevronDown className="w-4 h-4 text-slate-500 shrink-0" />
          </div>
        </div>
      </div>

      <Dialog
        open={signOutDialog}
        handler={setSignOutDialog}
        className="bg-slate-200"
      >
        <DialogBody className="py-5">
          <Typography variant="h5" color="black">
            Apakah yakin anda ingin logout sekarang?
          </Typography>
        </DialogBody>
        <DialogFooter className="space-x-4">
          <Button
            color="green"
            onClick={() => setSignOutDialog(!signOutDialog)}
          >
            Tidak
          </Button>
          <Button color="red" onClick={signOut}>
            Ya
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
