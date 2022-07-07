package main

import (
	"database/sql"
	"fmt"
	_ "github.com/lib/pq"
)

const (
	db_host     = "localhost"
	db_port     = 10901
	db_user     = "audit_logs_user"
	db_password = "password"
	db_name     = "audit_logs"
)

func selectWithPagination(limit, offset int) string {
	return fmt.Sprintf("select * from audit_logs.logs limit %d offset %d", limit, offset)
}

func connectToDB() *sql.DB {
	psqlconnStr := fmt.Sprintf("host=%s port=%d user=%s password=%s dbname=%s sslmode=disable", db_host, db_port, db_user, db_password, db_name)

	db, err := sql.Open("postgres", psqlconnStr)
	handleError(err)

	handleError(db.Ping())

	fmt.Println("Connected to database")

	return db
}

func (store *DBStore) readLogs() []*AuditLog {
	rows, err := store.db.Query(selectWithPagination(500, 0))
	handleError(err)
	defer func(rows *sql.Rows) {
		handleError(rows.Close())
	}(rows)

	var logs []*AuditLog

	for rows.Next() {
		log := &AuditLog{}
		err = rows.Scan(&log.LogId, &log.EventId, &log.AppId, &log.EventTS, &log.LogTS, &log.UserId, &log.UserIP, &log.WorkspaceId, &log.Allowed, &log.User.Email, &log.User.Full, &log.User.First, &log.RoleId, &log.User.Last)
		handleError(err)
		logs = append(logs, log)
	}
	handleError(err)
	return logs
}
