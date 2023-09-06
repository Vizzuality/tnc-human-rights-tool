server '15.236.62.53', user: 'ubuntu', roles: %w{web app db}, primary: true
set :ssh_options, forward_agent: true
set :branch, 'main'
