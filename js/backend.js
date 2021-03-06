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
var phoneNumber = "";
var workshopDetails = "";
var tidc=0;
function showModal(modal) {
	$(modal).iziModal('open');
}

function selectWorkshop() {
	workshopDetails = document.getElementById("sel1").value;
	document.getElementById("selectedWorkshop").textContent = "You have selected " + workshopDetails + " workshop";
}

function payWorkshopFees() {
	const eventcode = 'techsummitworkshop-34003';
	const payPrefill = {
		cq1: uid,	// custom question 1
		cq2: workshopDetails,
		cq3: '+91'+  document.getElementById("phone").value,
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
		cq2: workshopDetails,
		cq3: '+91' + document.getElementById("phone").value,
		emailid: email,
		name: displayName
	};
	payPrefill['eventcode'] = eventcode;
	popupWithAutoFill(payPrefill);
}

function postData() {
	console.log(document.getElementById("college").value);
	if (workshopDetails == "NO")
		alert("Please Select a Workshop!");
	if (document.getElementById("college").value == '')
		alert("Can't Summit without this Data");
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
			function (data, status) {
				console.log(data);
				if (status == "success") {
					iziToast.success({
						position: 'center',
						title: 'Success',
						message: 'Details updated. Now you may proceed for payments.',
						overlay: true,
						overlayClose: true
					});
					document.getElementById("paymentButtons").style.display = "block";
				}
			});
	}
}

function getData() {
	$.get("https://us-central1-techsubmit19.cloudfunctions.net/helloWorld/registrations?uid=" + uid,
		function (data, status) {
			console.log(data);
			if (data.data != "404") {
				document.getElementById("college").value = data.data.college;
				document.getElementById("phone").value = data.data.phoneNumber;
				document.getElementById("city").value = data.data.city;
				document.getElementById("sel1").value = data.data.workshop;
				tidc=data.data.summitId;
				document.getElementById("tchid").textContent = "Summit ID : "+tidc;
				if (!data.data.workshop) {
					document.getElementById("selectedWorkshop").textContent = "You have not registered for any workshop yet.";	
				} else {
					document.getElementById("selectedWorkshop").textContent = "You have selected " + data.data.workshop + " workshop.";	
				}
				document.getElementById("paymentButtons").style.display = "block";			}
		});
}

function toggleSignIn() {
	if (!firebase.auth().currentUser) {
		var provider = new firebase.auth.FacebookAuthProvider();
		firebase.auth().signInWithPopup(provider).then(function (result) {
			// This gives you a Facebook Access Token. You can use it to access the Facebook API.
			var token = result.credential.accessToken;
			// The signed-in user info.
			var user = result.user;
		}).catch(function (error) {
			// Handle Errors here.
			var errorCode = error.code;
			var errorMessage = error.message;
			// The email of the user's account used.
			var email = error.email;
			// The firebase.auth.AuthCredential type that was used.
			var credential = error.credential;
			if (errorCode === 'auth/account-exists-with-different-credential') {
				alert('You have already signed up with a different auth provider for that email.');
				// If you are using multiple auth providers on your app you should handle linking
				// the user's accounts here.
			} else {
				console.error(error);
			}
		});
	} else {
		firebase.auth().signOut();
		location.reload();
	}
	document.getElementById('quickstart-sign-in').disabled = true;
}

/**
* initApp handles setting up UI event listeners and registering Firebase auth listeners:
*  - firebase.auth().onAuthStateChanged: This listener is called when the user is signed in or
*    out, and that is where we update the UI.
*/
function initApp() {
	// Listening for auth state changes.
	firebase.auth().onAuthStateChanged(function (user) {
		if (user) {
			// User is signed in.
			document.getElementById('sticky-login-button').style.display = 'none';
			document.getElementById('sticky-dashboard-button').style.display = 'block';
			document.getElementById('dashboardButtonMain').style.display = 'block';
			displayName = user.displayName;
			email = user.email;
			var emailVerified = user.emailVerified;
			photoURL = user.photoURL;
			var isAnonymous = user.isAnonymous;
			uid = user.uid;
			var providerData = user.providerData;
			document.getElementById('quickstart-sign-in').textContent = 'Log out';
			document.getElementById('photoURL').src = photoURL;
			document.getElementById('displayName').value = displayName;
			document.getElementById("email").value = email;
			getData();
			db.collection("users").doc(uid)
				.onSnapshot(function (doc) {
					response = doc.data();
					$('#dashboard').iziModal('open');
					console.log(response);
					if (!response.paidWorkshop && !response.paidHospi) {
						document.getElementById("paymentStatus").textContent = "Please proceed to pay both workshop fees and accomodation fees";
						document.getElementById("paymentStatus").classList.add('success');
						document.getElementById("paymentStatus").classList.remove('warn');
					}
					if (response.paidWorkshop == true && (response.paidHospi == undefined || response.paidHospi == false)) {
						document.getElementById("paymentStatus").textContent = "You paid the workshop fees, Please pay the Accomadation Fees to complete the process.";
						document.getElementById("paymentStatus").classList.add('success');
						document.getElementById("paymentStatus").classList.remove('warn');
						document.getElementById("paymentButtons").style.display = "block";
						document.getElementById("workshopFees").style.display = "none";
						document.getElementById("accomodationFees").style.display = "inline";
					}
					if (response.paidHospi == true && (response.paidWorkshop == undefined || response.paidWorkshop == false)) {
						document.getElementById("paymentStatus").textContent = "You paid the Accomadation fees, Please pay the workshop Fees to complete the process.";
						document.getElementById("paymentStatus").classList.add('success');
						document.getElementById("paymentStatus").classList.remove('warn');
						document.getElementById("paymentButtons").style.display = "block";
						document.getElementById("workshopFees").style.display = "inline";
						document.getElementById("accomodationFees").style.display = "none";
					}
					if (response.paidWorkshop == true && response.paidHospi == true) {
						document.getElementById("paymentStatus").textContent = "Your Payment Process is Done! See you at the Summit";
						document.getElementById("paymentStatus").classList.add('success');
						document.getElementById("paymentStatus").classList.remove('warn');
						document.getElementById("workshopFees").style.display = "none";
						document.getElementById("accomodationFees").style.display = "none";
						document.getElementById("yes-registration").style.display = "block";
						document.getElementById("no-registration").style.display = "none";
					}
				});
		} else {
			document.getElementById('quickstart-sign-in').textContent = 'LOGIN WITH FACEBOOK';
			document.getElementById('dashboardButtonMain').style.display = 'none';
			document.getElementById('sticky-dashboard-button').style.display = 'none';
			document.getElementById('sticky-login-button').style.display = 'block';
		}
	});
	document.getElementById('quickstart-sign-in').addEventListener('click', toggleSignIn, false);
	document.getElementById('floating-sign-in').addEventListener('click', toggleSignIn, false);
}

function techidprovider(){
	var userRef = db.collection("users").doc(""+uid);
	var tidRef = db.collection("users").doc("tidcount");
	if(!tidc)
	tidRef.get().then(function(doc){
		tidc=doc.data()+1;
		userRef.update({
        summitId: tidc
        }).then(function() {
			tidRef.set({
				tid:tidc})
    }).catch(function(error) {
    console.error("Error updating document: ", error);
});})
}

window.onload = function () {
	initApp();
};