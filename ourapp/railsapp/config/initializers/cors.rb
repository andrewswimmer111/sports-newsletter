Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins 'http://localhost:3001'  # Adjust the port if your frontend runs on a different one
    resource '/ws',
             headers: :any,
             credentials: true,
             methods: [:get, :post, :options, :delete, :put],
             expose: ['Authorization']
  end
end
