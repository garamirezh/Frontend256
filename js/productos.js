function mostrarProductos() {
    let request = sendRequest('empresas', 'GET', '');
    let table = document.getElementById('productos-table');
    table.innerHTML = "";
    request.onload = function (){
        let data =request.response;
        data.forEach(element => {
            table.innerHTML += `
            <tr>
            <td>${element._id}</td>
            <td>${element.nombre}</td>
            <td>${element.descripcion}</td>
            <td>${element.precio}</td>
            <td>${element.categoria}</td>
            <td>${element.stock}</td>
            <td>${element.disponible}</td>
            <td>${element.fechaCreacion}</td>
            <td>${element.ultimaActualizacion}</td>
            <td>
            <button type="button" class="btn btn-primary" onclick="window.location='/formProductos.html?id=${element._id}'">Editar</button>
            <button type="button" class="btn btn-danger" onclick='deleteProductos("${element._id}")'>Eliminar</button>
            </td>
            
        </tr>
        
        `
        });
    }
}

function deleteProductos(id) {
    let request = sendRequest('productos/'+id, 'DELETE', '');
    request.onload = function (){
        mostrarProductos();
    }
}

function guardarProductos(){
   let nom = document.getElementById('nombre-n').value
   let des = document.getElementById('descripcion-d').value
   let pre = document.getElementById('precio-p').value
   let cat = document.getElementById('categoria-c').value
   let sto = document.getElementById('stock-s').value
   let dis = document.getElementById('disponible-d').value
   let fec = document.getElementById('fecha_creacion-f').value
   let ult = document.getElementById('ultima_actualizacion-u').value
   let data = {'nombre':nom, 'descripcion':des, 'precio':pre, 'categoria':cat, 'stock':sto, 'disponible':dis, 'fechaCreacion':fec, 'ultimaActualizacion':ult}
   let request = sendRequest('productos/', 'POST', data);
   request.onload = function () {
    window.location = 'productos.html';
   }
   request.onerror = function () {
        alert("Error al guardar los datos");
   }
}

function cargarDatos(id) {
    let request = sendRequest('productos/'+id, 'GET', '') 
    let nom = document.getElementById('nombre-n')
    let des = document.getElementById('descripcion-d')
    let pre = document.getElementById('precio-p')
    let cat = document.getElementById('categoria-c')
    let sto = document.getElementById('stock-s')
    let dis = document.getElementById('disponible-d')
    let fec = document.getElementById('fecha_creacion-f')
    let ult = document.getElementById('ultima_actualizacion-u')

   request.onload = function () {
        let data = request.response;
        nom.value = data.nombre
        des.value = data.descripcion
        pre.value = data.precio
        cat.value = data.categoria
        sto.value = data.stock
        dis.value = data.disponible
        fec.value = data.fechaCreacion
        ult.value = data.ultimaActualizacion

        console.log(data)
   }
   request.onerror = function (){
        alert("Error al cargar los datos");
   }
}

function modificarProductos(id) {
    let nom = document.getElementById('nombre-n').value
   let des = document.getElementById('descripcion-d').value
   let pre = document.getElementById('precio-p').value
   let cat = document.getElementById('categoria-c').value
   let sto = document.getElementById('stock-s').value
   let dis = document.getElementById('disponible-d').value
   let fec = document.getElementById('fecha_creacion-f').value
   let ult = document.getElementById('ultima_actualizacion-u').value
   let data = {'nombre':nom, 'descripcion':des, 'precio':pre, 'categoria':cat, 'stock':sto, 'disponible':dis, 'fechaCreacion':fec, 'ultimaActualizacion':ult}
   let request = sendRequest('productos/'+id, 'PUT', data);
   request.onload = function () {
    window.location='productos.html';
   }
   request.onerror = function () {
    alert("Error al modificar los datos");
    } 
}