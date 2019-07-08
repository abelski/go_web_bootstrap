package main

import (
	"fmt"
	"log"
	"net/http"

	project "github.com/abelski/go_web_bootstrap/api"

	"github.com/gorilla/mux"
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

func main() {
	router := mux.NewRouter()

	router.HandleFunc("/api/projects", project.GetProjectsEndpoint).Methods("GET")
	router.HandleFunc("/web/login", handleLogin).Methods("GET")
	router.HandleFunc("/web/callback", handleCalback).Methods("GET")

	s := http.StripPrefix("", http.FileServer(http.Dir("./static/")))
	router.PathPrefix("").Handler(s)

	http.Handle("/", router)

	log.Fatal(http.ListenAndServe(":8080", router))
}

func handleLogin(w http.ResponseWriter, r *http.Request) {
	url := googleOauthConfig.AuthCodeURL(randomState)
	http.Redirect(w, r, url, http.StatusTemporaryRedirect)
}

func handleCalback(w http.ResponseWriter, r *http.Request) {
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
	fmt.Println("token" + token.AccessToken)
	// response, err := http.Get("https://www.googleapis.com/oauth2/v2/userinfo?access_token=" + token.AccessToken)
	// if err != nil {
	// 	return nil, fmt.Errorf("failed getting user info: %s", err.Error())
	// }

	// defer response.Body.Close()
	// contents, err := ioutil.ReadAll(response.Body)
	// if err != nil {
	// 	return nil, fmt.Errorf("failed reading response body: %s", err.Error())
	// }

	// return contents, nil
}
