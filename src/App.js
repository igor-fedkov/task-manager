import { Suspense, lazy } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Switch } from 'react-router-dom';
import { CSSTransition } from "react-transition-group";

import { authSelectors, globalSelectors} from './redux';

import routes from './routes';
import { PrivatRoute, PublicRoute } from './components/Routes';

import { AppBar, Notification, LoaderSpinner } from './components';
// import { LoginPage, MainPage, BoardPage } from './pages';

import './App.scss';
import scaleTransitions from './scss/transitions/scale.module.scss';

const LoginPage = lazy(() => import('./pages/LoginPage'));
const MainPage = lazy(() => import('./pages/MainPage'));
const BoardPage = lazy(() => import('./pages/BoardPage'));


// import slideTransitions from './scss/transitions/slide.module.scss';

function App() {
  const userId = useSelector(authSelectors.getUserId);
  const notification = useSelector(globalSelectors.getNotificationText);

  return (
    <>
      <AppBar />
      
      <CSSTransition
        in={!!notification}
        appear={true}
        classNames={scaleTransitions}
        timeout={200}
        unmountOnExit
      >					
        <Notification />
      </CSSTransition>

      <Suspense fallback={<LoaderSpinner/>}>
        <Switch>
          <PublicRoute
            path={routes.login} 
            isAuthenticated={userId}
            redirectTo={routes.main}
          >
            <LoginPage />
          </PublicRoute>

          <PrivatRoute
            path={routes.main} exact
            isAuthenticated={userId}
            redirectTo={routes.login}
          >
            <MainPage />
          </PrivatRoute>

          {/* <Route path={routes.main} exact>
            <MainPage />
          </Route> */}

          <PrivatRoute
            path={routes.cardsList}
            isAuthenticated={userId}
            redirectTo={routes.login}
          >
            <BoardPage />
          </PrivatRoute>

          <Redirect to={routes.main} />
        </Switch>
      </Suspense>
    </>
  );
}

export default App;
