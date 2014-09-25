json.array!(@tweets) do |tweet|
  json.extract! tweet, :lat, :long
end