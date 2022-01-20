// this is our
module.exports = function(pool) {

	// list all the streets the we have on records
	async function streets() {
		const streets = await pool.query(`select * from street`);
		return streets.rows;
	}

	// for a given street show all the meters and their balances
	async function streetMeters(streetId) {
var result= await pool.query('select name,street_number, meter_number,balance from electricity_meter em join street st on em.street_id=st.id where street_id=$1;',[streetId]);
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
	var result = await pool.query('select street_number,street_id,balance,meter_number,name from electricity_meter em join street st on em.street_id=st.id where street_id=$1',[meterId]);
	return result.rows
	}

	// decrease the meter balance for the meterId supplied
	async function useElectricity(meterId, units) {

	await pool.query('update electricity_meter set balance= balance - $2 where street_id=$1',[meterId,units]);
	var result =await pool.query('select street_id,balance from electricity_meter where street_id=$1',[meterId]);
	return result.rows

	}
async function lowestBalanceMeter(){
	var result = await pool.query('select balance,street_number,name from electricity_meter em join street st on em.street_id=st.id  order by balance limit 1');
	return result.rows;
}

async function highestBalanceStreet(){
var result = await pool.query('select name,sum(balance) total_balance from electricity_meter em join street st on em.street_id=st.id group by balance,name order by total_balance desc limit 1');
return result.rows
}
	return {
		streets,
		streetMeters,
		appliances,
		topupElectricity,
		meterData,
		useElectricity,
		lowestBalanceMeter,
		highestBalanceStreet
	}


}