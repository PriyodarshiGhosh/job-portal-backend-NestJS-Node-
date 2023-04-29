exports.up = async function (knex) {
    const migration = await knex.schema.createTable("users", function (table) {
      table.bigIncrements("id");
      table.string("email").notNullable();
      table.string("password");
      table.string("role").index();
      table.string("uuid").index();
      table.boolean("is_active").defaultTo(true);
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
    });
    return migration;
  };
  
  exports.down = async function (knex) {
    return knex.schema.dropTableIfExists("users");
  };
