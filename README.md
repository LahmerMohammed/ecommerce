# Functionalities ( not implmented yet ! ) :
- implement dtos
- implement serializers
- implement authorization
- implement tests



# Email confirmation :
- user register 
- send jwt token to email
- recive jwt token
- if valid set email  confirmed
- add emailConfirmation Guard


# Client requesting 
Client => 
- transform and generate Dto payload
- Send payload to server

Server =>
- validate the payload
- transform payload
- submit to database

# Server response
- do database query
- transform result
- return the result


# Authentication
## Workflow :
####  -authenticating user.
####  -Once authenticatde the server will issue JWT that will  be used on sebsequent requests.


##  Passport Strategy : 
####  -A set of options that are specific to that strategy.
####  -A "verify callback" used by passport , To verify user existance and if credentials are valid.
####  -The callback return user-object if everything u=is valid , else return null.


## Implementation : 
#### -AuthService ( function validateUser ) has the job of retrieving a user and verifying the password.
### Implementing passport-local-strategy : 
#### 


### -The only significant difference in the `validate()` method for each strategy is how you determine if a user exists and is valid.


# Firebase Module
- Create Firebase Interface Options
- User will pass a class to our registerAsync Methode whish has a methode that will return  FirebaseInterfaceOptions 
- We need to instantiate that class ( Factory pattern !!! )
-
