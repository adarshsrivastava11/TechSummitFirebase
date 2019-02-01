// Initialize Firebase
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

// Disable deprecated features
db.settings({
  timestampsInSnapshots: true
});
var uid = "";
var email = "";
var photoURL = "";
var displayName = "";
var workshopDetails = "";

function showModal(modal) {
    $(modal).iziModal('open');
}

function selectWorkshop() {
	workshopDetails = document.getElementById("sel1").value;
	document.getElementById("selectedWorkshop").textContent = "You have selected "+workshopDetails+" workshop";
}

function payWorkshopFees() {
	const eventcode = 'techsummitworkshop-34003';
	const payPrefill = {
		cq1: uid,	// custom question 1
		cq2: document.getElementById("phone").value,
		cq3: workshopDetails,
		emailid: email,
		name: displayName
	};
	payPrefill['eventcode'] = eventcode;
	popupWithAutoFill(payPrefill);
}
function payAccomodation() {
	const eventcode = 'techsummit-accomodation-fees-434033';
	const payPrefill = {
		cq1: uid,	// custom question 1
		cq2: document.getElementById("phone").value,
		cq3: workshopDetails,
		emailid: email,
		name: displayName
	};
	payPrefill['eventcode'] = eventcode;
	popupWithAutoFill(payPrefill);
}

function postData(){
	if(workshopDetails == "W0")
		alert("Please Select a Workshop!");
	else {
		$.post("https://us-central1-techsubmit19.cloudfunctions.net/helloWorld/",
		  {
		    displayName: displayName,
		    uid: uid,
		    college: document.getElementById("college").value,
		    city: document.getElementById("city").value,
		    email: email,
		    photoURL: photoURL,
		    phoneNumber: document.getElementById("phone").value,
		    workshop: workshopDetails
		  },
		  function(data,status){
		    console.log(data);
		    console.log(status);
		    if(status == "success"){
		    	alert("Registration Successful");
		    	document.getElementById("paymentButtons").style.display="block";
		    	document.getElementById("submit").disabled = true;
		    }
	  });
	}
}



function getData(){
  $.get("https://us-central1-techsubmit19.cloudfunctions.net/helloWorld/registrations?uid="+uid,
  function(data,status){
  	console.log(data);
  	if (data.data != "404") {
	    document.getElementById("college").value = data.data.college;
	    document.getElementById("phone").value = data.data.phoneNumber;
	    document.getElementById("city").value = data.data.city;
	}
  });
}

function toggleSignIn() {
	if (!firebase.auth().currentUser) {
	// [START createprovider]
	var provider = new firebase.auth.FacebookAuthProvider();
	// [END createprovider]
	// [START addscopes]
	// [END addscopes]
	// [START signin]
	firebase.auth().signInWithPopup(provider).then(function(result) {
	  // This gives you a Facebook Access Token. You can use it to access the Facebook API.
	  var token = result.credential.accessToken;
	  // The signed-in user info.
	  var user = result.user;
	  // [START_EXCLUDE]
	  // document.getElementById('quickstart-oauthtoken').textContent = token;
	  // [END_EXCLUDE]
	}).catch(function(error) {
	  // Handle Errors here.
	  var errorCode = error.code;
	  var errorMessage = error.message;
	  // The email of the user's account used.
	  var email = error.email;
	  // The firebase.auth.AuthCredential type that was used.
	  var credential = error.credential;
	  // [START_EXCLUDE]
	  if (errorCode === 'auth/account-exists-with-different-credential') {
	    alert('You have already signed up with a different auth provider for that email.');
	    // If you are using multiple auth providers on your app you should handle linking
	    // the user's accounts here.
	  } else {
	    console.error(error);
	  }
	  // [END_EXCLUDE]
	});
	// [END signin]
	} else {
	// [START signout]
	firebase.auth().signOut();
	// [END signout]
	}
	// [START_EXCLUDE]
	document.getElementById('quickstart-sign-in').disabled = true;
	// [END_EXCLUDE]
}
// [END buttoncallback]

/**
* initApp handles setting up UI event listeners and registering Firebase auth listeners:
*  - firebase.auth().onAuthStateChanged: This listener is called when the user is signed in or
*    out, and that is where we update the UI.
*/
function initApp() {
// Listening for auth state changes.
// [START authstatelistener]
	firebase.auth().onAuthStateChanged(function(user) {
	if (user) {
	  // User is signed in.
	  displayName = user.displayName;
	  email = user.email;
	  var emailVerified = user.emailVerified;
	  photoURL = user.photoURL;
	  var isAnonymous = user.isAnonymous;
	  uid = user.uid;
	  var providerData = user.providerData;
	  // [START_EXCLUDE]
	  document.getElementById('quickstart-sign-in').textContent = 'Log out';
	  document.getElementById('photoURL').src = photoURL;
	  document.getElementById('displayName').value = displayName;
	  document.getElementById("email").value = email;
	  getData();
	  db.collection("users").doc(uid)
	    .onSnapshot(function(doc) {
	    	response = doc.data();
	    	console.log(response);
	    	if(response.paidWorkshop == true && (response.paidHospi == undefined || response.paidHospi == false)){
	    		document.getElementById("paymentStatus").textContent = "You paid workshop fees, Please pay the Accomadation Fees to complete the process.";
	    		document.getElementById("paymentButtons").style.display="block";
	    		document.getElementById("workshopFees").style.display = "none";
	    		document.getElementById("accomodationFees").style.display = "inline";
	    	}
	    	if(response.paidHospi == true && (response.paidWorkshop == undefined || response.paidWorkshop == false)){
	    		document.getElementById("paymentStatus").textContent = "You paid Accomadation fees, Please pay the Workshop Fees to complete the process.";
	    		document.getElementById("paymentButtons").style.display = "block";
	    		document.getElementById("workshopFees").style.display = "inline";
	    		document.getElementById("accomodationFees").style.display = "none";
	    	}
	    	if(response.paidWorkshop == true && response.paidHospi == true){
	    	    document.getElementById("paymentStatus").textContent = "Your Payment Process is Done! See you at the Summit";
	    	    document.getElementById("workshopFees").style.display = "none";
	    	    document.getElementById("accomadationFees").style.display = "none";
	    	    document.getElementById("yes-registration").style.display = "block";
	    	    document.getElementById("no-registration").style.display = "none";
	    	}
	});
	  // [END_EXCLUDE]
	} else {
	  // User is signed out.
	  // [START_EXCLUDE]
	  // document.getElementById('quickstart-sign-in').textContent = 'Continue With Facebook';
	  // document.getElementById("submit").disabled = true;
	  // [END_EXCLUDE]
	}
	// [START_EXCLUDE]
	document.getElementById('quickstart-sign-in').disabled = false;
	// [END_EXCLUDE]
	});
	// [END authstatelistener]

	document.getElementById('quickstart-sign-in').addEventListener('click', toggleSignIn, false);
}

window.onload = function() {
	initApp();
};