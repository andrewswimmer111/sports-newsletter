# lib/tasks/send_daily_game_results.rake

namespace :send_daily_game_results do
    desc "Fetch game data, format it, and send emails to users"
    task send: :environment do
      date = (Date.today - 1).strftime('%Y-%m-%d')
      sports_api_service = SportsApiService.new
      nfl_data = sports_api_service.fetch_NFL_data(date)
      nba_data = sports_api_service.fetch_NBA_data(date)
  
      nfl_format_service = DataFormatService.new("NFL")
      formatted_nfl_data = nfl_format_service.format_and_cache(nfl_data)
  
      nba_format_service = DataFormatService.new("NBA")
      formatted_nba_data = nba_format_service.format_and_cache(nba_data)
  
      # Filter users to only include a test user
      test_user = User.find_by(email: 'andy.chen@duke.edu')
      users = [test_user]
  
      users.each do |user|
        filtered_nfl_data = filter_game_data_for_user(user, formatted_nfl_data || [])
        filtered_nba_data = filter_game_data_for_user(user, formatted_nba_data || [])
        email_content = build_email_content(user, filtered_nfl_data + filtered_nba_data)
        
        UserMailer.with(user: user, content: email_content).game_results_email.deliver_now
      end
    end
  
    def filter_game_data_for_user(user, formatted_data)
      user_teams = user.teams.pluck(:api_id)
      formatted_data.select do |game|
        user_teams.include?(game[:team1][:team_id]) || user_teams.include?(game[:team2][:team_id])
      end
    end
  
    def build_email_content(user, filtered_data)
      content = "Hello #{user.name},\n\nHere are the latest game results for your favorite teams:\n\n"
      filtered_data.each do |game|
        content += "#{game[:date]} - #{game[:team1][:team_name]} vs #{game[:team2][:team_name]}\n"
        content += "Final Score: #{game[:team1][:team_score][:final]} - #{game[:team2][:team_score][:final]}\n\n"
      end
      content
    end
  end