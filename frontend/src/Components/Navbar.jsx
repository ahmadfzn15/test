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
} from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";

export default function Navbar() {
  const [signOutDialog, setSignOutDialog] = useState(false);
  const route = useNavigate();

  const signOut = async () => {
    Cookies.remove("token");
    route("/login");
  };

  return (
    <>
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
            <div className="flex gap-4 mr-4">
              <Menu>
                <MenuHandler>
                  <IconButton
                    color="blue"
                    variant="text"
                    className="rounded-full bg-slate-100 border border-slate-300"
                  >
                    <HiOutlineBell className="w-5 h-5 text-slate-500" />
                  </IconButton>
                </MenuHandler>
                <MenuList className="px-0 divide-y divide-slate-200">
                  <MenuItem className="py-2 rounded-none" disabled>
                    Notification
                  </MenuItem>
                  <MenuItem className="rounded-none">Check Security</MenuItem>
                  <MenuItem className="rounded-none">Check Security</MenuItem>
                </MenuList>
              </Menu>
              <Menu>
                <MenuHandler>
                  <IconButton
                    color="blue"
                    variant="text"
                    className="rounded-full bg-slate-100 border border-slate-300"
                  >
                    <HiOutlineEnvelope className="w-5 h-5 text-slate-500" />
                  </IconButton>
                </MenuHandler>
                <MenuList className="px-0 divide-y divide-slate-200">
                  <MenuItem className="py-2 rounded-none" disabled>
                    Message
                  </MenuItem>
                  <MenuItem className="rounded-none">Check Security</MenuItem>
                  <MenuItem className="rounded-none">Check Security</MenuItem>
                </MenuList>
              </Menu>
            </div>
            <div className="flex flex-col items-end whitespace-nowrap">
              {/* <h1 className="text-sm text-slate-800">{user && user.username}</h1> */}
              {/* <small className="text-[11px] text-slate-500">
              {user && user.role}
            </small> */}
            </div>
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
