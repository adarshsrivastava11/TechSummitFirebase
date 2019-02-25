function poster(){
    // var bodymade=document.getElementById("body_of_mail").value;
    var subj='Tech Summit Registration';
    var phn=document.getElementById("phone").value;
    var college=document.getElementById("college").value;
    var name=document.getElementById("displayName").value;
    var city=document.getElementById("city").value;
    var eml=document.getElementById("email").value;
    var bodymade="<h1 align=center>TechSummit Registrations</h1>"+"Hello "+name+",<br>"+"You have been successfully registered for TechSummit."+"<br><br>"+"Name : "+name+"<br>Phone Number : "+phn+"<br>College : "+college+"<br>College City : "+city+"<br><br>Regards,<br>Team Techkriti.";
    // console.log(bodymade);
var mailcontent = {
    'subject':subj,
    'body':bodymade,
    'email':eml
}
// console.log(mailcontent);
var url = "https://techkriti.org/apiv2/send_mail/";
$.ajax({
    type: "POST",
    url: url,
    data: mailcontent,
    dataType: JSON
  });}