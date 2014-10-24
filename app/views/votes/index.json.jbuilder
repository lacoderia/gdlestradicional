json.array!(@votes) do |vote|
  json.extract! vote, :id, :name, :email, :answer, :route_id, :subscribe, :isUser
  json.url vote_url(vote, format: :json)
end
