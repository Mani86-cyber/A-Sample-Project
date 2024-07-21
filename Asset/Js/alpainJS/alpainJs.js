document.addEventListener('alpine:init', () => {
    Alpine.data('One', () => ({
        users:[],
        mainUsers:[],
        pageUsers:[],
        isLoading:false,
        showModdal:false,
        currentPage:1,
        pageCount:1,
        itemsCount:4,
        searchTab:"",
        newUser_info:{
            name: "",
            Email: "",
            username: "",
        },
        userID_forEdit:null,
        getUsers(){
            this.isLoading=true
            axios.get("https://jsonplaceholder.typicode.com/users").then((gh)=>{
                this.users = gh.data
                this.mainUsers = gh.data
                this.pagination()
            }).finally(()=>{
                this.isLoading=false
            })
        },
        pagination(){
            this.pageCount = Math.ceil(this.users.length / this.itemsCount) // 2.5 => 3
            const start = (this.currentPage * this.itemsCount) - this.itemsCount // 0
            const end = this.currentPage * this.itemsCount // 4
            this.pageUsers = this.users.slice(start,end)
        },
        next_page(){
            this.currentPage++
            if (this.currentPage > this.pageCount){
                this.currentPage = this.pageCount
            }
            this.pagination()
        },
        pervious_page(){
            this.currentPage--
            if (this.currentPage < 1){
                this.currentPage = 1
            }
            this.pagination()
        },
        showingButton(value){
            this.currentPage = 1
            if (value < 1) this.itemsCount = 1
            if (value > this.users.length) this.itemsCount = this.users.length
        },
        handleSearch(value){
            this.users = this.mainUsers.filter(user=>(user.name.includes(value) || user.website.includes(value) || user.email.includes(value)))
            this.currentPage = 1
            this.pagination()
        },
        handleAdd_users(){
            this.isLoading=true
            axios.post("https://jsonplaceholder.typicode.com/users/",this.newUser_info).then((gh)=>{
                if (gh.status == 201){
                    this.mainUsers.push(gh.data)
                    this.showModdal = false
                    this.handleReset_form()
                    this.pagination()
                    M.toast({html: 'User created successfully!', classes: 'rounded green'});
                }
            }).finally(()=>{
                this.isLoading=false
            })
        },
        handleReset_form(){
            this.newUser_info = {
                name: "",
                Email: "",
                username: "",
            }
        },
        handleDelete_user(userID){
            var toastHTML = '<span>Are You Sure?('+userID+')</span><button class="btn-flat toast-action" x-on:click="confrimDelete_user('+userID+')">Delete</button>';
            M.toast({html: toastHTML});
        },
        confrimDelete_user(userID){
            this.isLoading = true
            fetch('https://jsonplaceholder.typicode.com/users/'+userID).then((gh)=>{
                if (gh.status == 200){
                    this.mainUsers = this.mainUsers.filter(user=> user.id != userID)
                    this.users = this.users.filter(user=> user.id != userID)
                    this.pagination()
                    M.toast({html: 'User Deleted successfully!', classes: 'red'});

                }
              }).finally(()=>{
                this.isLoading = false
              })
        },
        handleUser_update(user){
            axios.get("https://jsonplaceholder.typicode.com/users/"+user.id).then(gh=>{
                if (gh.status == 200){
                    this.newUser_info={
                        name:gh.data.name,
                        email:gh.data.email,
                        username: gh.data.username,
                    }
                    this.userID_forEdit = gh.data.id
                }
            })
            
            this.showModdal= true
        },
        confrimEdit_user(){
            this.isLoading = true
            axios.put("https://jsonplaceholder.typicode.com/users/"+this.userID_forEdit, this.newUser_info).then((gh)=>{
                if (gh.status == 200){
                    const userSpace = this.mainUsers.findIndex(user=> user.id == this.userID_forEdit)
                    this.mainUsers[userSpace] = gh.data
                    this.showModdal = false
                    this.handleReset_form()
                    this.userID_forEdit = null
                    this.pagination()
                    M.toast({html: 'User Updated successfully!', classes: 'blue'});
                }
            }).finally(()=>{
                this.isLoading = false
            })
        }
    }))
})






// // Define A Function
// function test(){
//     console.log('hello world!')
// }
// // Define A Arrow Function
// var ju = ()=>{
//     console.log('hello world!')
// }








