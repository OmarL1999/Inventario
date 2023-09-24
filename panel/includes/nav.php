<nav>
			<ul>
				<li><a href="index.php"><i class="fas fa-home"></i> Inicio</a></li>
				<?php
					if($_SESSION['rol'] == 1){				
				?>
				<li class="principal">

					<a href="#"><i class="fas fa-users"></i> Usuarios</a>
					<ul>
						<li><a href="registro_usuario.php"> <i class="fas fa-users"></i> Nuevo Usuario</a></li>
						<li><a href="lista_usuario.php"> <i class="fas fa-users"></i> Lista de Usuarios</a></li>
					</ul>
				</li>
					<?php } ?>
				<li class="principal">
					<a href="#"> <i class="fas fa-user"></i> Clientes</a>
					<ul>
						<li><a href="registro_cliente.php">Nuevo Cliente</a></li>
						<li><a href="lista_cliente.php">Lista de Clientes</a></li>
					</ul>
				</li>
				<?php
					if($_SESSION['rol'] == 1){				
				?>
				<li class="principal">
					<a href="#"><i class="fa fa-building "></i> Proveedores</a>
					<ul>
						<li><a href="registro_proveedor.php"><i class="fa fa-building "></i> Nuevo Proveedor</a></li>
						<li><a href="lista_proveedor.php"><i class="fa fa-building "></i> Lista de Proveedores</a></li>
					</ul>
				</li>
				<?php } ?>
				<li class="principal">
					<a href="#"><i class="fa fa-cubes"></i> Productos</a>
					<ul>
					<?php
					if($_SESSION['rol'] == 1){				
				?>
						<li><a href="registro_producto.php"><i class="fa fa-cubes"></i> Nuevo Producto</a></li>
					<?php }?>
						<li><a href="lista_producto.php"><i class="fa fa-cubes"></i> Lista de Productos</a></li>
					</ul>
				</li>
				
				<li class="principal">
					<a href="#"><i class="fa fa-cube"></i> Ventas</a>
					<ul>
						<li><a href="nueva_venta.php"><i class="fa fa-cube"></i> Nuevo Ventas</a></li>
						
					</ul>
				</li>
				
			</ul>
</nav>