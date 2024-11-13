# Add initial data for dropdowns or constants
# Status.create!([{ name: 'Active' }, { name: 'Inactive' }])

# Add other necessary seeds below...

require 'csv'

# Clear the users and teams tables before seeding to avoid creating duplicates when you re-seed the database
UserTeam.destroy_all

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

import_teams_from_csv(Rails.root.join('db', 'seeds', 'NFL_and_NBA.csv'))

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