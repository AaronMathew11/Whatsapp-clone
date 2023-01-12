import { Avatar, Link } from "@mui/material";
import { addDoc, getFirestore, setDoc, doc , collection} from "firebase/firestore";
import React, { useEffect, useState, } from "react";
import "../componentcss/SidebarChat.css";
import app from "../firebase";

function SidebarChat({ addNewChat, id, name }) {
  const [seed, setSeed] = useState("");

  const db = getFirestore(app);

  //run some code when the component changes
  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  const createChat = () => {
    const roomName = prompt("Please enter a name for the chat");

    if (roomName) {
      //do some clever database stuff...
      addDoc(collection(db, "rooms"), {
        name: roomName,
      }).then(()=>{
        console.log("added successfully");
      }).catch((err)=>{ console.log(err.code)});

      // setDoc(doc(db, "rooms"), { name: roomName });
    }
  };

  return !addNewChat ? (
    <Link href={`/rooms/${id}`}>
   <div className='sidebarChat'>
      <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
      <div className='sidebarChat__info'>
        <h2>{name}</h2>
        <p>Last message...</p>
      </div>
    </div>
    </Link>
 
  ) : (
    <div className='sidebarChat' onClick={createChat}>
      <h2>Add new Chat</h2>
    </div>
  );
}

export default SidebarChat;
