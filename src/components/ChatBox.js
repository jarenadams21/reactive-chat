import React, { useEffect, useRef, useState } from "react";
import Message from "./Message";
import SendMessage from "./SendMessage";
import {
    query,
    collection,
    orderBy,
    onSnapshot,
    limit,
    QuerySnapshot
} from "firebase/firestore";
import { db } from "../firebase"; 

const ChatBox = () => {
    const [messages, setMessages] = useState([]);
    const scroll = useRef();
    /* In this useEffect hook, we have a const q,
     a Firebase query that queries our database looking 
     for a message collection. It then orders the documents
      in the collection based on the createdAt key, and 
      returns a maximum of 50 documents (messages saved).
    */
     useEffect(() => {
        const q = query(
            collection(db, "messages"),
            orderBy("createdAt"),
            limit(50)
        );

        // Questionable use of {...doc.data()}, to my understanding
        // this creates a new array everytime which can effect runtime
        // for larger snapshots, perhaps look into optimizing (if its even an issue)
        const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
            let messages = [];
            QuerySnapshot.forEach((doc) => {
                messages.push({...doc.data(), id: doc.id})
            });
            setMessages(messages);
        });
        return () => unsubscribe;
    }, []);

  return (
    <main className="chat-box">
      <div className="messages-wrapper">
      {messages?.map((message) => (
        <Message key={message.id} message={message} />
        ))}
      </div>
      <span ref={scroll}></span>
      <SendMessage scroll={scroll} />
    </main>
  );
};

export default ChatBox;