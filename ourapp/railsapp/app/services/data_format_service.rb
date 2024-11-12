
class DataFormatService

  def initialize()
    @cache_service = CacheService.new
  end

  def format_and_cache(raw_data)
    formatted_data = format_data(raw_data)
    @cache_service.add_match_data(formatted_data)
  end

  private

  def format_data(raw_data)

    formatted_data = []

    raw_data['response'].map do |game_data|
      match_data = {
        league: "Temp league (idk what to put here or if we need it)",                    
        date: game_data['game']['date']['date'],              # "2022-09-30"
        team1: {
          team_id: game_data['teams']['home']['id'],          # Currently API id rn
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
          team_id: game_data['teams']['away']['id'],
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
end

# FORMATTED DATA
# {
#   league: ,
#   date: ,
#   teams: [
#     { 
#     team_id:,
#     team_name:,
#     team_score: {
#       q1:,
#       q2:,
#       q3:,
#       q4:,
#       final:,
#     },
#   },
#   { 
#     team_id:,
#     team_name:,
#     team_score: {
#       q1:,
#       q2:,
#       q3:,
#       q4:,
#       final:,
#     },
#   },
#   ]
# }
