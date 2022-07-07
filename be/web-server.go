package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"
)

func HelloHandler(w http.ResponseWriter, r *http.Request) {
	_, err := fmt.Fprint(w, "Hello\n")
	if err != nil {
		fmt.Println("ERROR in hello handler")
		return
	}
}

func HomeHandler(w http.ResponseWriter, r *http.Request) {
	_, err := fmt.Fprint(w, "<a href='./hello'>hello</a>")
	if err != nil {
		log.Panicf("ERROR in home handler. %+v\n", err)
		return
	}
}

func WriteLogHandler(w http.ResponseWriter, r *http.Request) {
	/* do something here */
	_, err := fmt.Fprintf(w, "Logged!")
	if err != nil {
		log.Panicf("Could not log event! %+v\n", err)
		return
	}
}

func ReadLogHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
	/* query database */
	data, err := json.Marshal(store.readLogs())
	handleError(err)
	_, err = fmt.Fprintf(w, string(data))
	if err != nil {
		log.Panicf("Could not read data! %+v\n", err)
		return
	}
}

func SetupRoutes() {
	http.HandleFunc("/", HomeHandler)
	http.HandleFunc("/hello", HelloHandler)
	http.HandleFunc("/logs", ReadLogHandler)
}

func (store *DBStore) ListenAndServe() {
	done := make(chan os.Signal, 1)
	signal.Notify(done, os.Interrupt, syscall.SIGINT, syscall.SIGTERM)

	ADDR := ":10081"
	server := &http.Server{Addr: ADDR}

	go func() {
		if err := server.ListenAndServe(); err != nil {
			log.Printf("Server is not listening. Reason: %s\n", err.Error())
		}
	}()

	log.Printf("Server is running at %s. Press ctrl+c for graceful exit.", ADDR)

	<-done
	log.Println("ctrl+c received. Exiting.")

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer func() {
		// close file handles, db connections/pool etc.
		handleError(store.db.Close())
		cancel()
	}()

	if err := server.Shutdown(ctx); err != nil {
		log.Panicf("Server shutdown failed. %+v\n", err)
	}

	log.Println("Server exited successfully.")
}

var store *DBStore

func main() {
	SetupRoutes()
	db := connectToDB()
	store = &DBStore{db: db}
	store.ListenAndServe()
}
