import React, { useState, useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { tap, flatMap } from 'rxjs/operators';

import { Service } from  '../../../shared/models/service.model';
import { serviceApiService } from  '../../../shared/services/api/service-api.service';
import { reloadService } from  '../../../shared/services/reload.service';

import DeleteServiceButtonComponent from '../delete/Delete';
import EditServiceComponent from '../edit/Edit';
import CreateServiceComponent from '../create/Create';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const ListServiceComponent = () => {
  const [resources,  setResources] = useState([] as Service[]);
  const classes= useStyles();

  const handleRefresh = () => reloadService.reloadData();

  useEffect(() => {
    reloadService.getNewData().pipe(
      flatMap(() => serviceApiService.list()),
      tap((services) => setResources(services))
    ).subscribe()
  }, []);

  return (
    <Grid container direction="column">
      <Grid container direction="row" justify="flex-end">
        <Grid item xs={6} sm={1}>
          <Button variant="outlined" color="primary" onClick={handleRefresh}>
            Refresh
          </Button>
        </Grid>
        <Grid item xs={6} sm={1}>
          <CreateServiceComponent/>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="right">Name</TableCell>
                <TableCell align="right">Url</TableCell>
                <TableCell align="right">Status</TableCell>
                <TableCell align="right">Created at</TableCell>
                <TableCell align="right">Delete</TableCell>
                <TableCell align="right">Edit</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {resources.map((service) => (
                <TableRow key={service.name}>
                  <TableCell component="th" scope="row">
                    {service.name}
                  </TableCell>
                  <TableCell align="right">{service.url}</TableCell>
                  <TableCell align="right">{service.status}</TableCell>
                  <TableCell align="right">{service.addTime}</TableCell>
                  <TableCell align="right"><DeleteServiceButtonComponent service={service}/></TableCell>
                  <TableCell align="right"><EditServiceComponent service={service}/></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  )
}

export default ListServiceComponent;
