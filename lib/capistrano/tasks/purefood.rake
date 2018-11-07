namespace :purefood do
  namespace :server do
    task :stop do
      on roles(:app) do
        pid_path = shared_path.join('tmp', 'server.pid')

        if test("[ -f #{pid_path} ]")
          info '[purefood:server:stop] killing running server'
          execute :kill, "`cat #{pid_path}`"
        end
      end
    end

    task :start do
      on roles(:app) do
        execute :npm, 'start'
      end
    end
  end
end

before 'deploy:symlink:release', 'purefood:server:stop'
after 'deploy:symlink:release', 'purefood:server:start'
