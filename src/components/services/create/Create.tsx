import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { tap } from 'rxjs/operators';

import { serviceApiService } from  '../../../shared/services/api/service-api.service';
import { reloadService } from  '../../../shared/services/reload.service';

const isValidUrlRegex = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;

const CreateServiceComponent = () => {
  const [values, setValues] = React.useState({
    open: false,
    name: '',
    url: '',
  });

  const handleClickOpen = () => {
    setValues({...values, open: true });
  };

  const handleClose = () => {
    setValues({...values, open: false });

  };

  const submit = () => {
    serviceApiService.post({ name: values.name,
        url: values.url
      }).pipe(
      tap(() => setValues({...values, open: false })),
      tap(() => reloadService.reloadData())
    ).subscribe();
  }

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Create
      </Button>
      <Dialog open={values.open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Create service</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            onChange={({ target: { value: name } }) => setValues({ ...values, name })}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="url"
            label="Url"
            type="text"
            onChange={({ target: { value: url } }) => setValues({ ...values, url })}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={submit} disabled={!values.name || !isValidUrlRegex.test(values.url) } color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default CreateServiceComponent;
