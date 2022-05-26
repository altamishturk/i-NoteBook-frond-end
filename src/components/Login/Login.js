import React, { useContext, useState } from 'react';
import {Form,Button} from 'react-bootstrap';
import {postRequest} from '../../utils/fetchRequest';
import NoteContext from '../../Context/note/NoteContext';
import {useNavigate} from 'react-router-dom';

function Login() {

  const navigator = useNavigate();
  const nodestates = useContext(NoteContext);
  const [formData,setFormData] = useState({email:'',password:''})



   const handdleChange = (e)=>{
    setFormData(prev=>{
      return {
        ...prev,
        [e.target.name]: e.target.value
      }
    })
  }




  const handdlesubmit = async (e)=>{
    e.preventDefault();
    let res = await postRequest(`${nodestates.host}/api/v1/user/login`,'POST',formData)

    if (res.success) {
      localStorage.setItem('loginToken',res.token);
      navigator('/notes');
    }
    else{
      console.log(res);
    }
    setFormData(()=>{return {email:'',password:''}})
  }

  return (
    <div className='login container'>
        <h2 className='text-center my-5'>Login Here..</h2>
        <Form className='col-6 mx-auto my-5' onSubmit={handdlesubmit}>
  <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>Email address</Form.Label>
    <Form.Control type="email" value={formData.email} name='email' onChange={handdleChange} placeholder="Enter email" />
    <Form.Text className="text-muted">
      We'll never share your email with anyone else.
    </Form.Text>
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" value={formData.password} name='password' onChange={handdleChange} placeholder="Password" />
  </Form.Group>

  <Button variant="primary" type="submit">
    Login
  </Button>
</Form>
    </div>
  )
}

export default Login