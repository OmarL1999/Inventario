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
					<a href="#">Proveedores</a>
					<ul>
						<li><a href="registro_proveedor.php">Nuevo Proveedor</a></li>
						<li><a href="lista_proveedor.php">Lista de Proveedores</a></li>
					</ul>
				</li>
				<?php } ?>
				<li class="principal">
					<a href="#">Productos</a>
					<ul>
					<?php
					if($_SESSION['rol'] == 1){				
				?>
						<li><a href="registro_producto.php">Nuevo Producto</a></li>
					<?php }?>
						<li><a href="lista_producto.php">Lista de Productos</a></li>
					</ul>
				</li>
				
				<li class="principal">
					<a href="#">Ventas</a>
					<ul>
						<li><a href="nueva_venta.php">Nuevo Ventas</a></li>
						<li><a href="#">Lista de Ventas</a></li>
					</ul>
				</li>
				
			</ul>
</nav>