# How to fix the "X is not enabled on this VukkyBot because MySQL is disabled!" error

This error appears because you did not want a MySQL database during setup.

If you want one, follow these intructions:

## Step One: Create a MySQL server

Google it for more information.

## Step Two: Type your information into setup.js

You can access setup.js by typing the following command in your VukkyBot folder:

```
npm run setup
```

Then, make sure you select Yes when the `Use MySQL database for features that require it, like counting and warn?` appears.

You will be asked for your MySQL server credentials.