package main

import "log"

func handleError(err error) {
	if err != nil {
		log.Panicf("ERROR %+v.", err)
	}
}
