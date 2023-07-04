import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button, Card, Form, ListGroupItem  } from 'react-bootstrap'
import Rating from '../components/Rating'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listProductDetails } from '../actions/productActions'


function ProductScreen({ match }) {
    const [qty, setQty] = useState(0)

    const { id } = useParams();
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const productDetails = useSelector((state) => state.productDetails)
    const { loading, error, product} = productDetails

    useEffect(() => {
        dispatch(listProductDetails(id));
      }, [dispatch, match]);
    

    const addToCartHandler = () => {
        navigate(`/cart/${id}?qty=${qty}`);
      }

  return (
    <div>
        <Link onClick={() => navigate(-1)} className='btn btn-light my-3'>Назад</Link>
            {loading ?
                <Loader/>
                : error
                ? <Message variant='danger'>{error}</Message>
                :(
                    <Row>
            <Col md={3}>
                <Image src={product.image} alt={product.name} fluid/>
            </Col>


            <Col md={6}>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h3>{product.name}</h3>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <Rating value={product.rating} text={` ${product.numReviews}`} color='#f8e825'/>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        Описание: {product.description}
                    </ListGroup.Item>
                </ListGroup>
            </Col>


            <Col md={3}>
                <Card>
                <ListGroup >
                    <ListGroup.Item>
                        <Row>
                            <Col>Цена:</Col>
                            <Col>
                                <strong>₽{product.price}</strong>
                            </Col>
                        </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <Row>
                            <Col>Статус:</Col>
                            <Col>
                                {product.countStock > 0 ? 'В наличии' : 'Нет в наличии'}
                            </Col>
                        </Row>
                    </ListGroup.Item>
                    
                    {product.countStock > 0 && (
                    <ListGroupItem>
                      <Row>
                        <Col>Кол-во</Col>
                        <Col>
                          <Form.Control
                            as="select"
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {[...Array(product.countStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroupItem>
                  )}

                    <ListGroup.Item>
                        <Button onClick={addToCartHandler} className='btn-block' disabled={product.countStock === 0 } type='button'>Добавить в корзину</Button>
                    </ListGroup.Item>
                </ListGroup>
                </Card>
            </Col>
        </Row>
                )
            }

        
    </div>
  )
}

export default ProductScreen