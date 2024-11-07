import { useState, useEffect } from "react";

export default function SportCard() {
    const [selectedLeague, setSelectedLeague] = useState(null);
    const [teams, setTeams] = useState([]);
    const [selectedTeams, setSelectedTeams] = useState([]);

    useEffect(() => {
        // Fetch teams based on the selected league
        fetch(`http://localhost:3000/api/teams?league=${selectedLeague}`)
            .then(response => response.json())
            .then(data => setTeams(data))
            .catch(error => console.error("Error fetching teams:", error));
    }, [selectedLeague]);

    const handleLeagueChange = (event) => {
        setSelectedLeague(event.target.value);
    };

    const handleTeamSelection = (event) => {
        const teamId = event.target.value;
        setSelectedTeams(prevSelectedTeams =>
            prevSelectedTeams.includes(teamId)
                ? prevSelectedTeams.filter(id => id !== teamId)
                : [...prevSelectedTeams, teamId]
        );
    };

    const columnWiseTeams = [];
    const columns = 4;
    const rows = Math.ceil(teams.length / columns);

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            const index = i + j * rows;
            if (teams[index]) {
                columnWiseTeams.push(teams[index]);
            }
        }
    }

    return (
        <>
            <h2 style={{ marginBottom: '20px', textAlign: 'center' }}> Choose a League: </h2>
            <div style={{ fontSize: '20px', display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '10px' }}>
                <label style={{ display: 'flex', alignItems: 'center' }}>
                    <input
                        type="radio"
                        name="league"
                        value="NFL"
                        checked={selectedLeague === "NFL"}
                        onChange={handleLeagueChange}
                        style={{ marginRight: '10px', transform: 'scale(1.5)' }}
                    />
                    NFL
                </label>
                <label style={{ display: 'flex', alignItems: 'center' }}>
                    <input
                        type="radio"
                        name="league"
                        value="NBA"
                        checked={selectedLeague === "NBA"}
                        onChange={handleLeagueChange}
                        style={{ marginRight: '10px', transform: 'scale(1.5)' }}
                    />
                    NBA
                </label>
            </div>

            {selectedLeague && (
                <>
                    <h2 style={{ marginBottom: '20px', textAlign: 'center' }}> Pick The Teams You Want to Follow: </h2>
                    <ul style={{ display: 'grid', gridTemplateColumns: `repeat(${columns}, max-content)`, gap: '10px', justifyContent: 'center' }}>
                        {columnWiseTeams.map(team => (
                            <li key={team.id} style={{ listStyleType: 'none', display: 'flex', alignItems: 'center' }}>
                                <label style={{ display: 'flex', alignItems: 'center' }}>
                                    <input
                                        type="checkbox"
                                        value={team.id}
                                        onChange={handleTeamSelection}
                                        style={{ marginRight: '10px' }}
                                    />
                                    {team.name}
                                </label>
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </>
    );
}