import React from "react";

export default function TableActionsHeader() {
  const handleGenerate = () => {
    console.log("handle generate");
  };

  const handleDelete = () => {
    console.log("handle delete");
  };

  const handleAddContact = () => {
    console.log("handle add contact");
  };
  return (
    <div className="flex flex-row">
      <div className="flex cursor-pointer" onClick={handleGenerate}>
        Generate |
      </div>
      <div className="flex cursor-pointer" onClick={handleDelete}>
        Delete |
      </div>
      <div className="flex cursor-pointer" onClick={handleAddContact}>
        Add Contact |
      </div>
    </div>
  );
}
