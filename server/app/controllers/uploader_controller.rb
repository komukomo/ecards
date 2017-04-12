class UploaderController < ApplicationController
  def upload
    upload_file = params[:file]
    parse(upload_file.read).each do |l|
      c = Card.new(front: l[0], front_sup: l[1], back:l[2], back_sup:l[3])
      c.save
    end
  end

  private
    def parse(content)
      content.split("\n").map{|i| i.split("\t")}
    end
end
