import React, {useState, useEffect} from 'react';
import {db} from '../firebase';
import { addDoc, doc, collection, onSnapshot, deleteDoc, updateDoc, } from 'firebase/firestore';

const Formulario = () => {
    const [id, setId] = useState('')
    const [TipDocument, setTipDocument] = useState('');
    const [Document, setDocument] = useState('');
    const [Nombre, setNombre] = useState('');
    const [Apellido, setApellido] = useState('');
    const [Telefono, setTelefono] = useState('');
    const [Direccion, setDireccion] = useState('');
    const [Email, setEmail] = useState('');
    const [ListaClientes, setListaClientes] = useState([]);
    const [ModoEdicion, setModoEdicion] = useState(false);
    useEffect(()=>{
        const obtenerClientes = async ()=>{
            try {
                await onSnapshot(collection(db, 'clientes'), (query)=>{
                    setListaClientes(query.docs.map((doc)=>({...doc.data(), id: doc.id})));
                })
            } catch (error) {
                console.log(error);
            }    
        }
        obtenerClientes();
    }, [])
    const limpiar =()=>{
        setNombre('')
        setApellido('')
        setTelefono('')
        setDireccion('')
        setEmail('')
        setDocument('')
        setTipDocument('')

    }

    const eliminar = async id =>{
        try {
            await deleteDoc(doc(db,'clientes',id))
        } catch (error) {
            console.log(error)
        }
    }

    const guardar = async(e)=>{
        e.preventDefault()
        try {
            const data = await addDoc(collection(db, 'clientes'),{
                Document: Document,
                Tipo: TipDocument,
                Nombre: Nombre,
                Apellido: Apellido,
                Tel: Telefono,
                Direccion: Direccion,
                Email: Email
            })
            setListaClientes(
                [...ListaClientes,{
                    Tipo: TipDocument,
                    Document: Document,
                    Nombre: Nombre,
                    Apellido: Apellido,
                    Tel: Telefono,
                    Direccion: Direccion,
                    Email: Email,
                    id: data.id
                }]
            )
            limpiar()
        } catch (error) {
            console.log(error)
        }
    }

    const editar = item =>{
        setTipDocument(item.Tipo)
        setDocument(item.Document)
        setNombre(item.Nombre)
        setApellido(item.Apellido)
        setTelefono(item.Tel)
        setDireccion(item.Direccion)
        setEmail(item.Email)
        setId(item.id)
        setModoEdicion(true)
    }
    
    const editarCliente = async e=>{
        e.preventDefault();
        try {
            const docRef = doc(db, 'clientes', id);
            await updateDoc(docRef,{
                Document: Document,
                Tipo: TipDocument,
                Nombre: Nombre,
                Apellido: Apellido,
                Tel: Telefono,
                Direccion: Direccion,
                Email: Email
            })
            const nuevoArray = ListaClientes.map(
                item => item.id === id? {id:id, Document: Document, Tipo:TipDocument, Nombre:Nombre, Apellido:Apellido, Tel:Telefono, Direccion:Direccion, Email:Email}: item
            )
            setListaClientes(nuevoArray)
            limpiar()
            setModoEdicion(false)
        } catch (error) {
            console.log(error)
        }
    }

    const cancelar = ()=>{
        setModoEdicion(false);
        limpiar()
    }
  return (
    <div className="container mt-5">
        <h1 className="text-center">Formulario</h1>
        <hr/>
        <div className="row">
            <div className="col-4">
                <h4 className="text-center">{ModoEdicion? 'Editar Cliente':'Agregar Clientes'}</h4>
                <form onSubmit={ModoEdicion ? editarCliente:guardar} id='FormClientes'> 
                    <select required value={TipDocument} onChange={(e)=>setTipDocument(e.target.value)} className="form-select mb-4" name="Document" id={TipDocument}>
                        <option value={TipDocument} defaultChecked>{TipDocument? TipDocument: 'Seleccione el tipo de document'}</option>
                        <option value="Cedula de ciudadanía">Cedula de ciudadanía</option>
                        <option value="Tarjeta de identidad">Tarjeta de identidad</option>
                        <option value="Pasaporte">Pasaporte</option>
                        <option value="Cedula de extranjería">Cedula de extranjería</option>
                    </select>
                    <input required onChange={(e)=>setDocument(e.target.value)} value={Document} type="number" className="form-control mb-4" placeholder="Documento de Identidad" />
                    <input required onChange={(e)=>setNombre(e.target.value)} value={Nombre} type="text" className="form-control mb-4" placeholder="Nombre" />
                    <input required onChange={(e)=>setApellido(e.target.value)} value={Apellido} type="text" className="form-control mb-4" placeholder="Apellido" />
                    <input required onChange={(e)=>setTelefono(e.target.value)} value={Telefono} type="number" lim className="form-control mb-4" placeholder="Teléfono" />
                    <input required onChange={(e)=>setDireccion(e.target.value)} value={Direccion} type="text" className="form-control mb-4" placeholder="Dirección" />
                    <input required onChange={(e)=>setEmail(e.target.value)} value={Email} type="email" className="form-control mb-4" placeholder="Correo Electrónico" />
                    <div className='pb-4'>
                        {
                            ModoEdicion? 
                            (
                                <>
                                    <button className='btn btn-success btn-block mx-2'>Actualizar</button>
                                    <button className='btn btn-danger btn-block' onClick={()=>cancelar()}>Cancelar</button>
                                </>
                            ):
                            (
                                <>
                                    <button className='btn btn-primary btn-block'>Agregar</button>
                                </>
                            )
                        }
                    </div>
                </form>
            </div>
            <div className="col-8" >
                <h4 className="text-center" >Listado de Clientes</h4>
                <ul className="list-group">
                    {
                        ListaClientes.map(item=>(
                            <li className="list-group-item" key={item.id}>
                                <span className='lead'>Documento: {item.Document} Nombre: {item.Nombre} {item.Apellido}</span>
                                <button className='btn btn-warning btn-sn fload-end mx-2' onClick={()=>editar(item)}>Editar</button>
                                <button className='btn btn-danger btn-sn fload-end mx-2' onClick={()=>eliminar(item.id)}>Eliminar</button>
                            </li>
                        ))
                    }
                    
                </ul>
            </div>
        </div>
    </div>
  )
};

 export default Formulario;
