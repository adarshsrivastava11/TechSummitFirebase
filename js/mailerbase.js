function poster(){
var mailcontent = {
    'subject':'Utkarsh sent his regards',
    'body':'Ae bhosadi ke, maa mat chuda',
    'email':'haren@iitk.ac.in'
}
var url = "https://techkriti.org/apiv2/send_mail/";
$.ajax({
    type: "POST",
    url: url,
    data: mailcontent,
    dataType: JSON
  });}