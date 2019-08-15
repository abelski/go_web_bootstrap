package authtools

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
		RedirectURL:  "http://localhost:8081/web/callback",
		ClientID:     "120024006994-sgbsian1mq7usgahsalsrj1j7p4rvatp.apps.googleusercontent.com",
		ClientSecret: "qg14NAny0BkDkdBmePCq4S8S",
		Scopes:       []string{"https://www.googleapis.com/auth/userinfo.email"},
		Endpoint:     google.Endpoint,
	}
	//todo randomize
	randomState = "random"
)

const authCookieName string = "user_auth"

//TokenCheckMiddleware need to be sure than user allowed for using app
func TokenCheckMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// cookie, _ := r.Cookie(authCookieName)
		////todo чекнуть куку с токеном
		// if cookie != nil {
		next.ServeHTTP(w, r)
		// } else {
		// http.Error(w, "Unauthorized.", 401)
		// }
	})
}

//HandleLogin redirect to google login
func HandleLogin(w http.ResponseWriter, r *http.Request) {
	url := googleOauthConfig.AuthCodeURL(randomState)
	http.Redirect(w, r, url, http.StatusTemporaryRedirect)
}

//HandleLogout - do nothing
func HandleLogout(w http.ResponseWriter, r *http.Request) {
	http.Redirect(w, r, "https://www.google.com/accounts/Logout?continue=https://appengine.google.com/_ah/logout", http.StatusTemporaryRedirect)

}

//HandleCalback just add cookie with user auth
func HandleCalback(w http.ResponseWriter, r *http.Request) {
	if r.FormValue("state") != randomState {
		fmt.Println("not valid state")
		return
	}
	token, err := googleOauthConfig.Exchange(oauth2.NoContext, r.FormValue("code"))
	if err != nil {
		fmt.Errorf("could not get token:%s", err.Error())
		return
	}
	expiration := time.Now().Add(time.Hour)
	cookie := http.Cookie{Name: authCookieName, Value: token.AccessToken, Expires: expiration, Domain: "", Path: "/"}
	http.SetCookie(w, &cookie)
	r.AddCookie(&cookie)
	http.Redirect(w, r, "/static/main.html", http.StatusTemporaryRedirect)
}
