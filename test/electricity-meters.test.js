const assert = require("assert");
const pg = require('pg');
const Pool = pg.Pool;
const ElectricityMeters = require('../electricity-meters');

const connectionString = process.env.DATABASE_URL || 'postgresql://tsheledi:201735469@localhost:5432/topups_db';

const pool = new Pool({
    connectionString  
});

describe("The Electricity meter", function() {

	beforeEach(async function() {
await pool.query('delete from electricity_meter')	;

await pool.query(" insert into electricity_meter (street_number, street_id, balance,meter_number) values (1, 1, 50, 'ABC123')" );
await pool.query("insert into electricity_meter (street_number, street_id, balance,meter_number) values (6, 1, 50, 'DEF123')");
await pool.query("insert into electricity_meter (street_number, street_id, balance,meter_number) values (8, 1, 50, 'GHI123')");
await pool.query("insert into electricity_meter (street_number, street_id, balance,meter_number) values (12, 2, 50, 'JKL123')");
await pool.query("insert into electricity_meter (street_number, street_id, balance,meter_number) values (7, 2, 50, 'MNO123')");
await pool.query("insert into electricity_meter (street_number, street_id, balance,meter_number) values (5, 2, 50, 'PQR123')");
await pool.query("insert into electricity_meter (street_number, street_id, balance,meter_number) values (11, 3, 50, 'STU123')");
await pool.query("insert into electricity_meter (street_number, street_id, balance,meter_number) values (6, 3, 50, 'VWX123')");
await pool.query("insert into electricity_meter (street_number, street_id, balance,meter_number) values (13, 3, 50, 'YZA123')");

	});

	it("should see all the streets", async function() {
		const electricityMeters = ElectricityMeters(pool);
		const streets = await electricityMeters.streets();

		const streetList = [
			 {
			   "id": 1,
			   "name": "Miller Street"
			 },
			 {
			   "id": 2,
			   "name": "Mathaba Crescent"
			 },
			 {
			   "id": 3,
			   "name": "Vilakazi Road"
			 }]
			

		assert.deepStrictEqual(streetList, streets);

	});

	it("for a given street show all the meters and their balances", async function() {

		const electricityMeters = ElectricityMeters(pool);
		
		assert.deepStrictEqual([
			{
			  name: 'Miller Street',
			  street_number: '1',
			  meter_number: 'ABC123',
			  balance: '50.00'
			},
			{
			  name: 'Miller Street',
			  street_number: '6',
			  meter_number: 'DEF123',
			  balance: '50.00'
			},
			{
			  name: 'Miller Street',
			  street_number: '8',
			  meter_number: 'GHI123',
			  balance: '50.00'
			}
		  ], await electricityMeters.streetMeters(1));
		assert.deepStrictEqual([
			{
			  name: 'Mathaba Crescent',
			  street_number: '12',
			  meter_number: 'JKL123',
			  balance: '50.00'
			},
			{
			  name: 'Mathaba Crescent',
			  street_number: '7',
			  meter_number: 'MNO123',
			  balance: '50.00'
			},
			{
			  name: 'Mathaba Crescent',
			  street_number: '5',
			  meter_number: 'PQR123',
			  balance: '50.00'
			}
		  ], await electricityMeters.streetMeters(2));
		assert.deepStrictEqual([
			{
			  name: 'Vilakazi Road',
			  street_number: '11',
			  meter_number: 'STU123',
			  balance: '50.00'
			},
			{
			  name: 'Vilakazi Road',
			  street_number: '6',
			  meter_number: 'VWX123',
			  balance: '50.00'
			},
			{
			  name: 'Vilakazi Road',
			  street_number: '13',
			  meter_number: 'YZA123',
			  balance: '50.00'
			}
		  ], await electricityMeters.streetMeters(3));


	});

	it("should see all the appliances", async function() {

		const electricityMeters = ElectricityMeters(pool);
		const appliances = await electricityMeters.appliances();
		
		assert.deepStrictEqual([
			{ name: 'Stove', rate: '4.50' },
			{ name: 'TV', rate: '1.80' },
			{ name: 'Heater', rate: '3.50' },
			{ name: 'Fridge', rate: '4.00' },
			{ name: 'Kettle', rate: '2.70' }
		  ], appliances);

	});
/*

	it("should be able to topup electricity", async function() {

		const electricityMeters = ElectricityMeters(pool);
		const appliances = await electricityMeters.topupElectricity(3, 20);
		const meterData = await electricityMeters.meterData(3);
		assert.deepStrictEqual(70, meterData.balance);

	});

	*/

	it(' For a given meterId, return all the data for it ', async function(){
		const electricityMeters = ElectricityMeters(pool);
assert.deepStrictEqual([
	{
	  street_number: '1',
	  street_id: 1,
	  balance: '50.00',
	  meter_number: 'ABC123',
	  name: 'Miller Street'
	},
	{
	  street_number: '6',
	  street_id: 1,
	  balance: '50.00',
	  meter_number: 'DEF123',
	  name: 'Miller Street'
	},
	{
	  street_number: '8',
	  street_id: 1,
	  balance: '50.00',
	  meter_number: 'GHI123',
	  name: 'Miller Street'
	}
  ], await electricityMeters.meterData(1));
assert.deepStrictEqual([{
    street_number: '12',
    street_id: 2,
    balance: '50.00',
    meter_number: 'JKL123',
    name: 'Mathaba Crescent'
  },
  {
    street_number: '7',
    street_id: 2,
    balance: '50.00',
    meter_number: 'MNO123',
    name: 'Mathaba Crescent'
  },
  {
    street_number: '5',
    street_id: 2,
    balance: '50.00',
    meter_number: 'PQR123',
    name: 'Mathaba Crescent'
  }], await electricityMeters.meterData(2));
assert.deepStrictEqual([{
    street_number: '11',
    street_id: 3,
    balance: '50.00',
    meter_number: 'STU123',
    name: 'Vilakazi Road'
  },
  {
    street_number: '6',
    street_id: 3,
    balance: '50.00',
    meter_number: 'VWX123',
    name: 'Vilakazi Road'
  },
  {
    street_number: '13',
    street_id: 3,
    balance: '50.00',
    meter_number: 'YZA123',
    name: 'Vilakazi Road'
  }], await electricityMeters.meterData(3));

	})
	it("should be able to use electricity", async function() {

		const electricityMeters = ElectricityMeters(pool);
		const appliances = await electricityMeters.useElectricity(2, 20);

		//const meterData = await electricityMeters.meterData(2);
	//	assert.deepStrictEqual(30, meterData.balance);
		assert.deepStrictEqual([
			{  balance: '30.00' },
			{  balance: '30.00' },
			{  balance: '30.00' }
		  ],appliances );
		
	});
	it('SHould see the meter with lowest balance', async function(){
		const electricityMeters = ElectricityMeters(pool);
		await electricityMeters.useElectricity(1, 17);
		assert.deepStrictEqual([ { balance: '33.00', name: 'Miller Street' } ], await electricityMeters.lowestBalanceMeter())
	});

it('SHould see the name of street with highest total balance', async function(){
		const electricityMeters = ElectricityMeters(pool);
		await electricityMeters.useElectricity(1, 17);
		assert.deepStrictEqual([ { name: 'Mathaba Crescent', total_balance: '150.00' } ], await electricityMeters.highestBalanceStreet())
	});
	this.afterAll(function() {
		pool.end();
	});

});