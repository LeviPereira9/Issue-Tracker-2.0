//React
import { useState, useEffect } from 'react';

//Hooks-Form
import { useForm } from 'react-hook-form';

//Bootstrap
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { InputGroup } from 'react-bootstrap';

//Icons
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

//Types
type blablabla = {
  firstName?: string;
  lastName?: string;
  department?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  acessLevel?: number;
  terms?: string;
};

const Register = () => {
  const [formErrors, setFormErrors] = useState<blablabla>({});
  const [showPassword, setShowPassword] = useState(false);

  //useForm Hooks
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  //Validation from useForms
  useEffect(() => {
    setFormErrors(errors as blablabla);
  }, [errors]);

  const onSubmit = (data: blablabla) => {
    const createAccount = {
      firstName: data.firstName,
      lastName: data.lastName,
      department: data.department,
      acessLevel: 1,
      email: data.email,
      password: data.password,
    };

    console.log(createAccount);
  };

  return (
    <div className="container d-flex">
      <div className="container d-none d-md-block">
        <h2>Create Account</h2>
        <p>Already have a account? Log in</p>
      </div>
      <Form
        className="row justify-content-center col-12 col-md-6 m-auto m-md-0 formStyle"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Form.Group className="mb-3 col-12 col-md-6" controlId="regFirstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nome"
            aria-label="Insira seu primeiro nome"
            tabIndex={0}
            {...register('firstName', { required: true })}
            isInvalid={!!formErrors.firstName}
          />
          {formErrors.firstName && (
            <Form.Control.Feedback type="invalid">
              This field is required.
            </Form.Control.Feedback>
          )}
        </Form.Group>
        <Form.Group className="mb-3 col-12 col-md-6" controlId="regLastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Sobrenome"
            aria-label="Insira seu sobrenome"
            tabIndex={0}
            {...register('lastName', { required: true })}
            isInvalid={!!formErrors.lastName}
          />
          {formErrors.lastName && (
            <Form.Control.Feedback type="invalid">
              This field is required.
            </Form.Control.Feedback>
          )}
        </Form.Group>
        <Form.Group className="mb-3 col-12" controlId="regDepart">
          <Form.Label>Department</Form.Label>
          <Form.Select
            aria-label="Selecione seu setor de trabalho"
            tabIndex={0}
            {...register('department', {
              required: true,
              validate: value => value !== '0',
            })}
            isInvalid={!!formErrors.department}
            defaultValue={'0'}
          >
            <option value={'0'} disabled>
              Open this select menu
            </option>
            <option value={'HR'}>Human Resources</option>
            <option value={'Finance'}>Accounting/Finance</option>
            <option value={'Sales'}>Sales</option>
            <option value={'Marketing'}>Marketing</option>
            <option value={'IT'}>Information Technology</option>
            <option value={'Operations'}>Operations</option>
            <option value={'Customer Service'}>Customer Service</option>
            <option value={'Operations'}>Operations</option>
          </Form.Select>
          {formErrors.department && (
            <Form.Control.Feedback type="invalid">
              This field is required.
            </Form.Control.Feedback>
          )}
        </Form.Group>
        <Form.Group className="mb-3 col-12" controlId="regEmail">
          <Form.Label>E-mail</Form.Label>
          <Form.Control
            type="email"
            placeholder="E-mail"
            aria-label="Insira seu e-mail"
            tabIndex={0}
            {...register('email', { required: true })}
            isInvalid={!!formErrors.email}
          />
          {formErrors.email && (
            <Form.Control.Feedback type="invalid">
              This field is required.
            </Form.Control.Feedback>
          )}
        </Form.Group>
        <Form.Group className="mb-3 col-12" controlId="regPassword">
          <Form.Label>Password</Form.Label>
          <InputGroup>
            <Form.Control
              type={showPassword ? 'text' : 'password'}
              placeholder="Insira uma senha"
              aria-label="Escolha uma senha"
              tabIndex={0}
              autoComplete="password"
              {...register('password', { required: true })}
              isInvalid={!!formErrors.password}
              aria-describedby="showPassword-addon"
            />
            <InputGroup.Text
              className={
                !!formErrors.password
                  ? 'formStyle__registerAddon formStyle__invalid '
                  : 'formStyle__registerAddon'
              }
              aria-label="Mostrar/Esconder senha"
              tabIndex={0}
              onClick={() => {
                setShowPassword(!showPassword);
              }}
              id="showPassword-addon"
            >
              {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
            </InputGroup.Text>
            {formErrors.password && (
              <Form.Control.Feedback type="invalid">
                This field is required.
              </Form.Control.Feedback>
            )}
          </InputGroup>
        </Form.Group>
        <Form.Group className="mb-3 col-12" controlId="regConfirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <InputGroup>
            <Form.Control
              type={showPassword ? 'text' : 'password'}
              placeholder="Insira uma senha"
              aria-label="Confirme sua senha"
              tabIndex={0}
              autoComplete="confirmPassword"
              {...register('confirmPassword', {
                required: true,
                validate: value => value === watch('password'),
              })}
              isInvalid={!!formErrors.confirmPassword}
            />
            <InputGroup.Text
              className={
                !!formErrors.password
                  ? 'formStyle__registerAddon formStyle__invalid '
                  : 'formStyle__registerAddon'
              }
              aria-label="Mostrar/Esconder confirmação de senha"
              tabIndex={0}
              onClick={() => {
                setShowPassword(!showPassword);
              }}
              id="showConfirmPassword-addon"
            >
              {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
            </InputGroup.Text>
            {formErrors.confirmPassword && (
              <Form.Control.Feedback type="invalid">
                The passwords dont match
              </Form.Control.Feedback>
            )}
          </InputGroup>
        </Form.Group>
        <hr />
        <Form.Group controlId="regTerms">
          <Form.Check
            label="Aceitar os termos de uso"
            aria-label="Aceitar os termos de uso"
            tabIndex={0}
            {...register('terms', { required: true })}
            isInvalid={!!formErrors.terms}
            feedback="You must agree before submitting."
            feedbackType="invalid"
          />
        </Form.Group>
        <Button
          type="submit"
          variant="primary"
          className="col-8 col-md-4 my-3"
          aria-label="Registrar-se"
          tabIndex={0}
        >
          Create Account
        </Button>
      </Form>
    </div>
  );
};

export default Register;
