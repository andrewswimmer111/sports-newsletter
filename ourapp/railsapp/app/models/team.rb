class Team < ApplicationRecord
  belongs_to :sport
  has_many :user_teams
  has_many :users, through: :user_teams

  validates :name, presence: true
end
