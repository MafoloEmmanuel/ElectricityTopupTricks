const express = require('express');
const exphbs  = require('express-handlebars');
const pg = require('pg');
const Pool = pg.Pool;

const app = express();
const PORT =  process.env.PORT || 3017;

const ElectricityMeters = require('./electricity-meters');

let useSSL = false;
let local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local) {
    useSSL = { rejectUnauthorized: false };
}
const connectionString = process.env.DATABASE_URL || 'postgresql://emmanuel:201735469@localhost:5432/coderdb';

const pool = new Pool({
    connectionString :connectionString ,
	ssl:useSSL
});

// enable the req.body object - to allow us to use HTML forms
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// enable the static folder...
app.use(express.static('public'));

// add more middleware to allow for templating support

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

const electricityMeters = ElectricityMeters(pool);

app.get('/', function(req, res) {
res.render('index');
});

app.get('/streets', async function(req, res) {
	const streets = await electricityMeters.streets();
	console.log(streets);
	res.render('streets', {
		streets
	});
});
app.get('/appliances',async (req,res)=>{
	const appliance = await electricityMeters.appliances()
	res.render('appliances',{appliance});
})
app.get('/meter/:street_id', async function(req, res) {
// use the streetMeters method in the factory function...
	// send the street id in as sent in by the URL parameter street_id - req.params.street_id

	// create  template called street_meters.handlebars
	// in there loop over all the meters and show them on the screen.
	// show the street number and name and the meter balance
	var streetId = req.params.street_id;
	var meters= await electricityMeters.streetMeters(streetId);
	res.render('street_meters', {
		meters
	});
});

app.get('/meter/use/:meter_id', async function(req, res) {

	// show the current meter balance and select the appliance you are using electricity for
	const meters = await electricityMeters.useElectricity(meterId,units);

	res.render('use_electicity', {
		meters
	});
});

app.post('/meter/use/:meter_id', async function(req, res) {

	// update the meter balance with the usage of the appliance selected.
	var meterId = req.params.meter_id;
	var units = req.body.units
	const updateBalance = await electricityMeters.useElectricity(meterId,units);
	await electricityMeters.meterData(meterId);
	res.render(`/meter/user/${req.params.meter_id}`,{updateBalance});

});

// start  the server and start listening for HTTP request on the PORT number specified...
app.listen(PORT, function() {
	console.log(`App started on port ${PORT}`)
});