# Add initial data for dropdowns or constants
# Status.create!([{ name: 'Active' }, { name: 'Inactive' }])

# Add other necessary seeds below...

require 'csv'

# Clear the users and teams tables before seeding to avoid creating duplicates when you re-seed the database
User.destroy_all
Team.destroy_all

def import_teams_from_csv(file_path)
  CSV.foreach(file_path, headers: true) do |row|
    # Create or update each team based on the CSV data
    Team.find_or_create_by(name: row['name']) do |team|
      team.league = row['league']
      team.api_id = row['api_id']
    end
  end
end

# Create users
users = User.create([
  { name: "Andrew Li", email: "andrew.li@duke.edu", password: "12345" },
  { name: "Andy Chen", email: "andy.chen@duke.edu", password: "password" }
])

# Create NFL teams
nfl_teams = [
  "Arizona Cardinals", "Atlanta Falcons", "Baltimore Ravens", "Buffalo Bills",
  "Carolina Panthers", "Chicago Bears", "Cincinnati Bengals", "Cleveland Browns",
  "Dallas Cowboys", "Denver Broncos", "Detroit Lions", "Green Bay Packers",
  "Houston Texans", "Indianapolis Colts", "Jacksonville Jaguars", "Kansas City Chiefs",
  "Las Vegas Raiders", "Los Angeles Chargers", "Los Angeles Rams", "Miami Dolphins",
  "Minnesota Vikings", "New England Patriots", "New Orleans Saints", "New York Giants",
  "New York Jets", "Philadelphia Eagles", "Pittsburgh Steelers", "San Francisco 49ers",
  "Seattle Seahawks", "Tampa Bay Buccaneers", "Tennessee Titans", "Washington Commanders"
]

# Create NBA teams
nba_teams = [
  "Atlanta Hawks", "Boston Celtics", "Brooklyn Nets", "Charlotte Hornets",
  "Chicago Bulls", "Cleveland Cavaliers", "Dallas Mavericks", "Denver Nuggets",
  "Detroit Pistons", "Golden State Warriors", "Houston Rockets", "Indiana Pacers",
  "Los Angeles Clippers", "Los Angeles Lakers", "Memphis Grizzlies", "Miami Heat",
  "Milwaukee Bucks", "Minnesota Timberwolves", "New Orleans Pelicans", "New York Knicks",
  "Oklahoma City Thunder", "Orlando Magic", "Philadelphia 76ers", "Phoenix Suns",
  "Portland Trail Blazers", "Sacramento Kings", "San Antonio Spurs", "Toronto Raptors",
  "Utah Jazz", "Washington Wizards"
]

# Create teams with league attribute
teams = nfl_teams.map { |name| { name: name, league: "NFL" } } +
        nba_teams.map { |name| { name: name, league: "NBA" } }

Team.create(teams)

# Assign teams to users (many-to-many relationship through user_teams)
andrew = users.find { |user| user.email == "andrew.li@duke.edu" }
andy = users.find { |user| user.email == "andy.chen@duke.edu" }

cowboys = Team.find_by(name: "Dallas Cowboys")
patriots = Team.find_by(name: "New England Patriots")
packers = Team.find_by(name: "Green Bay Packers")
lakers = Team.find_by(name: "Los Angeles Lakers")
warriors = Team.find_by(name: "Golden State Warriors")

# Establish the many-to-many relationship between users and teams
andrew.teams << cowboys
andrew.teams << patriots
andy.teams << packers
andy.teams << lakers
andy.teams << warriors