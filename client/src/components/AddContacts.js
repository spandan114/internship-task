import React,{useState,useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux';
import {addContact} from '../actions/contectAction'
import { useHistory } from 'react-router-dom';


export default function AddContacts() {

    const dispatch = useDispatch();
    const [name,setName] = useState("")
    const [phone,setPhone] = useState("")
    const [err,setErr] = useState("")
    const errmsg = useSelector(state => state.contactReducer.errmsg)
    const history = useHistory()

    const createContact = (e)=>{
         e.preventDefault();
         const new_contact = {
             name:name,
             phone:phone
         }
         const onSuccess = () =>{
            history.push("/")
         }

         dispatch(addContact(new_contact,onSuccess))
         if( !name || !phone ){
         history.push("/contacts/add")
         setErr("please fill all fields")
         }
    }

    useEffect(() => {
        setErr(errmsg)
    }, [errmsg])

    return (
        <div className="card border-0 shadow">
            <div className="card-header bg-danger text-white text-center">Add Your Contact</div>
            <div className="card-body">
                
                {
                    err?
                    <div className="alert alert-danger" role="alert">
                       {err}
                    </div>:""
                }

                <form onSubmit={e=>createContact(e)}>
                 <div className="form-group">
                   <label >Enter Your Name</label>
                   <input type="text" value={name} onChange={(e)=>setName(e.target.value)} className="form-control" />
                  </div>
                  {/* <div className="form-group">
                   <label >Enter Your Email</label>
                   <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} className="form-control" />
                  </div> */}
                  <div className="form-group">
                   <label >Enter Your Phone No</label>
                   <input type="number" value={phone} onChange={(e)=>setPhone(e.target.value)} className="form-control" />
                  </div>
                  <button type="submit" className="btn btn-primary btn-block">Create Contact</button>
                </form>
            </div>
        </div>
    )
}
