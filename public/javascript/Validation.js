function validateUser(){
	      var email = document.getElementById("formemail").value;
	      var phone = document.getElementById("forphone").value;
          var password = document.getElementById("formpassword").value;
          var confirmpassword = document.getElementById("formcnfpassword").value;

          const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          const rephone = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
          var x = document.getElementById('signupalert');
          var msg = document.getElementById('messageSpan');

          if(!re.test(email.toLowerCase())){
			 x.style.display = 'block';
             msg.textContent =  "Invalid Email";
             return false;
          }else if(!rephone.test(phone)){
             x.style.display = 'block';
             msg.textContent =  "Invalid Phone Number";
             return false;
          }else if(password != confirmpassword){
          	 x.style.display = 'block';
             msg.textContent =  "Password Not Matched";
             return false;
          }else{
          // Create an array and push all possible values that you want in password
          var matchedCase = new Array();
          matchedCase.push("[$@$!%*#?&]"); // Special Charector
          matchedCase.push("[A-Z]");      // Uppercase Alpabates
          matchedCase.push("[0-9]");      // Numbers
          matchedCase.push("[a-z]");     // Lowercase Alphabates
          var isWeakPassword = false;
          // Check the conditions
          var ctr = 0;
          for (var i = 0; i < matchedCase.length; i++) {
              if (new RegExp(matchedCase[i]).test(password)) {
                  ctr++;
              }
          }
          switch (ctr) {
              case 0:
              case 1:
              case 2:
                  x.style.display = 'block';
                  msg.textContent =  "Very Weak Password";
                  isWeakPassword = true;
                  break;
          }
          if(!isWeakPassword){
          	x.style.display = 'none';
            msg.textContent =  "";
          	return true;
          }
          return false;
      }
}