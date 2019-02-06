var config = {
	apiKey: "AIzaSyAQ4pytq6FA-MyzDJC46ICUtEbeZhdkxEY",
	authDomain: "techsubmit19.firebaseapp.com",
	databaseURL: "https://techsubmit19.firebaseio.com",
	projectId: "techsubmit19",
	storageBucket: "techsubmit19.appspot.com",
	messagingSenderId: "795576738170"
};
    firebase.initializeApp(config);
    var db = firebase.firestore();
    function alldata(){
    var totamt=0;
    db.collection("users").get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
        var dat=doc.data();
        totamt+=1;
        // var txt="Name: "+dat.name+"\tCollege: "+dat.college+"\tCity: "+dat.city+"\tPhone Number: "+dat.phoneNumber+"\tWorkshop "+dat.workshop+"\tE-Mail:"+dat.email;
        var node = document.createElement("TR");
        var name = document.createElement("TD");
        var college = document.createElement("TD");
        var city = document.createElement("TD");
        var phn = document.createElement("TD");
        var wrkshp = document.createElement("TD");
        var email = document.createElement("TD");
        var nm = document.createTextNode(dat.name);
        var cllg = document.createTextNode(dat.college);
        var cty = document.createTextNode(dat.city);
        var phnnum = document.createTextNode(dat.phoneNumber);
        var wrk = document.createTextNode(dat.workshop);
        var em = document.createTextNode(dat.email);
        name.appendChild(nm);
        college.appendChild(cllg);
        city.appendChild(cty);
        phn.appendChild(phnnum);
        wrkshp.appendChild(wrk);
        email.appendChild(em);
        node.appendChild(name);
        node.appendChild(college);
        node.appendChild(city);
        node.appendChild(phn);
        node.appendChild(wrkshp);
        node.appendChild(email);
        document.getElementById("infoall").appendChild(node);
        });
        var node = document.createElement("LI");
        document.getElementById("infotot").appendChild(node);
        node.appendChild(document.createTextNode("Total Registrations: "+totamt));
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
}