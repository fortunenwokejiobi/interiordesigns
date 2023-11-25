import React from "react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

export default function Rating({ rating, onRateUp, onRateDown }) {
  return (
    <div className="rating">
      <button onClick={onRateUp} className = "up-button"> <FaArrowUp/> </button>
      <span> {rating} </span>
      <button onClick={onRateDown} className = "down-button"> <FaArrowDown /> </button>
    </div>
  );
}
