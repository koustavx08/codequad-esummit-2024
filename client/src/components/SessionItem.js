import React from "react";

const SessionItem = ({ session }) => {
  return (
    <div className="bg-gray-100 p-3 rounded mb-2">
      <input
        type="text"
        placeholder="Session Title"
        className="w-full px-3 py-1 mb-2 border rounded-md"
        value={session.title}
      />
      <input
        type="time"
        placeholder="Time"
        className="w-full px-3 py-1 border rounded-md"
        value={session.time}
      />
    </div>
  );
};

export default SessionItem;
