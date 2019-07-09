package authTools

import (
	"fmt"
	"net/http"
	"time"

	"golang.org/x/oauth2"
	"golang.org/x/oauth2/google"
)

//todo hide from here
var (
	googleOauthConfig = &oauth2.Config{
		RedirectURL:  "http://localhost:8080/web/callback",
		ClientID:     "120024006994-sgbsian1mq7usgahsalsrj1j7p4rvatp.apps.googleusercontent.com",
		ClientSecret: "qg14NAny0BkDkdBmePCq4S8S",
		Scopes:       []string{"https://www.googleapis.com/auth/userinfo.email"},
		Endpoint:     google.Endpoint,
	}
	//todo randomize
	randomState = "random"
)

func TokenCheckMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		cookie, _ := r.Cookie("user")
		//todo чекнуть куку с токеном
		if cookie != nil {
			fmt.Println("coockie" + cookie.Name)
			next.ServeHTTP(w, r)
		} else {
			http.Error(w, "Unauthorized.", 401)
		}
	})
}
func HandleLogin(w http.ResponseWriter, r *http.Request) {
	url := googleOauthConfig.AuthCodeURL(randomState)
	http.Redirect(w, r, url, http.StatusTemporaryRedirect)
}

func HandleCalback(w http.ResponseWriter, r *http.Request) {
	if r.FormValue("state") != randomState {
		fmt.Println("not valid state")
		http.Redirect(w, r, "/", http.StatusTemporaryRedirect)
		return
	}
	token, err := googleOauthConfig.Exchange(oauth2.NoContext, r.FormValue("code"))
	if err != nil {
		fmt.Errorf("could not get token:%s", err.Error())
		http.Redirect(w, r, "/", http.StatusTemporaryRedirect)
		return
	}
	expiration := time.Now().Add(time.Hour)
	cookie := http.Cookie{Name: "user", Value: token.AccessToken, Expires: expiration}
	http.SetCookie(w, &cookie)
}
