import React, { useState } from "react";
import EventForm from "./EventForm";
import VideoPlayer from "./VideoPlayer";
import CodingEditor from "./CodingEditor";
import Navbar from "./Navbar";
import "./Dashboard.css";

const Dashboard = () => {
  const [currentStep, setCurrentStep] = useState('event');
  const [roomName, setRoomName] = useState(null);

  const handleEventCreated = (createdRoomName) => {
    setRoomName(createdRoomName);
    setCurrentStep('coding');
  };

  const handleCodingComplete = () => {
    setCurrentStep('video');
  };

  const renderContent = () => {
    switch (currentStep) {
      case 'event':
        return (
          <section>
            <h2 className="section-title">Create Your Event</h2>
            <EventForm onEventCreated={handleEventCreated} />
            <div style={{ marginTop: '20px' }}>
            </div>
          </section>
        );
      case 'coding':
        return (
          <section>
            <h2 className="section-title">Online Coding</h2>
            <CodingEditor roomName={roomName} />
            <button
              onClick={handleCodingComplete}
              className="animated-button mt-4"
            >
              Start Video Session
            </button>
          </section>
        );

      case 'video':
        return (
          <section>
            <h2 className="section-title">Live Video Session</h2>
            <VideoPlayer roomName={roomName} />
          </section>
        );

      default:
        return null;
    }
  };

  return (
    <div className="dashboard-container">
      <Navbar
        onShowEvent={() => setCurrentStep('event')}
        onShowCoding={() => setCurrentStep('coding')}
        onShowVideo={() => setCurrentStep('video')}
        currentStep={currentStep}
      />

      <h1 className="dashboard-title">Event Dashboard</h1>
      <div className="dashboard-content">
        {renderContent()}
      </div>
    </div>
  );
};

export default Dashboard;
