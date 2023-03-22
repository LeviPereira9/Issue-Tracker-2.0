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
import { useAuthentication } from '../hooks/useAuthentication';

//Icons
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import SendForget from '../components/layout/SendForget';

//Types
import { LogIn } from '../types/autheticationTypes';
import SideContent from '../components/shared/SideContent';

const Login = () => {
  const { login, loading, errorMessage, setErrorMessage } = useAuthentication();

  const [formErrors, setFormErrors] = useState<LogIn>({});
  const [showPassword, setShowPassword] = useState(false);
  const [show, setShow] = useState(false);

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
    const loginData = {
      email: data.email!,
      password: data.password!,
      rememberMe: data.rememberMe!,
    };

    login(loginData);

    setTimeout(() => {
      setErrorMessage(' ');
    }, 3000);
  };

  return (
    <div className="container d-flex p-0 formStyle">
      <div className="w-100">
        <Form
          className="row w-100 justify-content-center m-auto m-md-0 formStyle-input login-form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h3 className="text-center pb-3">Issue Tracker 2.0</h3>
          <hr />
          <Form.Group className="mb-4 mt-4 col-10 col-md-8 form-group">
            <Form.Label>E-mail</Form.Label>
            <Form.Control
              type="email"
              placeholder="teste@teste.com"
              aria-label="Insira seu e-mail"
              tabIndex={0}
              {...register('email', {
                required: true,
                pattern:
                  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
              })}
              isInvalid={!!formErrors.email || errorMessage.includes('Usuário')}
            />
            {formErrors.email && (
              <Form.Control.Feedback type="invalid">
                This field must be filled with a valid e-mail address.
              </Form.Control.Feedback>
            )}
            {errorMessage.includes('Usuário') && (
              <Form.Control.Feedback type="invalid">
                Email not found in our records.
              </Form.Control.Feedback>
            )}
          </Form.Group>
          <Form.Group className="mb-5 col-10 col-md-8 form-group">
            <Form.Label>Password</Form.Label>
            <InputGroup>
              <Form.Control
                type={showPassword ? 'text' : 'password'}
                placeholder="Senha"
                aria-label="Insira sua senha cadastrada"
                tabIndex={0}
                {...register('password', { required: true })}
                isInvalid={
                  !!formErrors.password || errorMessage.includes('Senha')
                }
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
                id="showLoginPassword-addon"
              >
                {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
              </InputGroup.Text>
              {formErrors.password && (
                <Form.Control.Feedback type="invalid">
                  This field is required.
                </Form.Control.Feedback>
              )}
              {errorMessage.includes('Senha') && (
                <Form.Control.Feedback type="invalid">
                  Invalid password.
                </Form.Control.Feedback>
              )}
            </InputGroup>
          </Form.Group>
          <hr />
          <Form.Group
            className="mb-4 col-11 col-md-10 d-flex justify-content-between"
            controlId="logRemember"
          >
            <Form.Check
              label="Remember me"
              aria-label="Lembrar próxima sessão."
              tabIndex={0}
              {...register('rememberMe')}
            />
            <span
              className="formStyle-input__link"
              aria-label="Recuperação de senha"
              tabIndex={0}
              onClick={() => {
                setShow(true);
              }}
            >
              Forget Password
            </span>
          </Form.Group>
          <Button
            className="col-5 col-md-4 mb-3 mb-md-5 formStyle-input__button"
            type="submit"
            aria-label="Entrar em sua conta"
            tabIndex={0}
            disabled={loading}
          >
            {!loading ? (
              'Log In'
            ) : (
              <Spinner animation="border" size="sm" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            )}
          </Button>
          <div className="d-md-none pt-2 pb-5 text-center">
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
        <SendForget show={show} setShow={setShow} />
      </div>
      <SideContent
        className="py-5 login-sideContent"
        title="Welcome back"
        text="Don't have an account?"
        toRedirect="/register"
        toText="Sign up"
        label="Ir para páginade login"
        imgUrl="undraw_appreciation_ti90.svg"
      />
    </div>
  );
};

export default Login;
