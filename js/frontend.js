var jsonResonse;
var app = new Vue({
el: '#app',
data () {
return {
  workshops: null,
  workshopContent: null
}
},
mounted () {
axios
  .get('https://firebasestorage.googleapis.com/v0/b/techsubmit19.appspot.com/o/data.json?alt=media&token=c42d4db2-d271-4a6b-ac9f-a86ef923fd0a')
  .then(response => {
  	jsonResonse = response.data;
  	this.workshops = jsonResonse.workshops;
  })
},
methods: {
	loadContent: function(workshop){
		workshopNumber = parseInt(workshop.number)-1;
		this.workshopContent = jsonResonse.workshops[workshopNumber].content;
	}
}
});

var Sponsers = new Vue({
el: '#Sponsers',
data () {
return {
  sponsers: null
}
},
mounted () {
axios
  .get('https://firebasestorage.googleapis.com/v0/b/techsubmit19.appspot.com/o/data.json?alt=media&token=c42d4db2-d271-4a6b-ac9f-a86ef923fd0a')
  .then(response => {
  	this.sponsers = response.data.sponsers;
  })
}
});
var JPO = new Vue({
el: '#JPO',
data () {
return {
  workshops: null
}
},
mounted () {
axios
  .get('https://firebasestorage.googleapis.com/v0/b/techsubmit19.appspot.com/o/data.json?alt=media&token=c42d4db2-d271-4a6b-ac9f-a86ef923fd0a')
  .then(response => {
  	this.workshops = response.data.workshops;
  })
},
methods: {
	selectWorkshop: function(workshop){
		workshopDetails = workshop;
		console.log(workshopDetails);
	}
}
});