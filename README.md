# url-shortener
Simple URL Shortener

## Description

A simple url shortener service.

## Installation

```bash
$ npm install
```

## Seed and Migrations

```bash
# Create Migrations
$ npx sequelize-cli migration:generate --name [name_of_your_migration]
```

``` bash
# Run Migrations Up
$ npx sequelize-cli db:migrate
```

``` bash
# Run Migrations Down
$ npx sequelize-cli db:migrate:undo
```

## Running the app

```bash
# development
$ npm run start
```

## Test

```bash
# unit tests
$ npm run test
```
