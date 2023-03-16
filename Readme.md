# Vendor UI

## Local Development

To run the app locally, please follow the steps below:

1. Clone the repository using `git clone git@bitbucket.org:jumbotail/vendorui.git`
2. Add the following line to your `/etc/hosts` file:
    ```
    127.0.0.1       vendor.localhost.jumbotail.com
    ```
3. Navigate to the `vendor-ui` directory using `cd vendor-ui`
4. Install dependencies using `yarn`
5. Start the development server using `yarn dev`
6. Visit `vendor.localhost.jumbotail.com` in your web browser to view the app.

Note: If you open your website in `localhost:5713`, API calls will fail due to proxy configuration in the Vite config.

## Deployment to Production

To deploy the app to production, please follow the steps below:

1. Build the app using `yarn build`. If you encounter any TypeScript errors, please fix them before proceeding.
2. Add and commit the changed files, and push to a branch. Then, raise a pull request to merge the changes to the `master` branch.
3. Once the changes are merged to `master`, SSH into the deployed machine.
4. Navigate to the `vendorui` directory using `cd /usr/share/nginx/html/vendorui`
5. Pull the latest changes from the `master` branch using `git pull origin master`
6. Restart the Nginx service twice using `service nginx restart`
7. Refresh the app to see the new changes.