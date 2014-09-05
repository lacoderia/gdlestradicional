json.array!(@tweets) do |tweet|
  json.extract! tweet, :id, :author, :text, :lat, :long, :active, :featured
  json.url tweet_url(tweet, format: :json)
end
