import {useState,useEffect} from 'react'
import NoteContext from './NoteContext.js';
import {postRequest} from '../../utils/fetchRequest'



const NotesState = (props) =>{

    const host = 'http://localhost:4000';
    const [notes, setNotes] = useState([])
    const [isLoggedIn,setIsLoggedIn] = useState(false);

    const insertNote = async (noteData)=>{
        let res = await postRequest(`${host}/api/v1/note/`,'POST',noteData);
        console.log(res);
        return res;
    }

    const updateNote = async (noteData,id)=>{
        let res = await postRequest(`${host}/api/v1/note/${id}`,'PUT',noteData);
        console.log(res);
        return res;
    }
    
    const deleteNote = async (id)=>{
        let res = await postRequest(`${host}/api/v1/note/${id}`,'DELETE');
        console.log(res);
        return res;
    }


    useEffect(() => {
        let headers = {
            headers: {
              'Content-Type': 'application/json',
              'authorization': localStorage.getItem('loginToken')
            }
          }
      
          fetch(`http://localhost:4000/api/v1/note/all`,headers)
          .then(res => res.json())
          .then(data=> {
            setNotes(data.notes);
            setIsLoggedIn(true)
          })
    }, [])
    

    return (
        <NoteContext.Provider value={{notes,host,isLoggedIn,setIsLoggedIn,setNotes,insertNote,updateNote,deleteNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}


export default NotesState