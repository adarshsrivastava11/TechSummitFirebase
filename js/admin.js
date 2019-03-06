var config = {
	apiKey: "AIzaSyAQ4pytq6FA-MyzDJC46ICUtEbeZhdkxEY",
	authDomain: "techsubmit19.firebaseapp.com",
	databaseURL: "https://techsubmit19.firebaseio.com",
	projectId: "techsubmit19",
	storageBucket: "techsubmit19.appspot.com",
	messagingSenderId: "795576738170"
};
    var mainjson=[];
    firebase.initializeApp(config);
    var db = firebase.firestore();
    var pdat,dat,totamt=0;
    db.collection("adminpass").doc("code1").get().then(function(doc) {
        pdat=doc.data();}).catch(function(error) {
        console.log("Error getting documents: ", error);
    });

    function sendcomments(uid){
        var cmmt=document.getElementById(uid).value;
        // console.log(cmmt);
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
                datamaker();
                
        }
        else{
                window.alert("Wrong Password Entered");
        }}

function datamaker(){
    db.collection("users").orderBy("timeStamp").get()
    .then(function(querySnapshot) {
        document.getElementById("infoall").style.display="";
        document.getElementById("infotot").style.display="";
        querySnapshot.forEach(function(doc) {
        dat=doc.data();
        // console.log(dat);
        totamt+=1;
        dat.sno=totamt;
        // dat.push({"sno":totamt});
        mainjson.push(dat);
        });
    // mainjson.push(dataset);
    console.log(mainjson);
    vueapp();
}).catch(function(error) {
            console.log("Error getting documents: ", error);});
}
function vueapp(){
    var vm=new Vue({
        el:"#app",
        data:{mainjson,totamt}
    });
}
// var vm = new Vue({
//     el:"#app",
//     data () {
//       return {
//         datasets: []
//       }
//     },
//     mounted () {
//       db.collection("users").get().then((querySnapshot) => {
//         querySnapshot.forEach((doc) => {
//           this.datasets.push(doc.data());
//         });
//       });
//     }
//   });