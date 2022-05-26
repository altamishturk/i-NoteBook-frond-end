import React from 'react';
import './Note.css'
import {Card} from 'react-bootstrap';
import {MdEditNote,MdDelete} from 'react-icons/md'

function Note(props) {


  return (
    <div className='note col-4 mb-4'>
        <Card>
  <Card.Header>{props.note.tag}</Card.Header>
  <Card.Body>
    <Card.Title>{props.note.title}</Card.Title>
    <Card.Text>
    {props.note.description}
    </Card.Text>
    <div className='crud_btns'> 
    <div className='icon-container' onClick={props.handleDeleteBtnClick} dataid = {props.note._id}>  
    <MdDelete />
    </div>
    <div className='icon-container' onClick={props.handleEditBtnClick} dataid = {props.note._id}>
    <MdEditNote />
    </div>
    </div>
 
  </Card.Body>
</Card>
    </div>
  )
}

export default Note