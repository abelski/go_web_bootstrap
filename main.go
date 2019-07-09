package main

import (
	"log"
	"net/http"

	project "github.com/abelski/go_web_bootstrap/api"
	utils "github.com/abelski/go_web_bootstrap/utils"

	"github.com/gorilla/mux"
)

func main() {
	router := mux.NewRouter()

	// router.HandleFunc("/api/projects", project.GetProjectsEndpoint).Methods("GET")

	router.HandleFunc("/web/login", utils.HandleLogin).Methods("GET")
	router.HandleFunc("/web/callback", utils.HandleCalback).Methods("GET")

	s := http.StripPrefix("/static/", http.FileServer(http.Dir("./static/")))
	router.PathPrefix("/static/").Handler(s)

	apisubrouter := router.PathPrefix("/api").Subrouter()
	apisubrouter.Use(utils.TokenCheckMiddleware)
	apisubrouter.HandleFunc("/projects", project.GetProjectsEndpoint).Methods("GET")

	http.Handle("/", router)

	log.Fatal(http.ListenAndServe(":8080", router))
}
