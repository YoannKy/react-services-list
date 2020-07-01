import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import { tap } from 'rxjs/operators';

import { Service, serviceStatus } from  '../../../shared/models/service.model';
import { serviceApiService } from  '../../../shared/services/api/service-api.service';
import { reloadService } from  '../../../shared/services/reload.service';

const EditServiceComponent: React.FC< { service: Service }> = (props) => {
  const [values, setValues] = React.useState({
    open: false,
    status: '',
  });

  const handleClickOpen = () => {
    setValues({...values, open: true });
  };

  const handleClose = () => {
    setValues({...values, open: false });

  };

  const submit = () => {
    serviceApiService.put({
        name: props.service.name,
        status: values.status as serviceStatus || props.service.status
      }).pipe(
      tap(() => setValues({...values, open: false })),
      tap(() => reloadService.reloadData())
    ).subscribe();
  }

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Edit
      </Button>
      <Dialog open={values.open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">  Edit service {props.service.name}</DialogTitle>
        <DialogContent>
          <Select
           labelId="demo-simple-select-label"
           id="demo-simple-select"
           defaultValue={props.service.status}
           onChange={({ target: { value: status } }: any) => setValues({ ...values, status })}
          >
           <MenuItem value={serviceStatus.fail}>{serviceStatus.fail}</MenuItem>
           <MenuItem value={serviceStatus.ok}>{serviceStatus.ok}</MenuItem>
           <MenuItem value={serviceStatus.unknown}>{serviceStatus.unknown}</MenuItem>
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={submit} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default EditServiceComponent;
