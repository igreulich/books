json.books @books do |book|
  json.id book.id
  json.title book.title
  json.series book.series
  json.number book.number

  json.set! :authors, book.authors do |author|
    json.set! :id, author.id
    json.set! :name, author.name
  end
end
