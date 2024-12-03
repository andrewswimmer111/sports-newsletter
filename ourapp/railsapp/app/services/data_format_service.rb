class DataFormatService

  def initialize(league)
    @league = league
    @cache_service = CacheService.new
  end

  def format_and_cache(raw_data)
    formatted_data = []

    if @league == "NFL"
      formatted_data = format_NFL_data(raw_data)
    elsif @league == "NBA"
      formatted_data = format_NBA_data(raw_data)
    end

    @cache_service.add_match_data(formatted_data)
    formatted_data # Ensure the method returns the formatted data
  end

  private

  def format_NFL_data(data)
    formatted_data = []

    data['response'].map do |game_data|
      api_hometeam_id = game_data['teams']['home']['id']
      ourapp_hometeam_id = Team.where(api_id: api_hometeam_id, league: "NFL").first

      api_awayteam_id = game_data['teams']['away']['id']
      ourapp_awayteam_id = Team.where(api_id: api_awayteam_id, league: "NFL").first

      match_data = {
        league: @league,
        date: game_data['game']['date']['date'], # example format "2022-09-30"
        team1: {
          team_id: ourapp_hometeam_id,
          team_name: game_data['teams']['home']['name'],
          team_score: {
            q1: game_data['scores']['home']['quarter_1'],
            q2: game_data['scores']['home']['quarter_2'],
            q3: game_data['scores']['home']['quarter_3'],
            q4: game_data['scores']['home']['quarter_4'],
            final: game_data['scores']['home']['total']
          }
        },
        team2: {
          team_id: ourapp_awayteam_id,
          team_name: game_data['teams']['away']['name'],
          team_score: {
            q1: game_data['scores']['away']['quarter_1'],
            q2: game_data['scores']['away']['quarter_2'],
            q3: game_data['scores']['away']['quarter_3'],
            q4: game_data['scores']['away']['quarter_4'],
            final: game_data['scores']['away']['total']
          }
        }
      }
      formatted_data << match_data
    end
    formatted_data
  end

  def format_NBA_data(data)
    formatted_data = []

    data['response'].map do |game_data|
      api_hometeam_id = game_data['teams']['home']['id']
      ourapp_hometeam_id = Team.where(api_id: api_hometeam_id, league: "NBA").first

      api_awayteam_id = game_data['teams']['visitors']['id']
      ourapp_awayteam_id = Team.where(api_id: api_awayteam_id, league: "NBA").first

      match_data = {
        league: @league,
        date: game_data['date']['start'], # example format "2022-03-09T00:00:00.000Z"
        team1: {
          team_id: ourapp_hometeam_id,
          team_name: game_data['teams']['home']['name'],
          team_score: {
            q1: game_data['scores']['home']['linescore'][0],
            q2: game_data['scores']['home']['linescore'][1],
            q3: game_data['scores']['home']['linescore'][2],
            q4: game_data['scores']['home']['linescore'][3],
            final: game_data['scores']['home']['points']
          }
        },
        team2: {
          team_id: ourapp_awayteam_id,
          team_name: game_data['teams']['visitors']['name'],
          team_score: {
            q1: game_data['scores']['visitors']['linescore'][0],
            q2: game_data['scores']['visitors']['linescore'][1],
            q3: game_data['scores']['visitors']['linescore'][2],
            q4: game_data['scores']['visitors']['linescore'][3],
            final: game_data['scores']['visitors']['points']
          }
        }
      }
      formatted_data << match_data
    end
    formatted_data
  end
end