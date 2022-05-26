import React, { useContext, useState } from 'react';
import {Form,Button} from 'react-bootstrap';
import NotesContext from '../../Context/note/NoteContext'; 
import {postRequest} from '../../utils/fetchRequest';
import {useNavigate} from 'react-router-dom';

function SignUp() {

  const navigator = useNavigate();
  const noteState = useContext(NotesContext);
  const [userData,setUserData] = useState({userName:'',email:'',password:'',confirmPassword:''});


  const handdleChange = (e)=>{
    setUserData(prev=>{
      return {
        ...prev,
        [e.target.name]: e.target.value
      }
    })
  }


  const handleSignup = async (e)=>{
    e.preventDefault()

    let res = await postRequest(`${noteState.host}/api/v1/user`,'POST',userData);

    console.log(res);

    if (res.success) {
      localStorage.setItem('loginToken',res.token);
      navigator('/notes');
    }
    else{
      alert(res.message)
    }

  }

  return (
    <div>
        <h2 className='text-center my-5'>Create An Account Here..</h2>
        <Form className='col-6 mx-auto my-5' onSubmit={handleSignup}>
  <Form.Group className="mb-3" controlId="formBasicUserName">
    <Form.Label>User Name</Form.Label>
    <Form.Control type="text" name='userName' value={userData.userName} onChange={handdleChange} placeholder="Enter User Name" />
  </Form.Group>
  <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>Email address</Form.Label>
    <Form.Control type="email" name='email' value={userData.email} onChange={handdleChange} placeholder="Enter email" />
    <Form.Text className="text-muted">
      We'll never share your email with anyone else.
    </Form.Text>
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" name='password' value={userData.password} onChange={handdleChange} placeholder="Password" />
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label>Confirm Password</Form.Label>
    <Form.Control type="password" name='confirmPassword' value={userData.confirmPassword} onChange={handdleChange} placeholder="Confirm Password" />
  </Form.Group>

  <Button variant="primary" type="submit">
    Create
  </Button>
</Form>
    </div>
  )
}

export default SignUp