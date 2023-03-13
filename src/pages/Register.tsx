//React
import { useState, useEffect } from 'react';

//Bootstrap
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import AcessLevel from '../components/shared/AcessLevel';

type Props = {};

const Register = (props: Props) => {

    const [acessLevel, setAcessLevel] = useState(0);

    useEffect(() => {
        console.log(acessLevel)
    
    }, [acessLevel])
    
    
  return (
    <div className="container">
      <Form className="row justify-content-center">
        <Form.Group className="mb-3 col-12 col-md-6" controlId="regFirstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nome"
            aria-label="Insira seu primeiro nome"
            tabIndex={0}
          />
        </Form.Group>
        <Form.Group className="mb-3 col-12 col-md-6" controlId="regLastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Sobrenome"
            aria-label="Insira seu sobrenome"
            tabIndex={0}
          />
        </Form.Group>
        <Form.Group className="mb-3 col-12" controlId="regDepart">
          <Form.Label>Department</Form.Label>
          <Form.Select
            aria-label="Selecione seu setor de trabalho"
            tabIndex={0}
          >
            <option disabled> Open this select menu </option>
            <option value={'HR'}>Human Resources</option>
            <option value={'Finance'}>Accounting/Finance</option>
            <option value={'Sales'}>Sales</option>
            <option value={'Marketing'}>Marketing</option>
            <option value={'IT'}>Information Technology</option>
            <option value={'Operations'}>Operations</option>
            <option value={'Customer Service'}>Customer Service</option>
            <option value={'Operations'}>Operations</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3 col-12" controlId="regEmail">
          <Form.Label>E-mail</Form.Label>
          <Form.Control
            type="email"
            placeholder="E-mail"
            aria-label="Insira seu e-mail"
            tabIndex={0}
          />
        </Form.Group>
        <Form.Group className="mb-3 col-12" controlId="regPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Insira uma senha"
            aria-label="Escolha uma senha"
            tabIndex={0}
          />
        </Form.Group>
        <Form.Group className="mb-3 col-12" controlId="regConfirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Insira uma senha"
            aria-label="Confirme sua senha"
            tabIndex={0}
          />
        </Form.Group>
        <AcessLevel setAcessLevel={setAcessLevel}/>
        <Button variant='primary' className='col-8 col-md-4 my-5'>Register</Button>
      </Form>
    </div>
  );
};

export default Register;
