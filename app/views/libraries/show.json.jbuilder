json.library do
  json.set! :id, @library.id

  json.set! :books, @library.books do |book|
    json.set! :id, book.id
    json.set! :title, book.title
    json.set! :series, book.series
    json.set! :number, book.number

    json.set! :authors, book.authors do |author|
      json.set! :id, author.id
      json.set! :name, author.name
    end
  end

  json.user do
    json.id @library.user.id
    json.email @library.user.email
  end
end
