import { Avatar, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import MicIcon from "@mui/icons-material/Mic";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../componentcss/Chat.css";
import {
  collection,
  getDocs,
  getFirestore,
  onSnapshot,
  doc,
  orderBy,
} from "firebase/firestore";
import app from "../firebase";
import { query, where } from "firebase/firestore";

function Chat() {
  const [input, setInput] = useState("");
  const [seed, setSeed] = useState("");
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([]);

  const db = getFirestore(app);

  console.log("roomId >>>> ", roomId);
  useEffect(() => {
    onSnapshot(doc(db, "rooms", roomId), (doc) => {
      setRoomName(doc.data().name);

      onSnapshot(
        query(
          collection("rooms", roomId, "messages"),
          orderBy("timestamp", "asc")
        ),
        (snapshot) => {
          setMessages(snapshot.docs.map((doc) => doc.data()));
        }
      );
    });
  }, [roomId]);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, [roomId]);

  const sendmessage = (e) => {
    e.preventDefault();
    console.log("you typed >> ", input);

    // onSnapshot(collection(db,"rooms",roomId,"messages"))

    setInput("");
  };

  return (
    <div className='chat'>
      <div className='chat__header'>
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />

        <div className='chat__headerinfo'>
          <h3>{roomName}</h3>
          <p>Last seen at ...</p>
        </div>
        <div className='chat__headerRight'>
          <IconButton>
            <SearchIcon />
          </IconButton>
          <IconButton>
            <AttachFileIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>

      <div className='chat__body'>
        {messages.map((message) => (
          <p className={`chat__message ${true && "chat__reciever"}`}>
            <span className='chat__name'>{message.name}</span>
            {message.message}
            <span className='chat__timestamp'>
              {new Date(message.timestamp?.toDate()).toUTCString()}
            </span>
          </p>
        ))}
      </div>

      <div className='chat__footer'>
        <InsertEmoticonIcon />
        <form>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type='text'
            placeholder='Type a message'
          />
          <button type='submit' onClick={sendmessage}>
            Send a message
          </button>
        </form>
        <MicIcon />
      </div>
    </div>
  );
}

export default Chat;
