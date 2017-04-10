class Card < ApplicationRecord
  before_create :set_current_time

  private
    def set_current_time
      self.learntime = Time.zone.at(0)
    end
end
