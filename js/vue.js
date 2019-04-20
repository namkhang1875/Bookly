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
        setName : function (name){
            return this.name = name
        }
    }
})