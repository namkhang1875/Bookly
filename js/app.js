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
    alert("ลงทะเบียนสำเร็จ");
    window.location.href="index.html";
}