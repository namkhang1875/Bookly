
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
   //showData();
   
}

/*function showData(){
    var firebaseRef = firebase.database().ref("User");
    firebaseRef.once('value').then(function(dataSnapshot) {
        console.log(dataSnapshot.val());
    });
}*/

function insertData(email,dname,psw){
    var firebaseRef = firebase.database().ref("User");
    var errorCode;
    var isEmailExist;
    var useruid;
    firebase.auth().createUserWithEmailAndPassword(email, psw).then(function success(user){
        useruid = user.user.uid; // The UID of recently created user on firebase
    }).catch(function(error) {
        // Handle Errors here.
        errorCode = error.code;
        if(errorCode == 'auth/email-already-in-use'){
            alert("อีเมลนี้มีผู้ใช้งานแล้ว");
            isEmailExist = true;
        }
        // ...
      });
      

        alert("กำลังตรวจสอบ กดตกลงและรอซักครู่");     
        var delayInMilliseconds = 3000; //3 second
        setTimeout(function(){       
            if(!isEmailExist){
                //your code to be executed after 3 second
                var date = Date(Date.now());
                var date_now = date.toString()
                firebaseRef.child(useruid).set({
                email:email,
                dname:dname,
                psw:psw,
                point: 100,
                lastlogindate:date_now,
                //bonusPerDay: 0
                 });
                alert("ลงทะเบียนสำเร็จ กดตกลง");
                window.location.replace("index.html");
                
            }
        },delayInMilliseconds);
}
/*Login system */
function loginOnClick(){
    var email=document.getElementById('email').value;
    var psw = document.getElementById('psw').value;
    var isCannotLogin;

    var isEmailOk = false;
    var isPswOk = false;
    var mailre = '^[0-9]{8}@kmitl.[a-z]{2}.[a-z]{2}$';

    if(email.match(mailre)){
        console.log("email Ok");
        isEmailOk = true;
    }
    
    else if(!email.match(mailre)){
        alert("โปรดใช้อีเมลสถาบัน");
    }
    if(psw.length==0){
        alert("โปรดใส่รหัสผ่าน");
    }
    else if(psw.length >0){
        console.log("password Ok");
        isPswOk = true;
    }

    if(isEmailOk&&isPswOk){
    firebase.auth().signInWithEmailAndPassword(email, psw).catch(function(error) {
        // Handle Errors here.
       var errorCode = error.code;
        if(errorCode == 'auth/wrong-password'){
            alert('รหัสผ่านไม่ถูกต้อง กรุณาใส่ใหม่');
            isCannotLogin = true;
        }else if(errorCode == 'auth/user-not-found'){
            alert('อีเมลนี้ยังไม่ได้ลงทะเบียน กรุณากดลงทะเบียน');
            isCannotLogin = true;
        }
      });

      alert("กำลังตรวจสอบ กดตกลงและรอซักครู่");
      var delayInMilliseconds = 3000; //3 second
        setTimeout(function(){       
            if(!isCannotLogin){
                //your code to be executed after 3 second
                alert("เข้าสู่ระบบสำเร็จ กรุณากดตกลง");
                var user = firebase.auth().currentUser;
                var firebaseRef = firebase.database().ref("User").child(user.uid);
                    firebaseRef.on('value' , function(dataSnapshot) {
                    user_point = dataSnapshot.val().point;
                    console.log("Initial User point : "+user_point);
                    });
                changeStatus(email);
                dailypoint();
                //window.location.replace("index.html");
            }
        },delayInMilliseconds);
    }
}

function changeStatus(email){
    var old_element = document.querySelector('#email');
    var new_element = document.createElement('div');
    new_element.id = 'loginstatus';
    new_element.innerHTML = email;
    old_element.replaceWith(new_element);

    var old_element = document.querySelector('#login');
    var new_element = document.createElement('input');
    
        new_element.id = 'logout';
        new_element.type = 'button';
        new_element.value = 'ออกจากระบบ';
        new_element.onclick = function (){
            firebase.auth().signOut();
            alert("ออกจากระบบสำเร็จ กรุณากดตกลง");
            changeStatusBack();
    
        };
    old_element.replaceWith(new_element);
    
}
function logout(){
    var element = document.getElementById('#logout');
    element.onclick = 'logoutOnClick()';
}

