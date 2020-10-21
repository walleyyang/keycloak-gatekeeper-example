This is an example repository for using Keycloak and Keycloak Gatekeeper with an application behind HAProxy.

Modify your local host file and add 
```
127.0.0.1 keycloak
127.0.0.1 gatekeeper
127.0.0.1 helloworld
```

Run `npm install`.

Run `docker build -t helloworld .` to build the helloworld image.

#### Configure Keycloak

The below steps are completed and saved in the postgres_data folder, but is here for reference. Go to `http://127.0.0.1:9990/auth/admin` to access the Keycloak login and use the username and password `admin`.
1. Create a new realm called `helloworld`. 

2. Create a new client for the `helloworld` realm called `gatekeeper-client`. This will be used to access Keycloak. 

    a. Make sure the Client Protocol is `openid-connect` and the Access Type is `confidential`.
    
    b. Change the Valid Redirect URIs to `http://127.0.0.1:8080`. This is used to send an authorization token after a successful login. This will be sent to Keycloak Gatekeeper.
    
    c. Copy the Secret from the Credentials tab. This will need to go into the `gatekeeper.yml` file.
    
3. Create the user and group which will be authorized to access the web application.
    
    a. Create the group called `helloworldgroup`.
    
    b. Create the user called `helloworlduser`. Add the password `helloworlduser` for the user under the Credentials tab.
    
    c. Add the `helloworldgroup` to the `helloworlduser` Group Membership under the Groups tab.
    
4. Create a role for the group so that it can be associated with the authorized group. This group is use for the authorized token.

    a. Create the role called `helloworldrole`.
    
    b. Add `helloworldrole` in the `helloworldgroup` by clicking the Role Mappings tab and adding it to the Assigned Roles column.
    
    c. Go to the `gatekeeper-client` and click the Mappers tab. Create a new mapper and call it `helloworldmapper`. Select `Audience` in the Mapper Type dropdown. This adds the `aud` field to the token. 

