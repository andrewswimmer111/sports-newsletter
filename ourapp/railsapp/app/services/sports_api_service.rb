require 'httparty'

class SportsApiService

  # Date is passed in as YYYY-MM-DD (ex. 2022-09-30)
  def fetch_NFL_data(date)
    response = HTTParty.get(
      "https://v1.american-football.api-sports.io/games?date=#{date}", 
      headers: { 
        "x-rapidapi-host" => "v1.american-football.api-sports.io",
        "x-rapidapi-key" => ENV["SPORTS_API_KEY"]
      }
    )
    JSON.parse(response.body)
  rescue => e
    Rails.logger.error("Failed to fetch NFL data: #{e.message}")
    nil
  end

  def fetch_NBA_data(date)
    response = HTTParty.get(
      "https://v1.basketball.api-sports.io/games?date=#{date}", 
      headers: { 
        "x-rapidapi-key" => ENV["SPORTS_API_KEY"]
      }
    )
    JSON.parse(response.body)
  rescue => e
    Rails.logger.error("Failed to fetch NFL data: #{e.message}")
    nil
  end
end