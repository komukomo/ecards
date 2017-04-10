class Card < ApplicationRecord
  before_create :set_current_time

  def learn(level)
    update_columns(level: level, learntime: next_learntime(level))
  end

  private
    def set_current_time
      self.learntime = Time.zone.at(0)
    end

    def next_learntime(level)
      Time.zone.now + (15 * (level ** 1.5)).hours + 3.minutes
    end
end
