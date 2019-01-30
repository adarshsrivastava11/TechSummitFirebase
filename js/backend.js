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
function postData(){
	alert("Hi");
	document.getElementById("payments").style.visibility = "visible";
  $.post("https://us-central1-techsubmit19.cloudfunctions.net/helloWorld/",
  {
    displayName: displayName,
    uid: uid,
    college: document.getElementById("college").value,
    email: email,
    photoURL: photoURL,
    phoneNumber: document.getElementById("phone").value
  },
  function(data,status){
    console.log(data);
    console.log(status);
    if(status == "success"){
    	document.getElementById("payments").style.visibility = "visible";
    }
  });
}

function getData(){
  $.get("https://us-central1-techsubmit19.cloudfunctions.net/helloWorld/registrations?uid="+uid,
  function(data,status){
  	var obj = JSON.parse(data);
    document.getElementById("college").value = obj.college;
    document.getElementById("phone").value = obj.phone;
    document.getElementById("city").value = obj.city;
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
	  document.getElementById('quickstart-oauthtoken').textContent = token;
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
	  document.getElementById('displayName').textContent = displayName;
	  document.getElementById("email").textContent = email;
	  console.log(email);
	  document.getElementById("submit").disabled = false;
	  getData();
	  // [END_EXCLUDE]
	} else {
	  // User is signed out.
	  // [START_EXCLUDE]
	  document.getElementById('quickstart-sign-in').textContent = 'Log in with Facebook';
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