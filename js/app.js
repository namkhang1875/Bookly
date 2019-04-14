function submitOnClick(){
    var email=document.getElementById('email');
    var dname=document.getElementById('dname');
    var psw=document.getElementById('psw');
    insertData(email.value,dname.value,psw.value);
    
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
    console.log("ลงทะเบียนสำเร็จ");
}