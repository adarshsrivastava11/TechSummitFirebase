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
    db.collection("users").orderBy("timeStamp").get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
        var dat=doc.data();
        totamt+=1;
        var node = document.createElement("TR");
        var count = document.createElement("TD");
        var name = document.createElement("TD");
        var college = document.createElement("TD");
        var city = document.createElement("TD");
        var phn = document.createElement("TD");
        var wrkshp = document.createElement("TD");
        var email = document.createElement("TD");
<<<<<<< HEAD
        var workshoppaid = document.createElement("TD");
        var acco = document.createElement("TD");

        var cc = document.createTextNode(totamt);
=======
        var pwrk = document.createElement("TD");
        var phos = document.createElement("TD");
>>>>>>> 8c6bb867a364e35d86be433f3713793c6d032aa0
        var nm = document.createTextNode(dat.name);
        var cllg = document.createTextNode(dat.college);
        var cty = document.createTextNode(dat.city);
        var phnnum = document.createTextNode(dat.phoneNumber);
        var wrk = document.createTextNode(dat.workshop);
        var em = document.createTextNode(dat.email);
<<<<<<< HEAD
        var wps = document.createTextNode(dat.paidWorkshop);
        var aps = document.createTextNode(dat.paidHospi);

        count.appendChild(cc);
=======
        var pwrkshp = document.createTextNode((dat.paidWorkshop)?"true":"false");
        var phospi = document.createTextNode((dat.paidHospi)?"true":"false");
>>>>>>> 8c6bb867a364e35d86be433f3713793c6d032aa0
        name.appendChild(nm);
        college.appendChild(cllg);
        city.appendChild(cty);
        phn.appendChild(phnnum);
        wrkshp.appendChild(wrk);
        email.appendChild(em);
<<<<<<< HEAD
        workshoppaid.appendChild(wps);
        acco.appendChild(aps);

        node.appendChild(count);
=======
        pwrk.appendChild(pwrkshp);
        phos.appendChild(phospi);
>>>>>>> 8c6bb867a364e35d86be433f3713793c6d032aa0
        node.appendChild(name);
        node.appendChild(college);
        node.appendChild(city);
        node.appendChild(phn);
        node.appendChild(wrkshp);
        node.appendChild(email);
<<<<<<< HEAD
        node.appendChild(workshoppaid);
        node.appendChild(acco);
=======
        node.appendChild(pwrk);
        node.appendChild(phos);
>>>>>>> 8c6bb867a364e35d86be433f3713793c6d032aa0
        document.getElementById("infoall").appendChild(node);
        });
        var node = document.createElement("LI");
        document.getElementById("infotot").appendChild(node);
        node.appendChild(document.createTextNode("Total Registrations: "+totamt));
    }).catch(function(error) {
        console.log("Error getting documents: ", error);
    });
}