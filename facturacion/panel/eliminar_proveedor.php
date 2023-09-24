<?php
session_start();
if($_SESSION['rol'] !=1){
    header("location: ./");
}
    include "../conexion.php";
    
    if(!empty($_POST))
    {   
        if(empty($_POST['idproveedor'])){
            header("location : lista_proveedor.php");
        }         

        $idproveedor = $_POST['idproveedor'];
        //$query_delete = mysqli_query($conection,"DELETE FROM cliente WHERE idcliente = $idcliente");
        $query_delete = mysqli_query($conection,"UPDATE proveedor SET estatus=0 WHERE codproveedor = $idproveedor");

        if($query_delete){
            header("location: lista_proveedor.php");
        }else{
            echo "Error al eliminar";
        }
    }


    if(empty($_REQUEST['id']) )
    {
        header("location: lista_proveedor.php");

    }else{

        $idproveedor = $_REQUEST['id'];

        $query = mysqli_query($conection, "SELECT * FROM proveedor WHERE codproveedor = $idproveedor");
        $result = mysqli_num_rows($query);
        if($result > 0){
            while ($data = mysqli_fetch_array($query)){

                
                $proveedor = $data['proveedor'];
            }
        }else{
            header("location: lista_proveedor.php");
        }
    }


?>




<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<?php include "includes/scripts.php"; ?>
	<title>Eliminar Proveedor</title>
</head>
<body>
<?php include "includes/header.php"; ?>
	<section id="container">
		<div class="data_delete">
         <i class="far fa-building fa-7x" style="color: #e66262"></i>   
        <h2>¿Está seguro de eliminar el siguiente registro?</h2>
        <p>Nombre del proveedor: <span><?php echo $proveedor; ?></span></p>
        

        <form method="post" action="">
            <input type="hidden" name="idproveedor"  value="<?php echo $idproveedor; ?>">
            <a href="lista_proveedor.php" class="btn_cancel">Cancelar</a>
            <input type="submit" value="Eliminar" class="btn_ok">
        </form>
        </div>
	</section>


	<?php include "includes/footer.php"; ?>
</body>
</html>