//React
import { useState, useEffect } from 'react';

//Router Dom
import { Link } from 'react-router-dom';

//useForm hook
import { useForm } from 'react-hook-form';

//Bootstrap
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { InputGroup } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';

type Props = {};

//Types
type LogIn = {
  email?: string;
  password?: string;
  rememberMe?: boolean
};

const Login = (props: Props) => {
  const [formErrors, setFormErrors] = useState<LogIn>({});
  const [showPassword, setShowPassword] = useState(false);

  //useForm Hooks
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //Validation from useForms
  useEffect(() => {
    setFormErrors(errors as LogIn);
  }, [errors]);

  const onSubmit = (data: LogIn) => {
    console.log(data);
  };

  return (
    <div className="container d-flex p-0 formStyle">
      <div className="w-100 ">
        <h3 className="text-center pt-4">Issue Tracker 2.0</h3>
        <Form
          className="row w-100 justify-content-center col-12 col-md-6 m-auto m-md-0 formStyle-register"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Form.Group className="mb-4">
            <Form.Label>E-mail</Form.Label>
            <Form.Control
              type="e-mail"
              placeholder="Insira seu e-mail cadastrado"
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
          <Form.Group className="mb-4">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="senha"
              aria-label="Insira sua senha cadastrada"
              tabIndex={0}
              {...register('password', { required: true })}
              isInvalid={!!formErrors.password}
            />
            {formErrors.password && (
              <Form.Control.Feedback type="invalid">
                This field is required.
              </Form.Control.Feedback>
            )}
          </Form.Group>
          <hr />
          <Form.Group className='mb-4 d-flex justify-content-between' controlId="logRemember">
            <Form.Check
              label="Remember me"
              aria-label="Lembrar próxima sessão."
              tabIndex={0}
              {...register('rememberMe')}
            />
            <Link className="formStyle-register__link" to={'/seiLa'} aria-label="Esqueci minha senha" tabIndex={0}>Forget Password</Link>
          </Form.Group>
          <Button
            className="col-8 col-md-4 mb-3 mb-md-5 formStyle-register__button"
            type="submit"
            aria-label="Entrar em sua conta"
            tabIndex={0}
          >
            Log In
          </Button>
          <div className="d-md-none pb-5">
            <hr />
            <span className="formStyle-sideContent__text">
              Don't have an account? {'  '}{' '}
              <Link
                aria-label="Ir para página de login"
                tabIndex={0}
                to={'./register'}
              >
                Sign up
              </Link>{' '}
            </span>
          </div>
        </Form>
      </div>
      <div className="container d-none d-md-flex py-5 formStyle-sideContent login">
        <h1>Welcome back</h1>
        <p className="formStyle-sideContent__text">
          Don't have an account?{'  '}
          <Link
            aria-label="Ir para página de login"
            tabIndex={0}
            to={'/register'}
          >
            Sign up
          </Link>
        </p>
        <img
          className="formStyle-sideContent__img img-fluid"
          src="/img/undraw_appreciation_ti90.svg"
          alt="Sign up"
        />
      </div>
    </div>
  );
};

export default Login;
