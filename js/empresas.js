function mostrarEmpresas() {
    let request = sendRequest('empresas', 'GET', '');
    let table = document.getElementById('empresas-table');
    table.innerHTML = "";
    request.onload = function (){
        let data =request.response;
        data.forEach(element => {
            table.innerHTML += `
            <tr>
            <td>${element._id}</td>
            <td>${element.razonsocial}</td>
            <td>${element.nit}</td>
            <td>${element.numeroempleados}</td>
            <td>${element.ciudad}</td>
            <td>${element.telefono}</td>
            <td>${element.direccion}</td>
            <td>${element.nombrecontacto}</td>
            <td>
            <button type="button" class="btn btn-primary" onclick="window.location='/formEmpresas.html?id=${element._id}'">Editar</button>
            <button type="button" class="btn btn-danger" onclick='deleteEmpresas("${element._id}")'>Eliminar</button>
            </td>
            
        </tr>
        
        `
        });
    }
}

function deleteEmpresas(id) {
    let request = sendRequest('empresas/'+id, 'DELETE', '');
    request.onload = function (){
        mostrarEmpresas();
    }
}

function guardarEmpresas(){
   let raz = document.getElementById('razon_social-r').value
   let nit = document.getElementById('nit-n').value
   let nue = document.getElementById('numero_empleados-n').value
   let ciu = document.getElementById('ciudad-c').value
   let tel = document.getElementById('telefono-t').value
   let dir = document.getElementById('direccion-d').value
   let noc = document.getElementById('nombre_contacto-n').value
   let data = {'razonsocial':raz, 'nit':nit, 'numeroempleados':nue, 'ciudad':ciu, 'telefono':tel, 'direccion':dir, 'nombrecontacto':noc}
   let request = sendRequest('empresas/', 'POST', data);
   request.onload = function () {
    window.location = 'empresas.html';
   }
   request.onerror = function () {
        alert("Error al guardar los datos");
   }
}

function cargarDatos(id) {
    let request = sendRequest('empresas/'+id, 'GET', '') 
    let raz = document.getElementById('razon_social-r')
   let nit = document.getElementById('nit-n')
   let nue = document.getElementById('numero_empleados-n')
   let ciu = document.getElementById('ciudad-c')
   let tel = document.getElementById('telefono-t')
   let dir = document.getElementById('direccion-d')
   let noc = document.getElementById('nombre_contacto-n')

   request.onload = function () {
        let data = request.response;
        raz.value = data.razonsocial
        nit.value = data.nit
        nue.value = data.numeroempleados
        ciu.value = data.ciudad
        tel.value = data.telefono
        dir.value = data.direccion
        noc.value = data.nombrecontacto

        console.log(data)
   }
   request.onerror = function (){
        alert("Error al cargar los datos");
   }
}

function modificarEmpresas(id) {
    let raz = document.getElementById('razon_social-r').value
   let nit = document.getElementById('nit-n').value
   let nue = document.getElementById('numero_empleados-n').value
   let ciu = document.getElementById('ciudad-c').value
   let tel = document.getElementById('telefono-t').value
   let dir = document.getElementById('direccion-d').value
   let noc = document.getElementById('nombre_contacto-n').value
   let data = {'razonsocial':raz, 'nit':nit, 'numeroempleados':nue, 'ciudad':ciu, 'telefono':tel, 'direccion':dir, 'nombrecontacto':noc}
   let request = sendRequest('empresas/'+id, 'PUT', data);
   request.onload = function () {
    window.location='empresas.html';
   }
   request.onerror = function () {
    alert("Error al modificar los datos");
    } 
}