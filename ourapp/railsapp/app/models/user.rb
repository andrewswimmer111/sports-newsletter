class User < ApplicationRecord
  has_many :user_teams
  has_many :teams, through: :user_teams

  validates :name, presence: true
  validates :email, presence: true, uniqueness: true
  validates :password, presence: true
end