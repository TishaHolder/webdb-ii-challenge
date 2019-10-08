
exports.up = function(knex, Promise) {
    return knex.schema.createTable('cars', tbl => {//up represents the changes we want to make to our schema  
        //tbl.string('VIN', 25).notNullable().unique().primary();  
        //make numbers string if you will not be performing mathematical operations on it    
        tbl.increments('VIN');//auto incrementing primary key
        tbl.string('make', 128)
            .notNullable();
        tbl.string('model', 128)
            .notNullable();
        tbl.integer('mileage')
            .notNullable();
        //don't use spaces in table or column names (use underscores, dashes, or camelCasing)
        tbl.string('transmissiontype', 1024); //could use .defaultsTo('value-here')
        tbl.string('titlestatus', 128);
    })
  
};

//down represents logic to undo changes in case something goes wrong
exports.down = function(knex, Promise) {

    //dropTableIfExists method takes in the name of the table we want to drop
    return knex.schema.dropTableIfExists('cars');    
  
};


  
  
  
