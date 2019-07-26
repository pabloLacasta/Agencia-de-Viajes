const CONFIG = {
    //generamos la contraseña con password generator. Secret key para generar el token. Necesario instalarlo previamente: npm i -S jsonwebtoken
    SECRET_JWT: 'sW$q@re,q8w{eg!4+d-\>xE3k+}5#WHZznQXdzf8=Znnddffdj7E)ApKV_ypd9_n(W-S%hd>83;USkU+aFwe+`5~c\(KR?&PfsfsY~4t2VRBVu9r(p44z?_$j:yhS`Ms9(HjyYf/z9C[fcajn{n;<CXm{aF=S[U*:fXC@j[Tu~7z!~xm}Ua;2`Bs7DJRv#Eu*,dxF}%;P;7?\vx=D7qgyu-NLBKMnqQyaS!Z+g3?{NPUU_kHk<Jed;,f2RXV]]f+UC',
    GMAIL: {
        email: 'bootcampstream@gmail.com',
        password: '123bootcamp123'
    },
    //contraseña que usaremos para anclar al usuario cada vez que se haga el login 
    SECRET_AUTH_JWT: "(%y-N(x+m>edQd]j,k$7#vJ2hW^}wN&/=MdC'H-`WxUus7~ju#-a'LaHc$a?3r#GL4qn/a$bG)FFdQD#r~FbSuvkQEF`uj*3FRPS%_vPd&BuT#[W%*39a3c&Z#\bh;{j/kuj[65?6cqF:NUKXUH'q7p}!:T4'j3{+u~~x/:N&zMLEt2bs~>k$']Ee%<zu5R\w;hQpsr:@7gD:pRG;fxw3&A>]MxQ`z9uK[V'{7D(;)ufkz*;j;<XFpgJ'>bW]/cG"
};

module.exports = CONFIG;

//creamos el gmail que va a enviar el correo de autenticación

//si quisieramos usar el nuestro personal, hay que ir a la cuenta de google y desactivar el bloqueo de acceso de aplicaciones poco seguras
//en este .js pondríamos nuestro correo y nuestra contraseña.

//IMPORTANTE: Añadir a git ignore para que no se filtren las contraseñas!!