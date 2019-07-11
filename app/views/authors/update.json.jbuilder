json.author do
  json.set! :id, @author.id
  json.set! :name, @author.name

  json.set! :books, @author.books do |book|
    json.set! :id, book.id
    json.set! :title, book.title
    json.set! :series, book.series
    json.set! :number, book.number
  end
end
