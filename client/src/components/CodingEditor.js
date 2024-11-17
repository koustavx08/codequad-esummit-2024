import React from "react";

const CodingEditor = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 space-y-4">
      <div className="mt-4">
        <div data-pym-src="https://www.jdoodle.com/embed/v1/267ac45b1092fb36">
          <iframe
            id="jdoodle-iframe"
            src="https://www.jdoodle.com/embed/v1/267ac45b1092fb36"
            width="100%"
            height="600px"
            frameBorder="0"
            title="JDoodle Coding Editor"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default CodingEditor;
