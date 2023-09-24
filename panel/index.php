<?php
session_start();
?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<?php include "includes/scripts.php"; ?>
	<title>Sistema Ventas</title>
</head>
<body>
		<?php 

			include "includes/header.php"; 
			include "../conexion.php";

			$query_dash = mysqli_query($conection, "CALL dataDashboard();");
			$result_dash = mysqli_num_rows($query_dash);
			if($result_dash > 0){
				$data_dash = mysqli_fetch_assoc($query_dash);
				mysqli_close($conection);
			}
			
		?>
	<section id="container">
	 <div class="divContainer">
			<div>
				<h1 class="titlePanelControl">Panel de control</h1>
			</div>
			<div class="dashboard">
			    <?php
					if($_SESSION['rol'] == 1){				
				?>
				<a href="lista_usuario.php">
					<i class="fas fa-users"></i>
					<p>
						<strong>Usuarios</strong><br>
						<span><?= $data_dash['usuarios'] ?></span>
					</p>
				</a>
					<?php }?>
				<a href="lista_cliente.php">
					<i class="fas fa-users"></i>
					<p>
						<strong>Clientes</strong><br>
						<span><?= $data_dash['clientes'] ?></span>
					</p>
				</a>
				<?php
					if($_SESSION['rol'] == 1){				
				?>
				<a href="lista_proveedor.php">
					<i class="fas fa-building"></i>
					<p>
						<strong>Proovedores</strong><br>
						<span><?= $data_dash['proveedores'] ?></span>
					</p>
				</a>
				<?php }?>
				<a href="lista_producto.php">
					<i class="fas fa-cubes"></i>
					<p>
						<strong>Productos</strong><br>
						<span><?= $data_dash['productos'] ?></span>
					</p>
				</a>
	
			</div>
	</div>
	<div class="divInfoSistema">
			<div>
				<h1 class="titlePanelControl">Configuracion</h1>
			</div>
			<div class="containerPerfil">
				<div class="containerDataUser">
					<div align="center" class="logoUser">
						<img src="img/logoUser.png">
					</div>
					<div class="divDataUser">
						<h4>Informacion personal</h4>

						<div>
							<label>Nombre:</label> <span><?= $_SESSION['nombre']; ?></span>
						</div>
						<div>
							<label>Correo:</label> <span><?= $_SESSION['email']; ?></span>
						</div>

						<h4>Datos Usuario</h4>
						<div>
							<label>Rol:</label> <span><?= $_SESSION['rol_name']; ?></span>
						</div>
						<div>
							<label>Usuario:</label> <span><?= $_SESSION['user']; ?></span>
						</div>

					<!-- 	<h4>Cambiar contraseña</h4>
						<form action="" method="post" name="frmChangePass" id="frmChangePass">

								<div>
									<input type="password" name="txtPassUser" id="txtPassUser"
									placeholder="Contraseña actual" required>
								</div>
								<div>
									<input class="newPass" type="password" name="txtNewPassUser" id="txtNewPassUser"
									placeholder="Contraseña nueva" required>
								</div>
								<div>
									<input class="newPass" type="password" name="txtPassConfirm" id="txtPassConfirm"
									placeholder="Confirmar contraseña " required>
								</div>
								<div class="alertChangePass" style="display: none;">

								</div>
								<div>
									<button type="submit" class="btn_save btnChangePass">
									<i class="fas fa-key"></i> Cambiar contraseña</button>
								</div>
						</form> -->
					</div>

			</div>
	</div>
	</section>


	<?php include "includes/footer.php"; ?>
</body>
</html>