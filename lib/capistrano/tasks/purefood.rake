namespace :purefood do
  namespace :server do
    task :stop do
      on roles(:app) do
        within current_path do
          execute :pm2, :delete, fetch(:application), raise_on_non_zero_exit: false
        end
      end
    end

    task :start do
      on roles(:app) do
        within File.dirname(current_path) do
          execute :pm2, :start, "current/server --name=#{fetch(:application)}"
        end
      end
    end

    task :build do
      on roles(:app) do
        within current_path do
          execute :npm, :run, :build
        end
      end
    end

    desc 'compiles the application and starts the server'
    task build_and_start: %w[
      purefood:server:build
      purefood:server:start
    ]
  end
end

before 'deploy:symlink:release', 'purefood:server:stop'
after 'deploy:symlink:release', 'purefood:server:build_and_start'
