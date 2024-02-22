# NurseShift_back

## service api

### /auth

| path      | method | authen?      | params | body                                                                                      |
| --------- | ------ | ------------ | ------ | ----------------------------------------------------------------------------------------- |
| /register | POST   | -            | none   | {email, password, confirmPassword, firstName, lastName, mobile, positionId, departmentId} |
| /login    | POST   | -            | none   | {email, password}                                                                         |
| /me       | GET    | authenticate | none   | none                                                                                      |
| /all      | GET    | authenticate | none   | none                                                                                      |

### /users

| path | method | authen?      | params | body                                                          |
| ---- | ------ | ------------ | ------ | ------------------------------------------------------------- |
| /    | PATCH  | authenticate | none   | form-data: {firstName, lastName, mobile, email, profileImage} |

### /shift

| path      | method | authen?                               | params    | body                        |
| --------- | ------ | ------------------------------------- | --------- | --------------------------- |
| /         | POST   | authenticate, manageShiftAuthenticate | none      | {userId, date, shiftTypeId} |
| /         | GET    | authenticate                          | none      | none                        |
| /:userId  | GET    | authenticate                          | /:userId  |                             |
| /:shiftId | PATCH  | authenticate, manageShiftAuthenticate | /:shiftId | {shiftTypeId}               |
| /:shiftId | DELETE | authenticate, manageShiftAuthenticate | /:shiftId |                             |

### etc - get details to map select input at front

| path        | method | authen? | params | body |
| ----------- | ------ | ------- | ------ | ---- |
| /position   | GET    | -       | none   |      |
| /department | GET    | -       | none   |      |
| /shiftType  | GET    | -       | none   |      |
