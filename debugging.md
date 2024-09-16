### Error with connecting to adsweb-ci.oit.duke.edu?

```
3.966 Could not reach host adsweb-ci.oit.duke.edu. Check your network connection and
3.966 try again.
------
failed to solve: process "/bin/sh -c bundle install" did not complete successfully: exit code: 17
```

- **Resolution:** Remove any instance of `adsweb-ci.oit.duke.edu` from `Gemfile.lock` and `Gemfile`. The hypothesis is that Safari or a Duke proxy is blocking access to that site. That specific URL is used for Shibboleth authentication or other services and is somehow causing the app to fail; removing the reference allows you to bypass the problem.

### Gem File Permissions error
```
ERROR: While executing gem ... (Gem::FilePermissionError)
You don't have write permissions for the /Library/Ruby/Gems/2.6.0 directory.
```

Solution: 
```
rm -rf ~/.rbenv/versions
brew uninstall rbenv
[you may get an error here, don't sweat it]
cd ourapp
docker compose build
docker compose up
```