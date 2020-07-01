import React from 'react';
import ListServiceComponent from './components/services/list/List';
import './App.css';

import Snackbar from '@material-ui/core/Snackbar';
import { tap } from 'rxjs/operators';

import { snackbarService } from './shared/services/snackbar.service';

const App = () => {
  const [values, setValues] = React.useState({ open: false, message: ''});

  const handleClose = (_?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setValues({...values, open: false});
  };

  React.useEffect(() => {
    snackbarService.getMessage().pipe(
      tap(message => setValues({...values, message, open: true }))
    ).subscribe();
  }, [values])

  return (
    <div className="App">
      <ListServiceComponent/>
      <Snackbar message={values.message} open={values.open} autoHideDuration={6000} onClose={handleClose}/>
    </div>
  );
}

export default App;
