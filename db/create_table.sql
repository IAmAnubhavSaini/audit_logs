create table if not exists audit_logs.logs
(
    log_id          text,
    event_id        text,
    app_id          text,
    event_ts        text,
    log_ts          text,
    user_id         text,
    user_ip         text,
    workspace_id    text,
    allowed         text,
    user_email      text,
    user_full_name  text,
    user_first_name text,
    user_role_id    text,
    user_last_name  text
);

alter table audit_logs.logs
    owner to audit_logs_user;

