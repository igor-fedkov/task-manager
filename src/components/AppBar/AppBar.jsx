// import {ReactComponent} from 'react';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navbar, Button, Container } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import routes from '../../routes';

import { authActions, authSelectors } from '../../redux';

import s from './AppBar.module.scss';

function AppBar() {
  const dispatch = useDispatch();

  const history = useHistory();
  const userEmail = useSelector(authSelectors.getUserEmail);

  let btnCaption;
  if (userEmail) {
    btnCaption = userEmail[0].toUpperCase();
  }

  const onLogout = useCallback(() => {
    dispatch(authActions.logoutSuccess());
  }, [dispatch]);

  return (
    <>
      <Navbar className={s.appBar} bg="primary" expand="lg">
        <Container className={s.appBarContainer}>
          <Button
            onClick={() => history.push(routes.main)}
            className={s.btnGoToMainPage}
          >
            <span className="material-icons-outlined">space_dashboard</span>
            <span className={s.btnGoToMainPageCaption}>Boards</span>
          </Button>

          {userEmail &&
            <div className={s.dropdownMenuContainer}>
              <Button
                // onClick={onLogoClick}
                className={s.btnDropdownMenu}
                variant="secondary">
                {btnCaption}
              </Button>
            
              <div className={s.dropdownMenu}>
                <Button onClick={onLogout} className={s.btnLogout} variant="secondary">
                  <span className={`material-icons-outlined ${s.iconInside}`}>logout</span>
                  <span>Logout</span>
                </Button>
              </div>
            </div>
          }
        </Container>
      </Navbar>
    </>
      
  )
}

export default AppBar;