//React
import { useState, useEffect } from 'react';

//Bootstrap
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

//useForm hook
import { useForm } from 'react-hook-form';

//Hooks
import { useAuthentication } from '../../hooks/useAuthentication';

//Firebase
import { sendPasswordResetEmail } from 'firebase/auth';
import { Spinner } from 'react-bootstrap';

//Types
type RecoverPassword = {
  email?: string;
};

const SendForget = ({
  show,
  setShow,
}: {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { auth } = useAuthentication();

  const [formErrors, setFormErrors] = useState<RecoverPassword>({});
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    setFormErrors(errors as RecoverPassword);
  }, [errors]);

  const handleResetPassword = async (data: RecoverPassword) => {
    setErrorMessage('');
    setLoading(true);

    try {
      await sendPasswordResetEmail(auth, data.email!);
      setLoading(false);
    } catch (error) {
      setErrorMessage('Email not found in our records.');
      setLoading(false);

      setTimeout(() => {
        setErrorMessage('');
      }, 3000);
    }
  };

  return (
    <>
      <Modal
        show={show}
        onHide={() => {
          setShow(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>E-mail de recuperação</Modal.Title>
        </Modal.Header>
        <Form
          className="formStyle-input p-0"
          onSubmit={handleSubmit(handleResetPassword)}
        >
          <Modal.Body>
            <Form.Label>E-mail</Form.Label>
            <Form.Control
              className="mb-2"
              type="e-mail"
              placeholder="name@example.com"
              aria-label="Insira seu e-mail de recuperação de senha"
              tabIndex={0}
              {...register('email', {
                required: true,
                pattern:
                  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
              })}
              isInvalid={!!formErrors.email || errorMessage.includes('Email')}
            />
            {formErrors.email && (
              <Form.Control.Feedback type="invalid">
                This field must be filled with a valid email address
              </Form.Control.Feedback>
            )}
            {errorMessage && (
              <Form.Control.Feedback type="invalid">
                {errorMessage}
              </Form.Control.Feedback>
            )}
            <Form.Text>
              Enter the email address associated with your account. If an
              account with that email address exists in our database, you will
              receive an email with instructions on how to reset your password.
            </Form.Text>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="none"
              aria-label="Fechar esqueci minha senha"
              tabIndex={0}
              onClick={() => {
                setShow(false);
              }}
            >
              Close
            </Button>
            <Button
              type="submit"
              className="formStyle-input__button"
              aria-label="Enviar e-mail de recuperação"
              tabIndex={0}
              disabled={loading}
            >
              {!loading ? (
              'Send'
            ) : (
              <Spinner animation="border" size="sm" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            )}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default SendForget;
