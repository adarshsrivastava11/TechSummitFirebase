var app = new Vue({
  el: '#Intro',
  data () {
    return {
      intros: [],
      introContent: null
    }
  },
  mounted () {
    db.collection("intros").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        this.intros.push(doc.data());
      });
    });
  },
  methods: {
  	loadContent: function(intro){
  		introNumber = parseInt(intro.number)-1;
  		this.introContent = this.intros[introNumber].content;
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

var Speakers = new Vue({
  el: '#Speakers',
  data () {
    return {
      speakers: []
    }
  },
  mounted () {
    db.collection("spekers").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        this.speakers.push(doc.data());
      });
    });
  }
});

var Workshops = new Vue({
  el: '#Workshops',
  data () {
    return {
      workshops: []
    }
  },
  mounted () {
    db.collection("workshops").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        this.workshops.push(doc.data());
      });
    });
  },
  methods: {
  	selectWorkshop: function(workshop){
  		console.log(workshop);
  	}
  }
});