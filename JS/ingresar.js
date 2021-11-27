$(document).ready(function () {
    //Trae todos los usuarios registrados
    getUsers();
});

function activaNuevo(){
    $("#useremail").focus();
}
activaNuevo();

function getUsers() {

    try {
        fetch("http://152.70.124.82:8081/api/user/all").then(function (res) {
            return res.json()
        }).then(function (usuarios) {
            console.log(usuarios)
            localStorage.setItem('Users', JSON.stringify(usuarios))
        })
    } catch (error) {
        console.log(error)
    }
}
async function ingresar(){
    const emialValue = $("#useremail").val();
    const passwordvalue = $("#password").val();
    try {
        const reponse = await fetch("http://152.70.124.82:8081/api/user/" + emialValue);
        const reponseJsonFormat =await reponse.json();
        console.log('response in Json format ', reponseJsonFormat)
        const reponse2 = await fetch("http://152.70.124.82:8081/api/user/" +emialValue +"/" +passwordvalue,);
        const reponse2JsonFormat = await reponse2.json();
        console.log('response 2: ', reponse2JsonFormat)
        
        //Validacion
        if(reponseJsonFormat){

            console.log('El usuario si esta en nustra db')
            console.log(reponse2JsonFormat.name)
            if(reponse2JsonFormat.name !== "NO DEFINIDO"){
                alert("Bienvenido "+ reponse2JsonFormat.name)
                $("#useremail").val("");
                $("#password").val("");
            }else{
                alert('El ususario '+ reponse2JsonFormat.email+" si esta registrado, pero la contraseña es incorrecta.")
                $("#password").focus();
            }

        }else{ 
            alert("Correo o constraseña invalido, intentelo nuevamente")
            $("#useremail").val("");
            $("#password").val("");
            $("#useremail").focus();
        }

    } catch (error) {
        console.log(error)
    }

}

let email = document.getElementById('useremail')
let password = document.getElementById('password')

email.addEventListener('keyup', (e)=>{
    const emialVal = $("#useremail").val();
    const passwordVal = $("#password").val();
    let getU = localStorage.getItem('Users')
    getU = JSON.parse(getU)
    for(let i=0; i<getU.length; i++){
        console.log(getU[i])
    }
    console.log(getU) 
})
