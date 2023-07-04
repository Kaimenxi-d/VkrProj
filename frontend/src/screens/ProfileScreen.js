import React, {useEffect, useState} from 'react'
import { Link, redirect, useLocation, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { getUserDetails, updateUserProfile } from '../actions/userActions'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'


function ProfileScreen() {
  
    const location = useLocation()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')


    const userDetails= useSelector(state => state.userDetails)
    const {error, loading, user} = userDetails

    const userLogin= useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const { success } = userUpdateProfile

    useEffect(() =>{
        if(!userInfo){
            navigate('/login')
        }else{
            if(!user || !user.name){
                dispatch({type:USER_UPDATE_PROFILE_RESET})
                dispatch(getUserDetails('profile'))
            }else{
                setName(user.name)
                setEmail(user.email)
            }
        }
    }, [dispatch, navigate, userInfo, user])

    const submitHandler = (e) => {
        e.preventDefault()

        if(password != confirmPassword){
            setMessage('Пароли не совпадают')
        }else{
            dispatch(updateUserProfile({
                'id':user._id,
                'name': name,
                'email':email,
                'password':password,
            }))
        }
        
    }  
    
  return (
    <Row>
        <Col md={3}>
                <h2>Пользователь</h2>
                {message && <Message variant='danger'>{error}</Message>}
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader></Loader>}
        <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
                <Form.Label>Имя</Form.Label>
                <Form.Control
                    required
                    className='rounded'
                    type='name'
                    placeholder='Введите ваше имя'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                >
                    
                </Form.Control>
            </Form.Group>

            <Form.Group controlId='email'>
                <Form.Label>Почта</Form.Label>
                <Form.Control
                    required
                    className='rounded'
                    type='email'
                    placeholder='Введите почту'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                >
                    
                </Form.Control>
            </Form.Group>

            <Form.Group controlId='password'>
                <Form.Label>Пароль</Form.Label>
                <Form.Control
                    className='rounded'
                    type='password'
                    placeholder='Введите пароль'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                >
                    
                </Form.Control>
            </Form.Group>

            <Form.Group controlId='passwordConfirm'>
                <Form.Label>Потвердите пароль</Form.Label>
                <Form.Control
                    className='rounded'
                    type='password'
                    placeholder='Потвердите пароль'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                >
                    
                </Form.Control>
            </Form.Group>
            <Button className='my-3 rounded' type='submit' variant='primary'>Обновить</Button>
        </Form>
        </Col>

        <Col md={9}>
                <h2>Мои заказы</h2>
        </Col>
    </Row>
  )
}

export default ProfileScreen