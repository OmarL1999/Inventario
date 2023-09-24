$(document).ready(function(){

    //--------------------- SELECCIONAR FOTO PRODUCTO ---------------------
    $("#foto").on("change",function(){
    	var uploadFoto = document.getElementById("foto").value;
        var foto       = document.getElementById("foto").files;
        var nav = window.URL || window.webkitURL;
        var contactAlert = document.getElementById('form_alert');
        
            if(uploadFoto !='')
            {
                var type = foto[0].type;
                var name = foto[0].name;
                if(type != 'image/jpeg' && type != 'image/jpg' && type != 'image/png')
                {
                    contactAlert.innerHTML = '<p class="errorArchivo">El archivo no es válido.</p>';                        
                    $("#img").remove();
                    $(".delPhoto").addClass('notBlock');
                    $('#foto').val('');
                    return false;
                }else{  
                        contactAlert.innerHTML='';
                        $("#img").remove();
                        $(".delPhoto").removeClass('notBlock');
                        var objeto_url = nav.createObjectURL(this.files[0]);
                        $(".prevPhoto").append("<img id='img' src="+objeto_url+">");
                        $(".upimg label").remove();
                        
                    }
              }else{
              	alert("No selecciono foto");
                $("#img").remove();
              }              
    });

    $('.delPhoto').click(function(){
    	$('#foto').val('');
    	$(".delPhoto").addClass('notBlock');
        $("#img").remove();
        
        if($("#foto_actual") && $("#foto_remove")){
            $("#foto_remove").val('img_producto.png');
        }

    });


    //AGREGAR
    $('.add_product').click(function(event){
        event.preventDefault();
        var producto = $(this).attr('product');
        var action = 'infoProducto';

        $.ajax({
            url: 'ajax.php',
            type: 'POST',
            async: true,
            data: {action:action,producto:producto},
        

        success: function(response){
            if(response != 'error'){

                var info = JSON.parse(response);
                $('#producto_id').val(info.codproducto);
                $('.nameProducto').html(info.descripcion);

        }
        },
        error: function(error){
            console.log(error);
        }
    });

        $('.modal').fadeIn();

    });

    //ELIMINAR
    $('.del_product').click(function(e){
        e.preventDefault();
        var producto = $(this).attr('product');
        var action = 'infoProducto';

        $.ajax({
            url: 'ajax.php',
            type: 'POST',
            async: true,
            data: {action:action,producto:producto},
            
            success: function(response){
                if(response != 'error'){
                        var info = JSON.parse(response);













                }
            },
            error: function(error){
                console.log(error);
            }
        });
        $('.modal').fadeIn();
    });
    $('#search_proveedor').change(function(e){
        e.preventDefault();
        var sistema = getUrl();
        location.href = sistema+'buscar_productos.php?proveedor='+$(this).val();
    });

    //ACTIVAR CAMPOS PARA REGISTRAR CLIENTE

    $('.btn_new_cliente').click(function(event){
        event.preventDefault();
        $('#nom_cliente').removeAttr('disabled');
        $('#tel_cliente').removeAttr('disabled');
        $('#dir_cliente').removeAttr('disabled');

        $('#div_registro_cliente').slideDown();
    });

    //BUSCAR CLIENTE
    $('#nit_cliente').keyup(function(e){
        e.preventDefault();

        var cl = $(this).val();
        var action = 'searchCliente';

        $.ajax({
            url: 'ajax.php',
            type: "POST",
            async: true,
            data: {action:action,cliente:cl},

            success: function(response)
            {
                
                if(response == 0){
                    $('#idcliente').val('');
                    $('#nom_cliente').val('');
                    $('#tel_cliente').val('');
                    $('#dir_cliente').val('');
                    //Mostrar boton agregar
                    $('.btn_new_cliente').slideDown();
                }else{
                    var data = $.parseJSON(response);
                    $('#idcliente').val(data.idcliente);
                    $('#nom_cliente').val(data.nombre);
                    $('#tel_cliente').val(data.telefono);
                    $('#dir_cliente').val(data.direccion);
                    //Ocultar boton agregar 
                    $('.btn_new_cliente').slideUp();

                    //Bloque campos
                    $('#nom_cliente').attr('disabled','disabled');
                    $('#tel_cliente').attr('disabled','disabled');
                    $('#dir_cliente').attr('disabled','disabled');

                    //Oculta boton guardar
                    $('#div_registro_cliente').slideUp();
                    
                }
            },
            error: function(error){
            }
        });
    });

    //CREAR CLIENTE / VENTAS

    $('#form_new_cliente_venta').submit(function(event){
        event.preventDefault();
        $.ajax({
            url: 'ajax.php',
            type: "POST",
            async: true,
            data: $('#form_new_cliente_venta').serialize(),

            success: function(response)
            {
                if(response != 'error'){
                    //Agregar id a input hidden
                    $('#idcliente').val(response);
                    //Bloque campos
                    $('#nom_cliente').attr('disabled','disabled');
                    $('#tel_cliente').attr('disabled','disabled');
                    $('#dir_cliente').attr('disabled','disabled');

                    //Oculta boton agregar
                    $('.btn_new_cliente').slideUp();
                    //Oculta boton guardar
                    $('#div_registro_cliente').slideUp();
                }
     
            },
            error: function(error){
            }
        });
    });

    //BUSCAR PRODUCTO 
    $('#txt_cod_producto').keyup(function(event){
        event.preventDefault();
        var producto = $(this).val();
        var action = 'infoProducto';

        if(producto !='')
        {
            $.ajax({
                url: 'ajax.php',
                type: "POST",
                async: true,
                data: {action:action,producto:producto},
    
                success: function(response)
                {
                    if(response != 'error'){
                        var info = JSON.parse(response);
                        $('#txt_descripcion').html(info.descripcion);
                        $('#txt_existencia').html(info.existencia);
                        $('#txt_cant_producto').val('1');
                        $('#txt_precio').html(info.precio);
                        $('#txt_precio_total').html(info.precio);
                    
                        //ACTIVAR CANTIDAD
                        $('#txt_cant_producto').removeAttr('disabled');

                        //MOSTRAR BOTON AGREGAR
                        $('#add_product_venta').slideDown();
                    }else{
                        $('#txt_descripcion').html('-');
                        $('#txt_existencia').html('-');
                        $('#txt_cant_producto').val('0');
                        $('#txt_precio').html('0.00');
                        $('#txt_precio_total').html('0.00');
                    
                        //BLOQUEAR CANTIDAD
                        $('#txt_cant_producto').attr('disabled','disabled');

                        //OCULTAR BOTON AGREGAR
                        $('#add_product_venta').slideUp();
                    }
                },
                error: function(error){
                }
            });
        }
    });

    //VALIDAR CANTIDAD DEL PRODUCTO 
     $('#txt_cant_producto').keyup(function(event)
     {
         event.preventDefault();
         var precio_total = $(this).val() * $('#txt_precio').html();
         var existencia = parseInt($('#txt_existencia').html());
         $('#txt_precio_total').html(precio_total);

         //OCULTA EL BOTON SI LA CANTIDAD ES MENOR A 1
         if(  ($(this).val() < 1 || isNaN($(this).val())) || ( $(this).val() > existencia) ){
            $('#add_product_venta').slideUp();
         }else{
             $('#add_product_venta').slideDown();
         }
     });

     //AGREGAR PRODUCTO AL DETALLE

     $('#add_product_venta').click(function(event){
        event.preventDefault();
        if($('#txt_cant_producto').val() > 0){
            var codproducto = $('#txt_cod_producto').val();
            var cantidad = $('#txt_cant_producto').val();
            var action = 'addProductoDetalle';

            $.ajax({
                url: 'ajax.php',
                type: "POST",
                async: true,
                data: {action:action,producto:codproducto,cantidad:cantidad},

                success: function(response)
                {
                    if(response != 'error')
                    {
                        var info = JSON.parse(response);
                        $('#detalle_venta').html(info.detalle);
                        $('#detalle_totales').html(info.totales);

                        $('#txt_cod_producto').val('');
                        $('#txt_descripcion').html('-');
                        $('#txt_existencia').html('-');
                        $('#txt_cant_producto').val('0');
                        $('#txt_precio').html('0.00');
                        $('#txt_precio_total').html('0.00');

                        //BLOQUEAR CANTIDAD
                        $('#txt_cant_producto').attr('disabled','disabled');

                        //OCULTAR BOTON AGREGAR
                        $('#add_product_venta').slideUp();
                    }else{
                        console.log('no dato');
                    }
                    viewProcesar();
                },
                error: function(error){
                    
                }
            });
        }
     });

        //ANULAR VENTA
     $('#btn_anular_venta').click(function(event){
         event.preventDefault();

         var rows = $('#detalle_venta tr').length;
         if(rows > 0)
         {

            var action = ' anularVenta';

            $.ajax({
                    url: 'ajax.php',
                    type: "POST",
                    async: true,
                    data: {action:action},

                    success: function(response)
                    {
                        if(response != 'error')
                        {
                            location.reload();
                        }
                    },
                    error: function(error){

                    }
            });
         }
     });


        //FACTURAR VENTA
     $('#btn_facturar_venta').click(function(event){
        event.preventDefault();

        var rows = $('#detalle_venta tr').length;
        if(rows > 0)
        {
            var action = 'procesarVenta';
            var codcliente = $('#idcliente').val();

           $.ajax({
                   url: 'ajax.php',
                   type: "POST",
                   async: true,
                   data: {action:action,codcliente:codcliente},

                   success: function(response)
                   {
                       if(response !='error')
                       {
                            var info = JSON.parse(response);
                            console.log(info);
                            //location.reload();
                       }else{
                           console.log('no data');
                       }
                   },
                   error: function(error){

                   }
           });
        }
    });

    //CAMBIAR PASS
    $('.newPass').keyup(function(){
        validPass();
    });

    //CAMBIAR PASS FORMULARIO
    $('#frmChangePass').submit(function(event){
        event.preventDefault();

        var passActual = $('#txtPassUser').val();
        var passNuevo = $('#txtNewPassUser').val();
        var confirmPassNuevo = $('#txtPassConfirm').val();
        var action = "changePassword";
        if(passNuevo !=confirmPassNuevo){
            $('.alertChangePass').html('<p style="color:red">Las contraseñas no son iguales.</p>');
            $('.alertChangePass').slideDown();
            return false;
        }
        
        if(passNuevo.length < 5){
            $('.alertChangePass').html('<p style="color:red">Las contraseña debe ser de 5 caracteres como minimo</p>');
            $('.alertChangePass').slideDown();
            return false;
        }

        
        $.ajax({
            url: 'ajax.php',
            type: "POST",
            async: true,
            data: {action:action,passActual:passActual,passNuevo:passNuevo},

            success: function(response)
            {
                if(response != 'error')
		        {
                    var info = JSON.parse(response);
                    if(info.cod = '00'){
                            $('.alertChangePass').html('<p style="color:green;">'+info.msg+'</p>');
                            $('#frmChangePass')[0].reset();
                    }else{
                        $('.alertChangePass').html('<p style="color:red;">'+info.msg+'</p>');
                    }
                    $('.alertChangePass').slideDown();
                }

            },
            error: function(error){
            }
    });
});
});  //FIN

