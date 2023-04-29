exports.up = async function (knex) {
    const migration = await knex.schema.createTable("jobs", function (table) {
      table.bigIncrements("id");
      table.string("title").index();
      table.string("description").index();
      table.string("location").index();
      table.string("uuid").index();
      table.string("salary").index();
      table.boolean("is_active").defaultTo(false);
      table.bigInteger("recruiter_id").unsigned().references("users.id");
    });
    return migration;
  };
  
  exports.down = async function (knex) {
    return knex.schema.dropTableIfExists("jobs");
  };
