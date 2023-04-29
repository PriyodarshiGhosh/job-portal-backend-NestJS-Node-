exports.up = async function (knex) {
    const migration = await knex.schema.createTable("applications", function (table) {
      table.bigIncrements("id");
      table.string("uuid").index();
      table.string("resume").index();
      table.bigInteger("job_id").unsigned().references("jobs.id");
      table.bigInteger("user_id").unsigned().references("users.id");
    });
    return migration;
  };
  
  exports.down = async function (knex) {
    return knex.schema.dropTableIfExists("applications");
  };