function validPass(){
    var passNuevo = $('#txtNewPassUser').val();
    var confirmPassNuevo = $('#txtPassConfirm').val();
    if(passNuevo !=confirmPassNuevo){
        $('.alertChangePass').html('<p style="color:red">Las contraseñas no son iguales.</p>');
        $('.alertChangePass').slideDown();
        return false;
    }
    
    if(passNuevo.length < 5){
        $('.alertChangePass').html('<p style="color:red">Las contraseña debe ser de 5 caracteres como minimo</p>');
        $('.alertChangePass').slideDown();
        return false;
    }

    $('.alertChangePass').html('');
    $('.alertChangePass').slideUp();
}

function serchForDetalle(id){
        var action = 'serchForDetalle';
        var user = id;

        $.ajax({
            url: 'ajax.php',
            type: "POST",
            async: true,
            data: {action:action,user:user},

            success: function(response)
            {
                if(response != 'error'){
   
                var info = JSON.parse(response);
                $('#detalle_venta').html(info.detalle);
                $('#detalle_totales').html(info.totales);
                }else{
                    console.log('no data');
                }
            },
            error: function(error){

            }
});
}
function del_product_detalle(correlativo){
    var action = 'delProductoDetalle';
    var id_detalle = correlativo;

    $.ajax({
        url: 'ajax.php',
        type: "POST",
        async: true,
        data: {action:action,id_detalle:id_detalle},

        success: function(response)
        {
            if(response !='error')
            {
                var info = JSON.parse(response);

                        $('#detalle_venta').html(info.detalle);
                        $('#detalle_totales').html(info.totales);

                        $('#txt_cod_producto').val('');
                        $('#txt_descripcion').html('-');
                        $('#txt_existencia').html('-');
                        $('#txt_cant_producto').val('0');
                        $('#txt_precio').html('0.00');
                        $('#txt_precio_total').html('0.00');

                        //BLOQUEAR CANTIDAD
                        $('#txt_cant_producto').attr('disabled','disabled');

                        //OCULTAR BOTON AGREGAR
                        $('#add_product_venta').slideUp();
            }else{
                $('#detalle_venta').html('');
                $('#detalle_totales').html('');
            }
            viewProcesar();
        },
        error: function(error){            
        }
    });
}

//MOSTRAR BOTON PROCESAR
function viewProcesar(){
    if($('#detalle_venta tr').length > 0){
        $('#btn_facturar_venta').show();
    }else{
        $('#btn_facturar_venta').hide();
    }
}


function getUrl(){
    var loc = window.location;
    var pathName = loc.pathname.substring(0, loc.pathname.lastIndexOf('/')+1);
    return loc.href.substring(0,loc.href.lenght - ((loc.pathname + loc.search + loc.hash).lenght - pathName.length));
}
function sendDataProduct(){
    $('.alertAddProduct').html(''); 

    $.ajax({
        url: 'ajax.php',
        type: 'POST',
        async: true,
        data: $('#form_add_product').serialize(),
    

    success: function(response){
    console.log(response);
    
    },
    error: function(error){
        console.log(error);
    }
});
}

function coloseModal(){
    $('.alertAddProduct').html(''); 
    $('#txtCantidad').val('');
    $('#txtPrecio').val('');
    $('.modal').fadeOut();
}

