import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import InputField from "./InputField";
import DatePicker from "./DatePicker";
import SessionList from "./SessionList";

const socket = io("https://daba-136-232-88-2.ngrok-free.app", {
  transports: ['websocket', 'polling'],
  reconnectionDelayMax: 10000,
  reconnectionAttempts: 10,
  secure: true,
  rejectUnauthorized: false
});

// Add error handling
socket.on('connect_error', (error) => {
  console.error('Socket connection error:', error);
});

socket.on('connect', () => {
  console.log('Socket connected successfully');
});

const EventForm = ({ onEventCreated }) => {
  const [eventDetails, setEventDetails] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
  });
  const [room, setRoom] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState('disconnected');

  useEffect(() => {
    // Socket connection listeners
    socket.on('connect', () => {
      console.log('Connected to server');
      setConnectionStatus('connected');
    });

    socket.on('connect_error', (error) => {
      console.error('Connection error:', error);
      setConnectionStatus('error');
    });

    socket.on('roomCreated', (roomName) => {
      console.log('Room created:', roomName);
    });

    // Cleanup on component unmount
    return () => {
      socket.off('connect');
      socket.off('connect_error');
      socket.off('roomCreated');
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventDetails((prev) => ({ ...prev, [name]: value }));
  };

  const createRoom = () => {
    // Validate form fields
    if (!eventDetails.title || !eventDetails.startDate || !eventDetails.endDate) {
      alert("Please fill in all required fields");
      return;
    }

    const roomName = eventDetails.title.trim().replace(/\s+/g, "-").toLowerCase();
    socket.emit("createRoom", roomName);
    setRoom(roomName);

    // Call the parent callback to move to coding section
    setTimeout(() => {
      onEventCreated(roomName);
    }, 1500);
  };

  return (
    <div className="bg-white p-6 rounded shadow-md max-w-md mx-auto">
      {connectionStatus === 'error' && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          Unable to connect to server
        </div>
      )}
      <h2 className="text-2xl font-bold mb-4">Create Event</h2>
      <InputField
        label="Event Title"
        name="title"
        value={eventDetails.title}
        onChange={handleChange}
        required
      />
      <InputField
        label="Description"
        name="description"
        value={eventDetails.description}
        onChange={handleChange}
      />
      <DatePicker
        label="Start Date"
        name="startDate"
        value={eventDetails.startDate}
        onChange={handleChange}
        required
      />
      <DatePicker
        label="End Date"
        name="endDate"
        value={eventDetails.endDate}
        onChange={handleChange}
        required
      />
      <SessionList />
      <button
        onClick={createRoom}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
      >
        Create Event & Continue
      </button>

      {room && (
        <p className="mt-4 text-green-600">
          Room created: {room}
          <br />
          Redirecting to coding platform...
        </p>
      )}
    </div>
  );
};

export default EventForm;