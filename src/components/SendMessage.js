import React, { useState } from "react";
import { auth, db } from '../firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

const SendMessage = ({ scroll }) => {
    const [ message, setMessage ] = useState("");

    // async function that first checks if the user
    // is trying to send an empty string or whitespace
    // as a message and alerts the user
    const sendMessage = async (event) => {
        event.preventDefault();
        if(message.trim() === "") {
            alert("Enter a valid message!");
            return;
        }

        // Otherwise, retrieve user details from auth
        // and use addDoc() to create a --document-- inside
        // a --collection-- called *messages in our database
        // which relates to the {db} import. If the collection
        // does not exist, it will create it for us

        // Key-Value Pairs
        // message -> text
        // name -> displayName
        // createdAt -> time message was saved to db
        // uid -> user's universal id
        const { uid, displayName, photoURL } = auth.currentUser;
        await addDoc(collection(db, "messages"), {
            text: message,
            name: displayName,
            avatar: photoURL,
            createdAt: serverTimestamp(),
            uid
        });
        setMessage("");
        scroll.current.scrollIntoView({behavior: "smooth"});
    }
    

  return (
    <form onSubmit={(event) => sendMessage(event)} className="send-message">
      <label htmlFor="messageInput" hidden>
        Enter Message
      </label>
      <input
        id="messageInput"
        name="messageInput"
        type="text"
        className="form-input__input"
        placeholder="type message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button type="submit">Send</button>
    </form>
  );
};

export default SendMessage;