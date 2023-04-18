import React from 'react';

const Formulario = () => {
  return (
    <div className="container mt-5">
        <h1 className="text-center">Formulario</h1>
        <hr/>
        <div className="row">
            <div className="col-6">
                <h4 className="text-center">Agregar Clientes</h4>
                <form>
                    <select className="form-select mb-4" name="tipoDoc" id="">
                        <option value="1">Cedula de ciudadanía</option>
                        <option value="2">Tarjeta de identidad</option>
                        <option value="3">Pasaporte</option>
                        <option value="4">Cedula de extranjería</option>
                    </select>
                    <input tipe="text" className="form-control mb-4" placeholder="Documento de Identidad" />
                    <input tipe="text" className="form-control mb-4" placeholder="Nombre" />
                    <input tipe="text" className="form-control mb-4" placeholder="Apellido" />
                    <input tipe="text" className="form-control mb-4" placeholder="Teléfono" />
                    <input tipe="text" className="form-control mb-4" placeholder="Dirección" />
                    <input tipe="text" className="form-control mb-4" placeholder="Correo Electrónico" />
                </form>
            </div>
            <div className="col-6" >
                <h4 className="text-center" >Listado de Clientes</h4>
                <ul className="list-group">
                    <li className="list-group-item">
                    </li>
                </ul>
            </div>
        </div>
    </div>
  )
};

 export default Formulario;
