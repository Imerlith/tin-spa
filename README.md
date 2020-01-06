# tin-spa
TIN project spa version

        docker run --name tin-db -p 3306:3306 -e MYSQL_ROOT_PASSWORD=tin -d mysql
        docker exec -it tin-db mysql -uroot -p
        CREATE DATABASE tin;
        docker cp ./Przemek_DB_create.sql tin-db:/create.sql
        docker exec -it tin-db  bin/bash
        mysql -u root -p
        use tin
        source /create.sql
