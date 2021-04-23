import { useRef } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

function ModalAddNewBoard({ isModalShow, onModalClose, onSubmitForm }) {

  const input = useRef();

  const onSubmit = e => {
    e.preventDefault();

    onSubmitForm(input.current.value);
  }

  return (
    <Modal show={isModalShow} onHide={onModalClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add New board</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={onSubmit}>
          <Form.Group>
            <Form.Label>Board Title</Form.Label>
            <Form.Control type="text" ref={input} autoFocus placeholder="Enter board title"/>
          </Form.Group>
          <Button type="submit" variant="success">Add</Button>
        </Form>
      </Modal.Body>
    </Modal>


    // <Modal.Dialog>
    //   <Modal.Header closeButton>
    //     <Modal.Title>Add New board</Modal.Title>
    //   </Modal.Header>

    //   <InputGroup className="mb-3">
    //     <FormControl
    //       placeholder="Board's Title"
    //       aria-label="Board's Title"
    //       aria-describedby="basic-addon2"
    //     />
    //   </InputGroup>


    //   <Modal.Footer>
    //     <Button variant="secondary">Close</Button>
    //     <Button variant="primary">Save changes</Button>
    //   </Modal.Footer>
    // </Modal.Dialog>
  )
}

export default ModalAddNewBoard;