"use client";
import React, { useState } from "react";

export default function TableSearch() {
  const [searchOpen, setSearchOpen] = useState(false);
  return (
    <div className="flex flex-row gap-2">
      <div
        className="flex cursor-pointer rounded-md bg-blue-500 p-2"
        onClick={() => {
          setSearchOpen(!searchOpen);
        }}
      >
        SEARCH
      </div>
      {searchOpen && (
        <>
          <div className="flex flex-col">
            <div className="flex">Name</div>
            <input></input>
          </div>
          <div className="flex flex-col">
            <div className="flex">Industry</div>
            <input></input>
          </div>
          <div className="flex flex-col">
            <div className="flex">Email</div>
            <input></input>
          </div>
        </>
      )}
    </div>
  );
}
