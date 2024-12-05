# lib/tasks/send_daily_game_results.rake

namespace :send_daily_game_results do
  desc "Fetch game data, format it, and send emails to users"
  task send: :environment do
    date = (Date.today - 1).strftime('%Y-%m-%d')
    sports_api_service = SportsApiService.new

    nfl_data = sports_api_service.fetch_NFL_data(date)
    nba_data = sports_api_service.fetch_NBA_data(date)

    puts "Fetched NFL data: #{nfl_data.inspect}"
    puts "Fetched NBA data: #{nba_data.inspect}"

    nfl_format_service = DataFormatService.new("NFL")
    formatted_nfl_data = nfl_format_service.format_and_cache(nfl_data)

    nba_format_service = DataFormatService.new("NBA")
    formatted_nba_data = nba_format_service.format_and_cache(nba_data)

    puts "Formatted NFL data: #{formatted_nfl_data.inspect}"
    puts "Formatted NBA data: #{formatted_nba_data.inspect}"

    # Ensure formatted data is an array
    formatted_nfl_data = formatted_nfl_data.is_a?(Array) ? formatted_nfl_data : []
    formatted_nba_data = formatted_nba_data.is_a?(Array) ? formatted_nba_data : []

    # Filter users to only include a test user
    test_user = User.find_by(email: 'andy.chen@duke.edu')
    users = [test_user]

    users.each do |user|
      filtered_nfl_data = filter_game_data_for_user(user, formatted_nfl_data)
      filtered_nba_data = filter_game_data_for_user(user, formatted_nba_data)
      email_content = build_email_content(user, filtered_nfl_data + filtered_nba_data)
      
      UserMailer.with(user: user, content: email_content).game_results_email.deliver_now
    end
  end

  def filter_game_data_for_user(user, formatted_data)
    user_teams = user.teams.pluck(:api_id)
    puts "User #{user.email} follows teams: #{user_teams.inspect}"
  
    filtered_data = formatted_data.select do |game|
      team1_id = game[:team1][:team_id]
      team2_id = game[:team2][:team_id]
      puts "Checking game: #{game.inspect}"
      puts "Team 1 ID: #{team1_id}, Team 2 ID: #{team2_id}"
  
      user_teams.include?(team1_id) || user_teams.include?(team2_id)
    end
  
    puts "Filtered game data for user #{user.email}: #{filtered_data.inspect}"
    filtered_data
  end

  def build_email_content(user, filtered_data)
    content = "Hello #{user.name},\n\nHere's how your favorite teams did last night:\n\n"
    filtered_data.each do |game|
      formatted_date = Date.parse(game[:date]).strftime('%m/%d')
      content += "#{formatted_date} - #{game[:team1][:team_name]} vs #{game[:team2][:team_name]}\n"
      content += "Final Score: #{game[:team1][:team_score][:final]} - #{game[:team2][:team_score][:final]}\n\n"
    end
    content
  end
end