import { useState, useEffect, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import TeamCheckbox from "./TeamCheckBox";
import LeagueCheckbox from "./LeagueCheckBox";
import "./SportCard2.css";

export default function SportCard2() {
  const [selectedLeague, setSelectedLeague] = useState(null);
  const [teams, setTeams] = useState([]);
  const [selectedTeams, setSelectedTeams] = useState([]);
  const [message, setMessage] = useState("");

  const { user } = useContext(UserContext);

  useEffect(() => {
    // Fetch teams based on the selected league
    if (selectedLeague) {
      fetch(`http://localhost:3000/api/teams?league=${selectedLeague}`)
        .then((response) => response.json())
        .then((data) => setTeams(data))
        .catch((error) => console.error("Error fetching teams:", error));
    } else {
      setTeams([]);
    }
  }, [selectedLeague]);

  const handleLeagueChange = (league) => {
    setSelectedLeague(league);
    setMessage("");
  };

  const handleTeamSelection = (event) => {
    const teamId = event.target.value;
    setSelectedTeams((prevSelectedTeams) =>
      prevSelectedTeams.includes(teamId)
        ? prevSelectedTeams.filter((id) => id !== teamId)
        : [...prevSelectedTeams, teamId]
    );
  };

  const handleTeamSubmit = async () => {
    const response = await fetch(`http://localhost:3000/user_teams`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_teams: {
          user_id: user.id,
          team_ids: selectedTeams,
        },
      }),
    });
    if (response.ok) {
      const confirmation = await response.json();
      setMessage(confirmation.message);
    } else {
      const errorData = await response.json();
      setMessage(errorData.error);
    }
  };

  return (
    <div className="sport-card">
      <h2>Choose a League:</h2>
      <div className="league-selector">
        <LeagueCheckbox
          league="NFL"
          image="/images/nfl_logo.png"
          isSelected={selectedLeague === "NFL"}
          onClick={handleLeagueChange}
        />
        <LeagueCheckbox
          league="NBA"
          image="/images/nba_logo.png"
          isSelected={selectedLeague === "NBA"}
          onClick={handleLeagueChange}
        />
      </div>

      {selectedLeague && (
        <>
          <h2>Pick the Teams You Want to Follow:</h2>
          <div className="team-list">
            {teams.map((team) => (
              <TeamCheckbox
                key={team.id}
                team={team}
                onChange={handleTeamSelection}
              />
            ))}
          </div>
          <button className="submit-button" onClick={handleTeamSubmit}>
            Update Followed Teams
          </button>
          {message && <div className="message">{message}</div>}
        </>
      )}
    </div>
  );
}
