function poster(){
    // var bodymade=document.getElementById("body_of_mail").value;
    var subj='Tech Summit Registration';
    var phn=document.getElementById("phone").value;
    var college=document.getElementById("college").value;
    var name=document.getElementById("displayName").value;
    var city=document.getElementById("city").value;
    var eml=document.getElementById("email").value;
    var bodymade="Hello "+name+",\n"+"You have been successfully registered for TechSummit."+"\n\n\n\n"+"Name : "+name+"\nPhone Number : "+phn+"\nCollege : "+college+"\nCollege City : "+city;
    console.log(bodymade);
var mailcontent = {
    'subject':subj,
    'body':bodymade,
    'email':eml
}
console.log(mailcontent);
var url = "https://techkriti.org/apiv2/send_mail/";
$.ajax({
    type: "POST",
    url: url,
    data: mailcontent,
    dataType: JSON
  });}