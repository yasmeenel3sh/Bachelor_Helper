
Go web server with mongoDb, gorilla toolkit, and jwt authentication

Structure
~~~
go_rest_api
  /cmd
    /app
      -app.go
      -main.go
    /pkg
      /mongo
        -session.go
        -user_service.go
        -user_model.go
      /server
        -server.go
        -user_router.go
        -response.go
        -auth.go
      /mock
        -user_service_mock.go
      -user.go
      -credentials.go
~~~

Dependancies
  - go get gopkg.in/mgo.v2
  - go get github.com/gorilla/mux
  - go get github.com/gorilla/handlers
  - go get golang.org/x/crypto/bcrypt
  - go get github.com/google/uuid
  - go get github.com/dgrijalva/jwt-go

