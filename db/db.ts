import knex from 'knex'

import fastifyPlugin from 'fastify-plugin'

export default fastifyPlugin(
  async function (app, opts = {}) {
    if (!app.db) {
      const db = knex({
        ...opts,
        client: 'pg',
        connection: {
          host: app.config.DB_HOST,
          port: app.config.DB_PORT,
          user: app.config.DB_USER,
          password: app.config.DB_PASSWORD,
          database: app.config.DB_ID,
          ssl: true,
          ...opts.connection,
        },
        pool: {
          min: 0,
          max: 7,
          afterCreate: (conn: any, done: () => void) =>
            conn.query('SET timezone="UTC";', function (err: Error) {
              if (err) {
                // first query failed,
                // return error and don't try to make next query
                console.error('ERROR CONNECTING TO DATABASE', err)
                done()
              } else {
                // do the second query...
                conn.query('SELECT set_limit(0.01);', function () {
                  console.log('DB Connected!🌲🌲🌳')
                  // if err is not falsy,
                  //  connection is discarded from pool
                  // if connection aquire was triggered by a
                  // query the error is passed to query promise
                  done()
                })
              }
            }),
        },
      })

      app.decorate('db', db)

      app.addHook('onClose', (app, done) => {
        if (app.db === db) {
          app.db.destroy(done)
        }
      })
      await db
        .raw('select 1+1 as result')
        .catch((err) => console.error('ERROR CONNECTING TO DATABASE!!!', err))
    }
  },
  { name: 'knex-postgres-connector' },
)
