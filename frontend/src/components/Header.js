import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navbar, Nav, Container, Row, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import SearchBox from './SearchBox'
import { logout } from '../actions/userActions'

function Header() {

  const userLogin = useSelector(state => state.userLogin)
  const {userInfo} = userLogin

  const dispatch = useDispatch()

  const logoutHandler = () => {
      dispatch(logout())
  }

  return (
    <header>
        <Navbar bg="light" expand="lg" collapseOnSelect>
      <Container>
        <LinkContainer to='/'>
          <Navbar.Brand>Readmore</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <SearchBox/>
          <Nav className="mr-auto">
            <LinkContainer to="/catalog">
            <Nav.Link><i className='fas fa-bars'></i> Каталог</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/cart">
            <Nav.Link><i className='fas fa-cart-shopping'></i> Корзина</Nav.Link>
            </LinkContainer>

            {userInfo ? (
              <NavDropdown title={userInfo.name} id='username'>
                  <LinkContainer to="/profile">
                      <NavDropdown.Item>Профиль</NavDropdown.Item>
                  </LinkContainer>
                      <NavDropdown.Item onClick={logoutHandler}>Выйти</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <LinkContainer to="/login">
                  <Nav.Link><i className='fas fa-user'></i> Войти</Nav.Link>
              </LinkContainer>
            )}
            <LinkContainer to="/liter">
            <Nav.Link><i className='fas fa-book'></i> Чеченская литература</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>

      </Container>
    </Navbar>
    </header>
  )
}

export default Header