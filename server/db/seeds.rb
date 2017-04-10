# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Card.create!([
  {
    front: 'Front1',
    back: 'Back1',
    level: 1,
    learntime: Time.zone.now
  },
  {
    front: 'Front2',
    back: 'Back2',
    level: 2,
    learntime: Time.zone.now
  }
])
