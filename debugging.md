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

### Error with `docker-entrypoint-rails.sh`: Not Found in PATH

**Error Message:**
```
/usr/bin/env: ‘docker-entrypoint-rails.sh’: No such file or directory
```

**Resolution:**
Open `docker-entrypoint-rails.sh` and change the line endings from **CRLF to LF**.

This error often occurs when the script has Windows-style line endings (`CRLF`) but is being run in a Unix-like environment that expects Unix-style line endings (`LF`). Converting the line endings should resolve the issue.

To change the line endings:

- **In Visual Studio Code:**
  1. Open `docker-entrypoint-rails.sh`.
  2. Look at the bottom right corner of the editor; you'll see either `CRLF` or `LF`.
  3. Click on `CRLF` and select `LF` from the dropdown menu.

After changing the line endings, save the file and try docker compose up again.