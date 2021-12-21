import { Box, Button, Paper } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { ICity, IStudent } from 'models';
import React, { useState } from 'react';
import { capitalizeFirstString, getMarkColor } from 'utils';


const useStyles = makeStyles((theme) => ({
  table: {},
  edit: {
    marginRight: theme.spacing(1),
  },
}));

interface StudentTableProps {
  studentList: IStudent[];
  cityMap: {
    [key: string]: ICity;
  };
  onEdit?: (student: IStudent) => void;
  onRemove?: (student: IStudent) => void;
}

export default function StudentTable({
  studentList,
  cityMap,
  onEdit,
  onRemove,
}: StudentTableProps) {
  const classes = useStyles();

  const [open, setOpen] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState<IStudent>()


  const hanldeClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleRemoveClick = (student: IStudent) => {
    setSelectedStudent(student)
    hanldeClickOpen()
  }

  const hanldeRemoveConfirm = (student: IStudent) => {
    onRemove?.(student)
    setOpen(false)
  }

  return (
    <>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Mark</TableCell>
              <TableCell>City</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {studentList.map((student, i) => (
              <TableRow key={student.id}>
                <TableCell width={310}>{student.id}</TableCell>
                <TableCell>{student.name}</TableCell>
                <TableCell>{capitalizeFirstString(student.gender)}</TableCell>
                <TableCell>
                  <Box color={getMarkColor(student.mark)} fontWeight="bold">
                    {student.mark}
                  </Box>
                </TableCell>
                <TableCell>{cityMap[student.city]?.name || '---'}</TableCell>
                <TableCell align="right">
                  <Button className={classes.edit} color="primary" onClick={() => onEdit?.(student)}>
                    Eidt
                  </Button>
                  <Button color="secondary" onClick={() => handleRemoveClick(student)}>
                    Remove
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Remove a student?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure to remove student name "{selectedStudent?.name}".
            <br />
            This action can'nt be undo.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" variant='outlined'>
            Cancel
          </Button>
          <Button onClick={() => hanldeRemoveConfirm(selectedStudent as IStudent)} color="secondary" variant='contained' autoFocus >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