function logoutOnClick(){
  
    firebase.auth().signOut();
    alert("ออกจากระบบสำเร็จ กรุณากดตกลง");
    changeStatusBack();
    
    /*
    firebase.auth().signOut().then(function() {
        // Sign-out successful.
        
      }).catch(function(error) {
        // An error happened.
        isCannotLogout = true;
        var errorCode = error.code;
        alert(errorCode); 
      });
      var delayInMilliseconds = 3000; //3 second
      setTimeout(function(){  
        if(!isCannotLogout){
            alert("ออกจากระบบสำเร็จ กรุณากดตกลง");
            changeStatusBack();
        }
    },delayInMilliseconds);
    */

}
function changeStatusBack(){
        var old_element = document.getElementById('loginstatus');
        var new_element = document.createElement('input');
        new_element.type ='text';
        new_element.id = 'email';
        new_element.name = 'email';
        new_element.placeholder = 'โปรดใช้อีเมลสถาบัน';
        old_element.replaceWith(new_element);

        var old_element = document.getElementById('logout');
        var new_element = document.createElement('input');
        new_element.id = 'login';
        new_element.type = 'button';
        new_element.value = 'เข้าสู่ระบบ';
        new_element.onclick = function loginOnClick(){
            var email=document.getElementById('email').value;
            var psw = document.getElementById('psw').value;
            var isCannotLogin;
            var isEmailOk = false;
            var isPswOk = false;
            var mailre = '^[0-9]{8}@kmitl.[a-z]{2}.[a-z]{2}$';

            if(email.match(mailre)){
                console.log("email Ok");
                isEmailOk = true;
            }
    
            else if(!email.match(mailre)){
                alert("โปรดใช้อีเมลสถาบัน");
            }
            if(psw.length==0){
                alert("โปรดใส่รหัสผ่าน");
            }
            else if(psw.length >0){
                console.log("password Ok");
                isPswOk = true;
            }
            if(isEmailOk&&isPswOk){
            firebase.auth().signInWithEmailAndPassword(email, psw).catch(function(error) {
                // Handle Errors here.
            
            var errorCode = error.code;
                if(errorCode == 'auth/wrong-password'){
                    alert('รหัสผ่านไม่ถูกต้อง กรุณาใส่ใหม่');
                    isCannotLogin = true;
                }else if(errorCode == 'auth/user-not-found'){
                    alert('อีเมลนี้ยังไม่ได้ลงทะเบียน กรุณากดลงทะเบียน');
                    isCannotLogin = true;
                }
            });

            alert("กำลังตรวจสอบ กดตกลงและรอซักครู่");
            var delayInMilliseconds = 3000; //3 second
                setTimeout(function(){       
                    if(!isCannotLogin){
                        //your code to be executed after 3 second
                        alert("เข้าสู่ระบบสำเร็จ กรุณากดตกลง");
                        /*เมื่อ login ได้ ก็ดึงค่า point จาก firebase มาเลย เพื่อไม่ให้ค่าเป็น NaN  */
                        var user = firebase.auth().currentUser;
                        var firebaseRef = firebase.database().ref("User").child(user.uid);
                            firebaseRef.on('value' , function(dataSnapshot) {
                            user_point = dataSnapshot.val().point;
                            console.log("Initial User point : "+user_point);
                            });
                        changeStatus(email);
                        dailypoint();
                        //window.location.replace("index.html");
                    }
                },delayInMilliseconds);
            }
        }
        old_element.replaceWith(new_element);
}



function dailypoint(){
    var user = firebase.auth().currentUser;
    console.log(user);
    var date_lastlogin;
    var date = Date(Date.now());
    var date_now = date.toString()
    var date_now_substring = date_now.substring(0,15);
    var date_lastlogin_substring;
    
    
    console.log("login time : " + date_now);
    if(user != null){
        var firebaseRef = firebase.database().ref("User").child(user.uid);
        firebaseRef.on('value' , function(dataSnapshot) {
        date_lastlogin = dataSnapshot.val().lastlogindate;
        date_lastlogin_substring = date_lastlogin.substring(0,15);
        console.log("last login time : " + date_lastlogin);
        
        
        });
      
        if(date_lastlogin_substring == date_now_substring)
        {
            
             firebaseRef.update({
                "point":user_point,
                 "lastlogindate":date_now
                });
             //console.log("User point after push : "+user_point);
        }
        else
        {
            
            var firebaseRef = firebase.database().ref("User").child(user.uid);
            firebaseRef.on('value' , function(dataSnapshot) {
            user_point = dataSnapshot.val().point;
            user_point+=100;
            //console.log("User point before push : "+user_point);
            
            });
            
            var delayInMilliseconds = 1500; //3 second
                setTimeout(function(){  
                alert("รางวัลล็อกอินรายวัน + 100 points!!!");
                firebaseRef.update({
                    "point":user_point,
                    "lastlogindate":date_now
                });
            },delayInMilliseconds);
        }
    }
}

function searchBook(){
    var category = document.getElementById('category').value;
    var bookname = document.getElementById('search').value;
    var firebaseRef = firebase.database().ref("Book").orderByChild("category").equalTo(category).on('value', function(dataSnapshot){
        if(bookname != ""){
            console.log("Searching " + bookname + " in "+ category);
        }
        else{
            console.log("Searching " + category);
        }
        console.log("------------------------------------------------");
        dataSnapshot.forEach(function(childSnapshot){
            var key = childSnapshot.key;
            if(bookname == ""){
                console.log(key);
            }
            else{
                if(key.includes(bookname)){
                    console.log(key);
                }
            }
        });
    });
    console.log("-------------------end result-------------------");
}

function loadmore(){
    var i;
    var limitpost = 6;
    var check =0;
    for (i=1;i<=limitpost;i++){
    var newpost = document.createElement('div');
    newpost.className = 'post';
    newpost.innerHTML = '<div id ="book">{{getBookName()}} </div> <div id = "imgarea"><img id="myimg" src="" alt=""></div><div id = "btnarea"><button class ="tradebtn" v-on:click = "trade">ยืม</button><button class ="borrowbtn" v-on:click="borrow">แลก</button></div>';
    document.getElementById("feed").appendChild(newpost);
    if(i == 6){
        var newfeedfooter = document.createElement('div');
        newfeedfooter.className = 'feed-footer';
        newfeedfooter.innerHTML = '<button class="load-button" type="button" onclick="loadmore()">โหลดเพิ่มเติม</button>';
        document.getElementById("feed").appendChild(newfeedfooter);
        }
    
    }
}


