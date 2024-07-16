# TNC - Human Rights Tool

This is the repository for the TNC Human Rights Tool. To get started please check the Readme files in the `api` and `client` folders.

**IMPORTANT**: Currently there is a problem with the first run of the CMS. The migration is run before the database is created. To fix this, first remove temporarily the `database/migrations/*.js` files and then run `yarn develop`. After the first run, you can put back the migration files.
