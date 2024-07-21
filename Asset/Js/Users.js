document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.collapsible');
    var instances = M.Collapsible.init(elems, {});

    // const addUserButton = document.getElementById('active_add_users')
    // addUserButton.addEventListener('click',()=>{
    //   document.querySelector('.window_add_users').classList.add('show')
    //   document.querySelector('.add_users').classList.remove('dis-none')
    // })

    // document.querySelector('.add_users').addEventListener('click',(e)=>{
    //   document.querySelector('.window_add_users').classList.remove('show')
    //   e.target.classList.add('dis-none')
    // })

  });