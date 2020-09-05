import React,{useEffect,useState} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import Contact from './layout/Contact'
import { fetchAll } from '../actions/contectAction'

export default function Contacts() {

    const dispatch = useDispatch();
    const contacts = useSelector(state => state.contactReducer.contects)
    const [short, setShort] = useState(null)
    const [searchdata, setSearchData] = useState(null)
    const [search, setSearch] = useState(null)


    useEffect(() => {
      dispatch( fetchAll())
    }, [])//DidMount

    useEffect(() => {
        setShort(contacts)
    }, [contacts])//DidMount (condition)

    //for search
    useEffect(() => {

        if( !search ){
            console.log('empty')
            setSearchData(null) //when serch input field empty
        }
    
        if(search){
            const results = short.filter(contacts =>
                contacts.name.toLowerCase().includes(search.toLowerCase())
            );
            console.log(results)
            setSearchData(results)
        }
            
      }, [search]); //DidMount (condition)

    // short start

    const shortByNameH = () => {
        if(contacts){
            const shortByName = []
            console.log(shortByName)
            setShort(shortByName)
        contacts.sort((a, b) => 
         a.name > b.name ? 1:-1).map(
            (item, i) => shortByName.push(item) 
        )

       }
    }

    const shortByNameL = () => {
        if(contacts){
            const shortByName = []
            console.log(shortByName)
            setShort(shortByName)
        contacts.sort((a, b) => 
         a.name < b.name ? 1:-1).map(
            (item, i) => shortByName.push(item) 
        )
       }
    }

    const shortByNumberH = () => {
        if(contacts){
            const shortByNum = []
            setShort(shortByNum)
        contacts.sort((a, b) => 
         a.phone > b.phone ? 1:-1).map(
            (item, i) => shortByNum.push(item) 
        )
       }
    }

    const shortByNumberL = () => {
        if(contacts){
            const shortByNum = []
            console.log(shortByNum)
            setShort(shortByNum)
        contacts.sort((a, b) => 
         a.phone < b.phone ? 1:-1).map(
            (item, i) => shortByNum.push(item) 
        )
       }
    }

    return (
        <div>
            <div className="form-group m-4 shadow" style={{width:'20rem'}}>
             <input type="text" className="form-control" value={search} onChange={(e)=>setSearch(e.target.value)} />
          </div>
            <table className="table shadow">
      <thead className="bg-danger text-white">
    <tr>
      <th scope="col">
          <div className="custom-control custom-checkbox">
              <input type="checkbox" className="custom-control-input" id="customCheck1"/>
              <label className="custom-control-label"  ></label>
          </div>
      </th>
      <th scope="col">
          Name 
        <button className="btn text-white">
            <i className="fa fa-sort-up " onClick={()=>shortByNameH()}></i>
            <i className="fa fa-sort-down " onClick={()=>shortByNameL()}></i>
        </button>
      </th>
      <th scope="col">
          Phone No
          <button className="btn text-white">
            <i className="fa fa-sort-up" onClick={()=>shortByNumberH()}></i>
            <i className="fa fa-sort-down" onClick={()=>shortByNumberL()}></i>
        </button>
      </th>
      <th scope="col">Actions</th>
    </tr>
     </thead>
     <tbody>
    {
        searchdata?searchdata.map(scontact => {
            return <Contact contact={scontact} key={scontact?scontact._id:"loading"} />
        }):
        short?short.map(contact => {
            return(
            <Contact contact={contact} key={contact?contact._id:"loading"} />
            )
        }):
        <div className="text-center m-5">
            <div className="spinner-border" role="status">
              <span className="sr-only">Loading...</span>
           </div>
        </div>
    }
         </tbody>
         </table>
        </div>
    )
}
