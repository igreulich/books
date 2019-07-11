json.book do
  json.set! :id, @book.id
  json.set! :title, @book.title
  json.set! :series, @book.series
  json.set! :number, @book.number

  json.set! :authors, @book.authors do |author|
    json.set! :id, author.id
    json.set! :name, author.name
  end
end
