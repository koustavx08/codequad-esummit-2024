import React from "react";

const DatePicker = ({ label, name, value, onChange }) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 font-medium mb-1">{label}</label>
      <input
        type="date"
        name={name}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
      />
    </div>
  );
};

export default DatePicker;
