import React, {useEffect} from 'react'
import { Link, useParams, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card, ListGroupItem } from 'react-bootstrap'
import Message from '../components/Message'
import { addToCart, removeFromCart } from '../actions/cartActions'

function CartScreen({ mathch, history }) {
  const location = useLocation();
  const { id } = useParams(); 
  const navigate = useNavigate() 

  const productId = id
  const qty = location.search ? Number(location.search.split('=')[1]) : 1

  const dispatch = useDispatch()

  const cart = useSelector(state => state.cart)
  const {cartItems} = cart


  useEffect(() =>{
    if(productId){
        dispatch(addToCart(productId, qty))
        }
    }, [dispatch,productId]
  )
  
  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
  }

  const checkoutHandler = () =>{
    navigate('/shipping')
  }

  return (
    <Row>
        <Col md={8}>
            <h1>Корзина</h1>
            {cartItems.length === 0 ? (
                <Message variant='info'>
                    Корзина пуста <Link onClick={() => navigate(-1)} className='btn btn-dark my-3'>Назад</Link>
                </Message>
            ) : (
                <ListGroup variant='flush'>
                    {cartItems.map(item =>(
                        <ListGroup.Item key={item.product}>
                            <Row>
                                <Col md={1}>
                                    <Image src={item.image} alt={item.name} fluid rounded/>
                                </Col>

                                <Col md={3}>
                                    <Link className='text-decoration-none' to={`/product/${item.product}`}>{item.name}</Link>
                                </Col>

                                <Col className='font-weight-bold' md={2}>
                                ₽{item.price}
                                </Col>
                                <Col md={2}>
                                <Form.Control
                                    className='rounded'
                                    as="select"
                                    value={item.qty}
                                    onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}
                                >
                                    {[...Array(item.countStock).keys()].map(
                                    (x) => (
                                        <option key={x + 1} value={x + 1}>
                                            {x + 1}
                                        </option>
                                    )
                                    )}
                          </Form.Control>
                                </Col >
                                <Col md={1}>
                                    <Button
                                        type='button'
                                        variant='dark rounded'
                                        onClick={() => removeFromCartHandler(item.product)}
                                    >
                                        <i className='fas fa-trash'></i>
                                    </Button>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            )}
        </Col>

        <Col md={4}>
           <Card>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                    <h2>Всего к оплате ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) </h2>
                    ₽{cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
                    </ListGroup.Item>
                </ListGroup>
                
                <ListGroup.Item>
                    <Button
                        type='button'
                        className='btn-block '
                        disabled={cartItems.length === 0}
                        onClick={checkoutHandler}
                    >
                        Перейти к оплате
                    </Button>
                </ListGroup.Item>


           </Card>
        </Col>
    </Row>
  )
}

export default CartScreen