import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import PersonIcon from "@mui/icons-material/Person";
import List from "@mui/material/List";
import { toggle_Drawer } from "../store/atoms/atom";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import DescriptionIcon from "@mui/icons-material/Description";
import { useRecoilState } from "recoil";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";

export default function Sidebarr() {
  const [toggledrawer, settoggledrawer] = useRecoilState(toggle_Drawer);
  const navigate = useNavigate();

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      settoggledrawer(open);
    };

  const list = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <div className="p-10">
        <img src={logo}></img>
      </div>
      <List>
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => {
              navigate("/Dashboard");
            }}
          >
            <ListItemIcon>
              <HomeIcon></HomeIcon>
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => {
              navigate("/Users");
            }}
          >
            <ListItemIcon>
              <PersonIcon></PersonIcon>
            </ListItemIcon>
            <ListItemText primary="Users" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => {
              navigate("/Reports");
            }}
          >
            <ListItemIcon>
              <DescriptionIcon></DescriptionIcon>
            </ListItemIcon>
            <ListItemText primary="Reports" />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
    </Box>
  );

  return (
    <div>
      <Drawer anchor="left" open={toggledrawer} onClose={toggleDrawer(false)}>
        {list()}
      </Drawer>
    </div>
  );
}
