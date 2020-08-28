# tame

<br>

## Description
An app that allows users to track their migraines, view personal migraine statistics and recommend remedies to other users.

## User Stories

-  **Start** As a anon I can see what the site is about before I sign up 
-  **Signup:** As an anon I can sign up in the platform so that I can start tracking my migraines
-  **Login:** As a user I can login to the platform so that I can track my migraines
-  **Logout:** As a user I can logout from the platform so no one else can modify my information
- **Add new migraine info** As a user I can record a new migraine attack
- **View stats** As a user I can see my personal migraine history and statistics
- **Edit migraines** As a user I can edit details of my migraines
- **Delete migraines** As a user I can delete migraines
- **Recommend** As a user I can recommend remedies to other users and see what is recommended by them
- **Explore** As a user I can read articles and watch videos about migraines

## Backlog
- Night mode to alleviate eye strain
- Phone notifications
- Voice navigation

# Client / Frontend

## React Router Routes (React App)
| Path                      | Component                      | Permissions | Behavior                                                     |
| ------------------------- | --------------------           | ----------- | ------------------------------------------------------------ |
| `/`                       | SplashPage                     | public `<Route>`            | Home page                                        |
| `/signup`                 | SignupPage                     | anon only  `<AnonRoute>`    | Signup form, link to login, navigate to homepage after signup |
| `/login`                  | LoginPage                      | anon only `<AnonRoute>`     | Login form, link to signup, navigate to homepage after login  |
| `/logout`                 | n/a                            | user only `<PrivateRoute>`  | Navigate to homepage after logout, expire session             |
| `/migraines/new`                  | NavBar, ElementList, FooterBar | user only `<PrivateRoute>`  | Enter new migraine migraines                                |
| `/migraines/stats`        | NavBar, ElementList, FooterBar | user only `<PrivateRoute>`  | Shows all stats migraines                                    |
| `/migraines/history`      | NavBar, ElementList, FooterBar | user only `<PrivateRoute>`  | Shows list of all migraines explore                                    |
| `/explore/media      `    | SearchForm, SearchResults      | user only  `<PrivateRoute>` | Look through articles, videos explore                               |
| `/explore/remedies`       | SearchForm, SearchResults      | user only `<PrivateRoute>`  | Community recommendations and ratings 

## Components

- LoginPage
- SignupPage
- NavBar
- Record migraine form
- Migraines list
- Migraine details
- Stats overview
- Recommendations list
- Media overview

## Services

- Auth Service
  - auth.login(user)
  - auth.signup(user)
  - auth.logout()

- Migraine Service
  - migraine.create
  - migraine.delete
  - migraine.edit
  - migraine.list
  - migraine.detail
  
- External API
  - API for articles
  - API for videos
  - API for messaging

  <br>

  ## Links

### Trello/Kanban

[Link to your trello board]() 
or picture of your physical board

### Git

The url to your repository and to your deployed project

[Client repository Link](https://github.com/brittahelm/tame-client)

[Server repository Link](https://github.com/brittahelm/tame-server)

[Deployed App Link]()

### Slides

The url to your presentation slides

[Slides Link](https://docs.google.com/presentation/d/16NyniG3zRQL8AWXdVEb-qX6eyv0xLjbKvOc_xuLJlkw/edit?usp=sharing)
