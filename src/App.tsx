import { Provider } from 'react-redux';
import Navigation from './router/Navigation';
import store from './store/store';
import AppTheme from './theme/AppTheme';

const App = () => {
  return (
    <>
      <Provider store={store}>
        <AppTheme>
          <Navigation />
        </AppTheme>
      </Provider>
    </>
  );
};

export default App;
