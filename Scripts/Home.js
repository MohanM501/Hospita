const reg=document.getElementById("register-inputs");
const reg_inputs=document.querySelectorAll("#register-inputs>input");

const log=document.getElementById("login-inputs");
const log_inputs=document.querySelectorAll("#login-inputs>input");
const btn=document.getElementById("button");

const handleRegister=()=>{
    reg.style.display="block";
    reg.style.display="flex";
    reg.style.flexDirection="column";
    reg.style.rowGap="20px";
    log.style.display="none";
    btn.innerText="Register";
}

const handleLogin=()=>{
    reg.style.display="none";
    log.style.display="block";
    btn.innerText="Login";
}
let register={}

reg_inputs.forEach((item)=>{
    console.log("hi",item)
    item.addEventListener("input",(e)=>{
        let {value,name}=e.target;
        register[name]=value;
    })
})

let login={}

log_inputs.forEach((item)=>{
    item.addEventListener("input",(e)=>{
        let {value,name}=e.target;
        login[name]=value;
    })
})

btn.addEventListener("click",()=>{
 console.log("hi clicked button")
 if(Object.keys(register).length>0){
        const stored=StoreInBackend(register);
        stored.then((r)=>{console.log(r,"r")}).catch((e)=>{console.log(e,"e")})

 }else if(Object.keys(login).length>0){
       const {email,password}=login;
        const allData=GetUserData(email,password);
        console.log(allData,"allDAta")
        allData.then((r)=>{
                if(r.length>0){
                    alert("Successfully LoggedIn");
                    if(r[0].doctor){
                        window.open("./DoctorDashboar.html","_self")
                    }else{
                        window.open("./BookAppointment.html","_self");
                    }
                }else{
                    alert("Invalid Credentials")
                }
        }).catch((e)=>{
            console.log(e)
        })

 }else{
     alert("Please enter details")
 }
})
let url=`http://localhost:3001/users`;

function StoreInBackend(data){
    const sendData=JSON.stringify(data);

    return fetch(url,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:sendData
    })
}

async function GetUserData(email,password){
    let data=await fetch(`${url}?email=${email}&password=${password}`);
    let getData=await data.json();
    return getData;
}
