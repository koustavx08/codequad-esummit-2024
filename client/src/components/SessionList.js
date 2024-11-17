import React, { useState } from "react";
import SessionItem from "./SessionItem";

const SessionList = () => {
  const [sessions, setSessions] = useState([]);

  const addSession = () => {
    setSessions([...sessions, { id: sessions.length, title: "", time: "" }]);
  };

  return (
    <div className="mb-4">
      <h3 className="font-semibold text-lg mb-2">Event Sessions</h3>
      {sessions.map((session, index) => (
        <SessionItem key={index} session={session} />
      ))}
      {/* <button onClick={addSession} className="mt-2 bg-green-500 text-white px-4 py-2 rounded">Add Session</button> */}
    </div>
  );
};

export default SessionList;
