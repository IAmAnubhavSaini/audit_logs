# audit logs

#postgres #react #golang

A sample application with backend written in golang, and frontend in react. The database used in backend is postgres. 

It is bare bones. And only provides db read. Write functionality depends upon time availability.

Data is available in db/.

Urls:

- DB: localhost:10901
- WebServer: http://localhost:10081
- WebClient: http://localhost:3000

If you want to generate data from scratch, before db/ go to data/

## Setup

```

# db/

docker run --name="audit_logs_db" -p10901:5432 -ePOSTGRES_DB=localnotes -ePOSTGRES_USER="audit_logs_user" -ePOSTGRES_PASSWORD="password" -ePGDATA=/var/lib/postgresql/data/pgdata -v $PWD/audit_logs:/var/lib/postgresql/data -d postgres

## time for db/create_table.sql and db/insert.sql

# be/

go run *.go

# fe/

yarn && yarn start


```

## License 

Apache
