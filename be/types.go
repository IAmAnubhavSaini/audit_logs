package main

import "database/sql"

type KVP struct {
	key   string
	value string
}

type user struct {
	Full  string `json:"user_full_name"`
	First string `json:"user_first_name"`
	Last  string `json:"user_last_name"`
	Email string `json:"user_email"`
}

type AuditLog struct {
	/* ID of the event */
	EventId string `json:"event_id"`

	/* [WHAT] Unique, named identifier of the event */
	EventName string `json:"event_name"`

	/* [WHEN] TimeStamp of the event */
	EventTS string `json:"event_ts"`

	/* Allowed; was the user allowed to successfully execute the event */
	Allowed bool `json:"allowed"`

	/* ID of the log */
	LogId string `json:"log_id"`

	/* [WHO] ID of the user who fired the event */
	UserId string `json:"user_id"`

	/* IP address of the user */
	UserIP string `json:"user_ip"`

	/* Role assigned to user */
	RoleId string `json:"role_id"`

	/* TimeStamp of the log */
	LogTS string `json:"log_ts"`

	/* [WHERE] Application ID */
	AppId string `json:"app_id"`

	/* [WHERE] Workspace ID */
	WorkspaceId string `json:"workspace_id"`

	User user `json:"user"`
}

type AuditLogRealistic struct {
	/* ID of the event */
	EventId int64 `json:"event_id"`

	/* [WHAT] Unique, named identifier of the event */
	EventName string `json:"event_name"`

	/* [WHEN] TimeStamp of the event */
	EventTS int64 `json:"event_ts"`

	/* Allowed; was the user allowed to successfully execute the event */
	Allowed bool `json:"allowed"`

	/* ID of the log */
	LogId int64 `json:"log_id"`

	/* [WHO] ID of the user who fired the event */
	UserId string `json:"user_id"`

	/* IP address of the user */
	UserIP string `json:"user_ip"`

	/* Role assigned to user */
	RoleId string `json:"role_id"`

	/* Permissions assigned to user */
	Permissions []string `json:"permissions"`

	/* TimeStamp of the log */
	LogTS int64 `json:"log_ts"`

	/* [WHERE] Application ID */
	AppId string `json:"app_id"`

	/* [WHERE] Workspace ID */
	WorkspaceId string `json:"workspace_id"`

	/* Extra data associated with the event; schemaless. map[string]string is an alternative */
	EventData []KVP `json:"event_data"`

	/* Metadata associated with log, event, user; schemaless. map[string]string is an alternative */
	Metadata []KVP `json:"metadata"`

	User user `json:"user"`
}

type DBStore struct {
	db *sql.DB
}
