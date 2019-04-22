var book = new Vue({
    el:'#book',
    data:{
        name: 'bookname',
        writer: 'writername',
        category: 'category'
        
    },
    methods: {
        getBookName : function(){
            return this.name
        },
        setBookName : function (name){
            return this.name = name
        },
        getImage : function(){
            var storage = firebase.storage();
            var gsReference = storage.refFromURL('gs://softdevdb-d19a4.appspot.com/1543556630014.jpg');
            storage.ref('1543556630014.jpg').getDownloadURL().then(function(url) {
                // `url` is the download URL for 'images/stars.jpg'
                // Or inserted into an <img> element:
                var img = document.getElementById('myimg');
                img.src = url;
                console.log(url);
                
              }).catch(function(error) {
                // Handle any errors
              });
        }
    }
})
window.onload=function(){
    
    var firebaseRef = firebase.database().ref("Book").orderByChild("category").equalTo("การ์ตูน").on('value', function(dataSnapshot){
            dataSnapshot.forEach(function(childSnapshot){
            var key = childSnapshot.key;
            book.setBookName(key);
            book.getImage();
        });
    });
}

