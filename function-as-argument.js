function foo(x,y,z){
    console.log('This is foo', x(), y, z);
}

function a(){
    console.log('This is a');
    return "This is return value from a";
}

const b=10;
const c=20;

foo(a,b,c);
