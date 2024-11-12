namespace :sports_api do
  desc "Test the SportsApiService with optional date"
  task :fetch_NFL_data, [:date] => :environment do |t, args|
    date = args[:date] || Date.today.to_s               # Default to today's date if none is provided

    service = SportsApiService.new()
    result = service.fetch_NFL_data(date)

    if result
      puts "NFL data for #{date} fetched successfully:"
      puts result
    else
      puts "Failed to fetch NFL data for #{date}."
    end
  end

  task :fetch_NBA_data, [:date] => :environment do |t, args|
    date = args[:date] || Date.today.to_s               # Default to today's date if none is provided

    service = SportsApiService.new()
    result = service.fetch_NBA_data(date)

    if result
      puts "NBA data for #{date} fetched successfully:"
      puts result
    else
      puts "Failed to fetch NBA data for #{date}."
    end
  end
end