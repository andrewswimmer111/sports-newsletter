import React from "react";
import "./LeagueCheckBox.css";

export default function LeagueCheckbox({ league, image, isSelected, onClick }) {
  return (
    <div
      className={`league-checkbox ${isSelected ? "selected" : ""}`}
      onClick={() => onClick(league)}
    >
      <img src={image} alt={`${league} logo`} className="league-image" />
      <span className="league-name">{league}</span>
    </div>
  );
}
