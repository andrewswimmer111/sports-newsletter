require 'redis'
require 'redis-namespace'

redis_config = {
  host: 'localhost',
  port: 6379,
  db: 0,
  password: ENV["REDIS_PASSWORD"]
}

redis_connection = Redis.new(redis_config)
$redis = Redis::Namespace.new(:times, redis: redis_connection)