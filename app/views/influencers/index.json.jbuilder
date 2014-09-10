json.array!(@influencers) do |influencer|
  json.extract! influencer, :id, :name, :description, :is_especial, :video_url
  json.url influencer_url(influencer, format: :json)
end
