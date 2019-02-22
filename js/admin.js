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
    var pdat,dat;
    db.collection("adminpass").get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
        pdat=doc.data();});
    }).catch(function(error) {
        console.log("Error getting documents: ", error);
    });

    function sendcomments(uid){
        var cmmt=document.getElementById(uid).value;
        var userRef = db.collection("users").doc(""+uid);
    return userRef.update({
        comment: cmmt
        }).then(function() {
    window.alert("Updated Successfully");
    }).catch(function(error) {
    console.error("Error updating document: ", error);
});
    }

    function verify(){
        keynew=document.getElementById("adp").value;
        if(keynew==pdat.password){
                alldata();
        }
        else{
                window.alert("Wrong Password Entered");
        }}

    function alldata(){
    var totamt=0;
    db.collection("users").orderBy("timeStamp").get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
        dat=doc.data();
        totamt+=1;
        var node = document.createElement("TR");
        var count = document.createElement("TD");
        var remarkctab = document.createElement("TD");
        var remarkc = document.createElement("INPUT");
        remarkc.setAttribute("id", dat.uid);
        var subbut = document.createElement("TD");
        var submitbutt = document.createElement("BUTTON");
        submitbutt.setAttribute("id", dat.uid+"s");
        submitbutt.setAttribute("class", "btn btn-success");
        submitbutt.setAttribute("type", "submit");
        submitbutt.setAttribute("onclick", "sendcomments(\""+dat.uid+"\")");
        var remarketab = document.createElement("TD");
        var name = document.createElement("TD");
        var college = document.createElement("TD");
        var city = document.createElement("TD");
        var phn = document.createElement("TD");
        var wrkshp = document.createElement("TD");
        var email = document.createElement("TD");
        var pwrk = document.createElement("TD");
        var phos = document.createElement("TD");
        var submtxt=document.createTextNode("Submit");
        var cntr=document.createTextNode(totamt);
        var cm=dat.comment?dat.comment:"";
        var rmke = document.createTextNode(cm);
        var nm = document.createTextNode(dat.name);
        var cllg = document.createTextNode(dat.college);
        var cty = document.createTextNode(dat.city);
        var phnnum = document.createTextNode(dat.phoneNumber);
        var wrk = document.createTextNode(dat.workshop);
        var em = document.createTextNode(dat.email);
        var pwrkshp = document.createTextNode((dat.paidWorkshop)?"true":"false");
        var phospi = document.createTextNode((dat.paidHospi)?"true":"false");
        remarketab.appendChild(rmke);
        remarkctab.appendChild(remarkc);
        submitbutt.appendChild(submtxt);
        subbut.appendChild(submitbutt);
        count.appendChild(cntr);
        name.appendChild(nm);
        college.appendChild(cllg);
        city.appendChild(cty);
        phn.appendChild(phnnum);
        wrkshp.appendChild(wrk);
        email.appendChild(em);
        pwrk.appendChild(pwrkshp);
        phos.appendChild(phospi);
        node.appendChild(count);
        node.appendChild(name);
        node.appendChild(college);
        node.appendChild(city);
        node.appendChild(phn);
        node.appendChild(wrkshp);
        node.appendChild(email);
        node.appendChild(pwrk);
        node.appendChild(phos);
        node.appendChild(remarkctab);
        node.appendChild(subbut);
        node.appendChild(remarketab);
        document.getElementById("infoall").appendChild(node);
        });
        var node = document.createElement("LI");
        document.getElementById("infotot").appendChild(node);
        node.appendChild(document.createTextNode("Total Registrations: "+totamt));
    }).catch(function(error) {
        console.log("Error getting documents: ", error);
    });
}