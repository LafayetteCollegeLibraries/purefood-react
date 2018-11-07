# Load DSL and set up stages
require 'capistrano/setup'

# Include default deployment tasks
require 'capistrano/deploy'

# Load the SCM plugin:
require 'capistrano/scm/git'
install_plugin Capistrano::SCM::Git

# Load npm install tasks
require 'capistrano/npm'

# Load custom tasks from `lib/capistrano/tasks` if you have any defined
Dir.glob('lib/capistrano/tasks/*.rake').each { |r| import r }