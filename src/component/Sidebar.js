import { Avatar, IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ChatIcon from "@mui/icons-material/Chat";
import SearchIcon from "@mui/icons-material/Search";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import React, { useEffect, useState } from "react";
import SidebarChat from "./SidebarChat";
import "../componentcss/Sidebar.css";
// import db from "../firebase";
import app from "../firebase";
import {
  doc,
  onSnapshot,
  collection,
  query,
  where,
  getFirestore,
} from "firebase/firestore";
import { useStateValue } from "../StateProvider";

function Sidebar() {
  const [rooms, setRooms] = useState([]);
  const [{user}, dispatch] = useStateValue();

  const db = getFirestore(app);

  useEffect(() => {
    const unsubscribe=onSnapshot(query(collection(db, "rooms")), (snapshot) => {
      setRooms(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });

    return ()=>{
      unsubscribe();
    }
  }, []);
  rooms.map(room=> {
    console.log(room.data);
  })
  return (
    <div className='sidebar'>
      <div className='sidebar__header'>
        <Avatar src={user?.photoURL}/>
        <div className='sidebar__headerRight'>
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>

      <div className='sidebar__search'>
        <div className='sidebar__searchContainer'>
          <SearchIcon />
          <input placeholder='Search or start a new chat' type='text' />
        </div>
      </div>

      <div className='sidebar__chats'>
        <SidebarChat addNewChat />
        {rooms.map((room) => (
          <SidebarChat name={room.data.name} id={room.id} key={room.id} />
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
