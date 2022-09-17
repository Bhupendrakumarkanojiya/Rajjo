module.exports = {
  test: {
    client: 'postgresql',
    connection: {
      host: 'localhost',
      database: 'taste-up-db',
      user: 'postgres',
      password: 'postgres',
    },
    pool: { min: 1, max: 4 },
    migrations: {
      directory: './db/migrations',
      tableName: 'migrations',
    },
    seeds: {
      directory: './db/seeds',
    },
  },

  development: {
    client: 'postgresql',
    connection: {
      host: process.env.DB_HOST || 'localhost', // DB_HOST is required if running via docker
      database: process.env.DB_NAME || 'taste-up-db',
      user: 'postgres',
      password: 'postgres',
    },
    migrations: {
      directory: './db/migrations',
      tableName: 'migrations',
    },
    seeds: {
      directory: './db/seeds',
    },
  },

  staging: {
    client: 'postgresql',
    connection: {
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: './db/migrations',
      tableName: 'migrations',
    },
    seeds: {
      directory: './db/seeds',
    },
  },

  production: {
    client: 'postgresql',
    connection: {
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: './db/migrations',
      tableName: 'migrations',
    },
    seeds: {
      directory: './db/seeds',
    },
  },
  dbManager: {
    // db manager related configuration
    superUser: process.env.PG_USER || 'postgres',
    superPassword: process.env.PG_PASS || '',
  },
};
