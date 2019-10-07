
exports.up = function(knex, Promise) {
    return knex.schema.createTable('cars', tbl => {//up represents the changes we want to make to our schema
        tbl.increments('VIN');//auto incrementing primary key
        tbl.string('make', 128)
            .notNullable();
        tbl.string('model', 128)
            .notNullable();
        tbl.integer('mileage')
            .notNullable();
        tbl.string('transmissiontype', 1024);
        tbl.string('titlestatus', 128);
    })
  
};

//down represents logic to undo changes in case something goes wrong
exports.down = function(knex, Promise) {

    //dropTableIfExists method takes in the name of the table we want to drop
    return knex.schema.dropTableIfExists('cars');    
  
};


  
  
  
