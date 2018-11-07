namespace :purefood do
  task :build do
    on roles(:app) do
      within current_path do
        execute 'NODE_ENV=production', :npm, :run, :build
      end
    end
  end

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


    desc 'compiles the application and starts the server'
    task build_and_restart: %w[
      purefood:build
      purefood:server:stop
      purefood:server:start
    ]
  end
end

after 'deploy:symlink:release', 'purefood:server:build_and_restart'
