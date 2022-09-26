document.getElementById('local').innerHTML=localStorage.getItem('localCount').toString();
function increaseLocal(){
    var a = +localStorage.getItem('localCount')+1;
    localStorage.setItem('localCount',a);
    document.getElementById('local').innerHTML=localStorage.getItem('localCount').toString();
}

function decreaseLocal(){
    var a = +localStorage.getItem('localCount')-1;
    localStorage.setItem('localCount',a);
    document.getElementById('local').innerHTML=localStorage.getItem('localCount').toString();
}

function increaseSession(){
    var a = +sessionStorage.getItem('sessionCount')+1;
    sessionStorage.setItem('sessionCount',a);
    document.getElementById('session').innerHTML=sessionStorage.getItem('sessionCount').toString();
}

function decreaseSession(){
    var a = +sessionStorage.getItem('sessionCount')-1;
    sessionStorage.setItem('sessionCount',a);
    document.getElementById('session').innerHTML=sessionStorage.getItem('sessionCount').toString();
}
