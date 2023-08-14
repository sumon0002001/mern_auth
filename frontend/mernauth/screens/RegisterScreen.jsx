import React, {useState, useEffect} from 'react';
import {Link, useNavigate } from 'react-router-dom';
import {Form, Button, Row, Col} from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import {useDispatch, useSelector} from 'react-redux';
import {useRegisterMutation} from '../src/slices/userApiSlice';
import {setCredentials} from '../src/slices/authSlice';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';

const RegisterScreen = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [register, {isLoading} ] = useRegisterMutation()
    const {userInfo} = useSelector((state) => state.auth)

     useEffect(() => {
      if (userInfo) {
        navigate('/')
      }
     
    }, [navigate, userInfo])

    const handleSubmit = async (e) => {
      e.preventDefault();

      if (password !== confirmPassword) {
        toast.error('Passwords do not match');
      } else {
        try {
          const res = await register({ name, email, password }).unwrap();
          dispatch(setCredentials({ ...res }));
          navigate('/');
        } catch (err) {
          toast.error(err?.data?.message || err.error);
        }
      }
   
  }

    return (
       <FormContainer>
           <h1>Registration</h1>
           <Form onSubmit={handleSubmit}>
           <Form.Group className="my-2" controlId='email'>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type= 'text'
                  placeholder='Enter name'
                  value ={name}
                  onChange={(e) => setName(e.target.value)}
                  ></Form.Control>
                </Form.Group>
               <Form.Group className="my-2" controlId='email'>
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type= 'email'
                  placeholder='Enter email'
                  value ={email}
                  onChange={(e) => setEmail(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Form.Group className="my-2" controlId='password'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type= 'password'
                  placeholder='Enter password'
                  value ={password}
                  onChange={(e) => setPassword(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Form.Group className="my-2" controlId='confirmPassword'>
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type= 'confirmPassword'
                  placeholder='Enter confirmPassword'
                  value ={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                {isLoading && <Loader/>}
                <Button
                //    disabled={isLoading}
                   type= 'submit'
                   variant ='primary'
                   className='mt-3'
                   >
                    Register
                </Button>

           </Form>
           <Row className='py-3'>
               <Col>
                 Already Have an Account?<Link to='/login'>Login</Link>
               </Col>

           </Row>
       </FormContainer>
    )
}

export default RegisterScreen;
