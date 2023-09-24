<?php  

    $alert = '';
session_start();
if(!empty($_SESSION['active']))
{
    header('location: panel/');
}else{
    if(!empty($_POST)){
        if(empty($_POST['usuario']) || empty($_POST['clave']))
        {
            $alert = 'Ingrese su usuario y su clave';
        }else{
            require_once "conexion.php";

            $user = mysqli_real_escape_string($conection, $_POST['usuario']);
            $pass = md5(mysqli_real_escape_string($conection,$_POST['clave']));


            $query = mysqli_query($conection, "SELECT u.idusuario,u.nombre,u.correo,u.usuario,r.idrol,r.rol 
                                                FROM usuario u 
                                                INNER JOIN rol r
                                                ON u.rol = r.idrol
                                                WHERE u.usuario = '$user' AND u.clave = '$pass'");
            $result= mysqli_num_rows($query);
            
            if($result > 0){
                $data = mysqli_fetch_array($query);
                $_SESSION['active'] = true;
                $_SESSION['idUser'] = $data['idusaurio'];
                $_SESSION['nombre'] = $data['nombre'];
                $_SESSION['email'] = $data['correo'];
                $_SESSION['user'] = $data['usuario'];
                $_SESSION['rol'] = $data['idrol'];
                $_SESSION['rol_name'] = $data['rol'];

                header('location: panel/');
            }else{
                $alert = 'El usuario o la clave son incorrectas';
                session_destroy();
            }
        }
    }
}
?>


<!DOCTYPE html>
<html lang="en">
<head>
         <meta charset="UTF-8">
         <title>Login | Sistema Invetario</title>
         <link rel="stylesheet" type="text/css" href="css/style.css">
</head>
<body>
            <section id="container">

            <form action="" method="post">

            <img src="img/login.png" alt="Login">
            <h3>Iniciar Sesion</h3>

            <input type="text"  name="usuario"placeholder="Usuario">
            <input type="password" name="clave" placeholder="Contraseña">
            <div class="alert"><?php echo isset($alert) ? $alert : ''; ?></div>
            <input type="submit" value="INGRESAR">

            </form>

        </section>
    </body>
    </html>
            
     