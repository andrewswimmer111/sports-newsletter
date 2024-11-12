
class CacheService
  def initialize
    @cache_key = 'team_match_data'
  end

  def add_match_data(match_data)
    current_data = Rails.cache.read(@cache_key) || []     # Retrieve the existing array from the cache, or initialize an empty array if it doesn't exist
    if match_data.is_a?(Array)                            # Append the new match data(must be in array format!) to the total array
      current_data.concat(match_data)
    end                      
    Rails.cache.write(@cache_key, current_data)           # Store the updated array back in the cache
  end

  def get_cached_data
    Rails.cache.read(@cache_key)                          # Retrieve the data (array) from the cache
  end
end