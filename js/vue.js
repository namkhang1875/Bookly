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
        }
    }
})
window.onload=function(){
    
    var firebaseRef = firebase.database().ref("Book").orderByChild("category").equalTo("การ์ตูน").on('value', function(dataSnapshot){
            dataSnapshot.forEach(function(childSnapshot){
            var key = childSnapshot.key;
            book.setBookName(key);
        });
    });
}
var storage = firebase.storage();
var gsReference = storage.refFromURL('gs://softdevdb-d19a4.appspot.com/1543556630014.jpg');
