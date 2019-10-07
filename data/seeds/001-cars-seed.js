//pre-populate our database with sample data in order to see it in action. 
//Seeds allow us to easily add and reset sample data.

exports.seed = function(knex, Promise) {
  // delete - Deletes ALL existing entries
  //if you leave off truncate or delete you will get a sqlite error because of the unique constraint
  //so we need to truncate new information before we seed new data
  return knex('cars').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('cars').insert([
        {make: 'cadillac', model: 'x5', mileage: 100000, transmissiontype: 'large', titlestatus: 'clean'},
        {make: 'toyota', model: 'corolla', mileage: 50000, transmissiontype: 'small', titlestatus: 'salvage'},
        {make: 'vw', model: 'jetta', mileage: 30000, transmissiontype: 'medium', titlestatus: 'clean'},
        {make: 'mercedes', model: 'benz', mileage: 20000, transmissiontype: 'small', titlestatus: 'salvage'},        
        {make: 'ford', model: 'f150', mileage: 250000, transmissiontype: 'tiny', titlestatus: 'clean'}       
      ]);
    });
};



