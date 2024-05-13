# db/seeds.rb
User.destroy_all

# Create initial users and their posts
alice = User.create(name: "Alice Smith", email: "alice@example.com", age: 28)
bob = User.create(name: "Bob Jones", email: "bob@example.com", age: 34)
carol = User.create(name: "Carol White", email: "carol@example.com", age: 22)

# Create posts for Alice
alice.posts.create([
  { title: "First Post", content: "This is the first post by Alice." },
  { title: "Second Post", content: "Here's another post by Alice." }
])

# Create posts for Bob
bob.posts.create([
  { title: "Bob's Adventure", content: "Details about Bob's recent adventure." }
])

# Create a post for Carol
carol.posts.create([
  { title: "Carol's Musings", content: "Carol shares her thoughts on today's tech landscape." }
])

puts "Users and their posts created!"
