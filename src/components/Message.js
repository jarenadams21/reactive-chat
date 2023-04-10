import React from "react";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

/* LOGIC
    We imported auth and useAuthState, and 
    stored the user details in user. We deconstructed the messages
    prop and passed the avatar into the img src attribute. 
    We also replaced the dummy name and message with the one 
    gotten from the message data.
*/

/* STYLING
    We also conditioned a CSS style to take effect based on the uid 
    of the message's author. So if the message’s author uid is the same
    as the uid of the person logged in, then the CSS styles stored 
    in the selector right should be added to the div. Otherwise,
    no new style should be added.
*/
const Message = ({message}) => {
    const [user] = useAuthState(auth);

  return (
    <div className={`chat-bubble ${message.uid === user.uid ? "right" : ""}`}>
      <img 
      referrerpolicy="no-referrer"
      className="chat-bubble__left"
       src={message.avatar}
        alt="user avatar"
         />
      <div className="chat-bubble__right">
        <p className="user-name">{message.name}</p>
        <p className="user-message">{message.text}</p>
      </div>
    </div>
  );
};

export default Message;