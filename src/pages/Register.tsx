//React
import { useState, useEffect } from 'react';

//Router-Dom
import { Link } from 'react-router-dom';

//Hooks-Form
import { useForm } from 'react-hook-form';

//Bootstrap
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { InputGroup } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';

//Icons
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

//Types
import { CreateAuth, FormRegister } from '../types/autheticationTypes';

//Hooks
import { useAuthentication } from '../hooks/useAuthentication';
import SideContent from '../components/shared/SideContent';

const Register = () => {
  const [formErrors, setFormErrors] = useState<FormRegister>({});
  const [showPassword, setShowPassword] = useState(false);

  const { createAccount, loading, errorMessage, setErrorMessage } =
    useAuthentication();

  //useForm Hooks
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  //Validation from useForms
  useEffect(() => {
    setFormErrors(errors as FormRegister);
  }, [errors]);

  const onSubmit = (data: FormRegister) => {
    const createAuth: CreateAuth = {
      email: data.email!,
      password: data.password!,
    };

    createAccount({ createAuth, data });

    setTimeout(() => {
      setErrorMessage(' ');
    }, 5000);
  };

  return (
    <div className="container d-flex p-0 formStyle mb-5">
      <SideContent
        className="register-sideContent"
        title="Create new account"
        text="Already a member?"
        toRedirect="/login"
        toText="Log in"
        label='Ir para página de login'
        imgUrl="undraw_team_up_re_84ok.svg"
      />
      <Form
        className="row justify-content-center col-12 col-md-6 m-auto m-md-0 formStyle-input register-form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <h3 className="text-center mb-4">Issue Tracker 2.0</h3>
        <hr />
        <Form.Group
          className="mb-3 col-12 col-md-6 form-group"
          controlId="regFirstName"
        >
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
        <Form.Group
          className="mb-3 col-12 col-md-6 form-group"
          controlId="regLastName"
        >
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
        <Form.Group className="mb-3 col-12 form-group" controlId="regDepart">
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
        <Form.Group className="mb-3 col-12 form-group" controlId="regEmail">
          <Form.Label>E-mail</Form.Label>
          <Form.Control
            type="email"
            placeholder="E-mail"
            aria-label="Insira seu e-mail"
            tabIndex={0}
            {...register('email', {
              required: true,
              pattern:
                /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
            })}
            isInvalid={!!formErrors.email || errorMessage.includes('E-mail')}
          />
          {formErrors.email && (
            <Form.Control.Feedback type="invalid">
              This field must be filled with a valid email.
            </Form.Control.Feedback>
          )}

          {errorMessage && errorMessage.includes('E-mail') && (
            <Form.Control.Feedback type="invalid">
              This email is already registered.
            </Form.Control.Feedback>
          )}
        </Form.Group>
        <Form.Group
          className={`mb-3 col-12 form-group ${
            formErrors.password ? 'mb-5' : 'mb-0'
          }`}
          controlId="regPassword"
        >
          <Form.Label>Password</Form.Label>
          <InputGroup>
            <Form.Control
              type={showPassword ? 'text' : 'password'}
              placeholder="Insira uma senha"
              aria-label="Escolha uma senha"
              tabIndex={0}
              autoComplete="password"
              {...register('password', {
                required: true,
                minLength: 6,
                pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/,
              })}
              isInvalid={!!formErrors.password}
              aria-describedby="showPassword-addon"
            />
            <InputGroup.Text
              className={
                !!formErrors.password
                  ? 'formStyle-input__addon formStyle__invalid '
                  : 'formStyle-input__addon'
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
                Password must be at least 6 characters long and include at least
                one uppercase letter, one lowercase letter, and one number.
              </Form.Control.Feedback>
            )}
          </InputGroup>
        </Form.Group>
        <Form.Group
          className="mb-3 col-12 mb-4 form-group"
          controlId="regConfirmPassword"
        >
          <Form.Label>Confirm Password</Form.Label>
          <InputGroup>
            <Form.Control
              type={showPassword ? 'text' : 'password'}
              placeholder="Confirme sua senha"
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
                  ? 'formStyle-input__addon formStyle__invalid '
                  : 'formStyle-input__addon'
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
                The passwords do not match.
              </Form.Control.Feedback>
            )}
          </InputGroup>
        </Form.Group>
        <hr />
        <Form.Group className="form-group" controlId="regTerms">
          <Form.Check
            label={
              <>
                I have read and agree to the{' '}
                <Link
                  className={
                    !formErrors.password
                      ? 'formStyle-input__terms'
                      : 'formStyle-input__terms link__invalid'
                  }
                  aria-label="Ir para os termos de uso"
                  tabIndex={0}
                  to="/terms"
                  target="_blank"
                >
                  Terms and Conditions.
                </Link>
              </>
            }
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
          className="col-8 col-md-4 mt-4 mb-3 formStyle-input__button"
          aria-label="Registrar-se"
          tabIndex={0}
          disabled={loading}
        >
          {!loading ? (
            'Create Account'
          ) : (
            <Spinner animation="border" size="sm" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          )}
        </Button>
        <div className="d-md-none text-center mb-5">
          <hr />
          <span className="mb-3">
            Already have a account?{' '}
            <Link
              className="formStyle-input__link"
              aria-label="Ir para página de login"
              tabIndex={0}
              to={'/login'}
            >
              Log in
            </Link>
          </span>
        </div>
      </Form>
    </div>
  );
};

export default Register;
