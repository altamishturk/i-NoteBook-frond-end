import React, { useState } from "react";
import { useContext } from "react";
import NotesContext from "../../Context/note/NoteContext";
import { Form, Button } from "react-bootstrap";
import Note from "../../components/Note/Note";
// import { useNavigate } from "react-router-dom";

function Notes() {

  // let navigator = useNavigate();
  const notesState = useContext(NotesContext);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tag: "",
  });
  const [crudId, setCrudId] = useState("");


  //  update changes in create note form
  const handdleChange = (e) => {
    setFormData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  //  create note on submit buttuon ckick
  const handdleSubmit = async (e) => {
    e.preventDefault();
    let res = await notesState.insertNote(formData);

    if (res.success) {
      notesState.setNotes((prev) => {
        return [...prev, res.note];
      });
    } else {
      alert(res.message);
    }
    setFormData(() => {
      return { title: "", description: "", tag: "" };
    });
  };

 // delete note
  const handleDeleteBtnClick = async (e) => {
    const deleteId = e.target.getAttribute("dataid");

    if (window.confirm("Are You Sure! Do you want to delete this note")) {
      const res = await notesState.deleteNote(deleteId);

      if (res.success) {
        let filteredNotes = notesState.notes.filter(
          (note) => note._id !== deleteId
        );
        notesState.setNotes(() => {
          return filteredNotes;
        });
      } else {
        alert(res.message);
      }
    }
  };

   //  update note
  const handleEditBtnClick = (e) => {
    let tarEl = e.target;
    let noteId = tarEl.getAttribute("dataid");
    setCrudId(() => noteId);
    let cardEl = tarEl.parentElement.parentElement.parentElement;
    let title = cardEl.querySelector(".card-title").innerText;
    let description = cardEl.querySelector(".card-text").innerText;
    let tag = cardEl.querySelector(".card-header").innerText;
    setFormData(() => {
      return { title, description, tag };
    });
  };

  const handdleClearText = () => {
    setCrudId(() => "");
    setFormData(() => {
      return { title: "", description: "", tag: "" };
    });
  };

  const handdleUpdateNote = async () => {
    let res = await notesState.updateNote(formData, crudId);

    if (res.success) {
      //Find index of specific object using findIndex method.    
      let noteIndex = notesState.notes.findIndex((note => note._id === crudId));
  
      notesState.notes[noteIndex].title = formData.title;
      notesState.notes[noteIndex].description = formData.description;
      notesState.notes[noteIndex].tag = formData.tag;

      setCrudId(() => "");
    } else {
      alert(res.message);
    }
    setFormData(() => {
      return { title: "", description: "", tag: "" };
    });
  };


  return (
    <div className="home container">
      <h2 className="text-center my-5">Create Notes</h2>
      <Form className="col-6 mx-auto my-5" onSubmit={handdleSubmit}>
        <Form.Group className="mb-3 " controlId="formBasicEmail">
          <Form.Label className="text-left">Title</Form.Label>
          <Form.Control
            type="text"
            value={formData.title}
            onChange={handdleChange}
            name="title"
            placeholder="Eg:- Title"
          />
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            value={formData.description}
            onChange={handdleChange}
            name="description"
            placeholder="Eg:- Description"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Tag</Form.Label>
          <Form.Control
            type="text"
            value={formData.tag}
            onChange={handdleChange}
            name="tag"
            placeholder="Eg:- tag"
          />
        </Form.Group>

        <div className="d-flex justify-content-end gap-2">
          <Button
            onClick={handdleClearText}
            className={crudId === "" ? "d-none" : ""}
            variant="primary"
            type="button"
          >
            Clear
          </Button>
          <Button
            className={crudId !== "" ? "d-none" : ""}
            variant="primary"
            type="submit"
          >
            Create
          </Button>
          <Button
            onClick={handdleUpdateNote}
            className={crudId === "" ? "d-none" : ""}
            variant="primary"
            type="button"
          >
            Update
          </Button>
        </div>
      </Form>

      <hr />
      <div className="notes">
        <h2 className="text-center my-5">Your Notes</h2>
        <div className="row">
          {notesState.notes?.map((note, index) => (
            <Note
              key={index}
              handleDeleteBtnClick={handleDeleteBtnClick}
              handleEditBtnClick={handleEditBtnClick}
              note={note}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Notes;
