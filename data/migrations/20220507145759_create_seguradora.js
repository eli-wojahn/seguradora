exports.up = function (knex) {
    return knex.schema.createTable("seguradora", (table) => {
        table.increments();
        table.string("cliente_nome", 80).notNullable();
        table.integer("cliente_cpf", 11).notNullable();
        table.string("ocorrencia", 180).notNullable();
        table.string("cidade", 60).notNullable();
        table.string("local", 100).notNullable();
        table.string("envolve_terceiros", 3).notNullable();
        table.timestamps(true, true);

        table.integer("carros_id").notNullable().unsigned();
        table.foreign("carros_id").references("carros.id")
            .onDelete("restrict").onUpdate("cascade");
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable("seguradora");
};
