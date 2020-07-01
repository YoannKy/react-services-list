import React from 'react';

import Button from '@material-ui/core/Button';
import { tap } from 'rxjs/operators';

import { Service } from  '../../../shared/models/service.model';
import { serviceApiService } from  '../../../shared/services/api/service-api.service';
import { reloadService } from  '../../../shared/services/reload.service';

const DeleteServiceButtonComponent: React.FC<{ service: Service}> = props => {
  const onDelete = () => serviceApiService.delete(props.service.name)
  .pipe(tap(() => reloadService.reloadData()))
  .subscribe();

  return (
    <Button onClick={() => onDelete()} variant="contained" color="primary">
      Delete
    </Button>
  )
}

export default DeleteServiceButtonComponent;
