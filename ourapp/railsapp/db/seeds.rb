# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).

# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# Uncomment and modify the following lines according to your application's need.

# Create default admin user
# Admin.create!(username: 'admin', email: 'admin@example.com', password: 'securepassword')

# Add initial data for dropdowns or constants
# Status.create!([{ name: 'Active' }, { name: 'Inactive' }])

# Add other necessary seeds below...


# Clear the users table before seeding to avoid creating duplicates when you re-seed the database
User.destroy_all


# Create users
User.create([
  { name: "Andrew Li", email: "andrew.li@duke.edu", password: "12345" },
  { name: "Andy Chen", email: "andy.chen@duke.edu", password: "password" }
])

# Create sports
nfl = Sport.create(name: "NFL")

# Create teams and associate them with the NFL sport
Team.create([
  { name: "Dallas Cowboys", sport: nfl },
  { name: "New England Patriots", sport: nfl },
  { name: "Green Bay Packers", sport: nfl }
])

# (Optional) Assign teams to users (many-to-many relationship through user_teams)
# Assuming you want to link Andrew Li to Cowboys and Patriots, and Andy Chen to Packers
andrew = User.find_by(email: "andrew.li@duke.edu")
andy = User.find_by(email: "andy.chen@duke.edu")

cowboys = Team.find_by(name: "Dallas Cowboys")
patriots = Team.find_by(name: "New England Patriots")
packers = Team.find_by(name: "Green Bay Packers")

# Establish the many-to-many relationship between users and teams
andrew.teams << cowboys # same syntax as UserTeam.create(user: andrew, team: cowboys)
andrew.teams << patriots
andy.teams << packers
