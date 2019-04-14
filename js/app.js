function signUpOnClick(){
    var email=document.getElementById('email').value;
    var dname=document.getElementById('dname').value;
    var psw=document.getElementById('psw').value;
    var cpsw = document.getElementById('cpsw').value;

    var isEmailOk =false;
    var isDnameOk =false;
    var isPswOk = false;
    var isCpswOk = false;

  
    var mailre = '^[0-9]{8}@kmitl.[a-z]{2}.[a-z]{2}$';
    if(email.match(mailre)){
        console.log("email Ok");
        isEmailOk = true;
    }
    
    else if(!email.match(mailre)){
        alert("โปรดใช้อีเมลสถาบัน");
    }

    if(dname.length==0){
        alert("โปรดใส่ชื่อ");
    }
    else if(dname.length >0){
        console.log("dname ok")
        isDnameOk = true;
    }

    if(psw.length==0){
        alert("โปรดใส่รหัสผ่าน");
    }
    else if(psw.length >0){
        console.log("password Ok");
        isPswOk = true;
    }
    if(cpsw.length==0){
        alert("โปรดยืนยันรหัสผ่าน");
    }

    if(psw != cpsw){
        alert("โปรดใส่รหัสผ่านให้ตรงกัน");
    }
    else if(psw == cpsw){
        console.log("password match");
        isCpswOk = true;
    }
    if((isEmailOk&&isDnameOk)&&(isPswOk&&isCpswOk)){
        insertData(email,dname,psw);
    } 
}

window.onload=function(){
   showData();
}

function showData(){
    var firebaseRef = firebase.database().ref("User");
    firebaseRef.once('value').then(function(dataSnapshot) {
        console.log(dataSnapshot.val());
    });
}

function insertData(email,dname,psw){
    var firebaseRef = firebase.database().ref("User");
    firebaseRef.push({
        email:email,
        dname:dname,
        psw:psw
    });
    var errorCode;
    var isEmailExist;
    firebase.auth().createUserWithEmailAndPassword(email, psw).catch(function(error) {
        // Handle Errors here.
        errorCode = error.code;
        if(errorCode = 'auth/email-already-in-use'){
            alert("อีเมลนี้มีผู้ใช้งานแล้ว");
            isEmailExist = true;
        }
        // ...
      });
        alert("กำลังตรวจสอบ กดตกลงและรอซักครู่");     
        var delayInMilliseconds = 3000; //1 second
        setTimeout(function(){       
            if(!isEmailExist){
                
                //your code to be executed after 1 second
                alert("ลงทะเบียนสำเร็จ กดตกลง");
                window.location.replace("index.html");
                
            }
        },delayInMilliseconds);
    
}



/*Login system */
/*function loginOnClick(){
    var email=document.getElementById('email').value;
    var psw = document.getElementById('psw').value;
    firebase.auth().signInWithEmailAndPassword(email, psw).catch(function(error) {
        // Handle Errors here.
       alert("Login success");
        // ...
      });
}*/


/*Not using now */
function initApp(){
    firebase.auth().onAuthStateChanged(function(user){
        //document.getElementById('quickstart-verify-email').disabled = true;
        if(user){
            var displayName = user.displayName;
            var email = user.email;
            var emailVerified = user.emailVerified;
            var photoURL = user.photoURL;
            var isAnonymous = user.isAnonymous;
            var uid =user.uid;
            var providerData = user.providerData;
            //document.getElementById('quickstart-sign-in-status').textContent ='Signed in';
            document.getElementById('login').value = 'ออกจากระบบ';
            //document.getElementById('quickstart-account-details').textContent =JSON.stringify(user, null ,' ');
           /* if(!emailVerified){
                document.getElementById('quickstart-verify-email').disabled = fales;
            }*/
        }else{
            //document.getElementById('quickstart-sign-in-status').textContent ='Signed out';
            document.getElementById('login').value = 'เข้าสู่ระบบ';
            //document.getElementById('quickstart-account-details').textContent ="null";
        }
    });
}