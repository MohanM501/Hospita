const reg=document.getElementById("register-inputs");
const log=document.getElementById("login-inputs")

const handleRegister=()=>{
    reg.style.display="block";
    reg.style.display="flex";
    reg.style.flexDirection="column";
    reg.style.rowGap="20px";
    log.style.display="none";
}

const handleLogin=()=>{
    reg.style.display="none";
    log.style.display="block";
}