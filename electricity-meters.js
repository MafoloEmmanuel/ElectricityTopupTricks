// this is our
module.exports = function(pool) {

	// list all the streets the we have on records
	async function streets() {
		const streets = await pool.query(`select * from street`);
		return streets.rows;
	}

	// for a given street show all the meters and their balances
	async function streetMeters(streetId) {
var result= await pool.query('select meter_number,balance from electricity_meter where street_id=$1 ',[streetId]);
return result.rows
	}

	// return all the appliances
	async function appliances() {
var result = await pool.query('select name,rate from appliance');
return result.rows
	}

	// increase the meter balance for the meterId supplied
	async function topupElectricity(meterId, units) {

	}
	
	// return the data for a given balance
	async	function meterData(meterId) {
	
	}

	// decrease the meter balance for the meterId supplied
	async function useElectricity(meterId, units) {
	
	}

	return {
		streets,
		streetMeters,
		appliances,
		topupElectricity,
		meterData,
		useElectricity
	}


}