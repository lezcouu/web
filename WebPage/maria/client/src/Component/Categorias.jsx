import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import { connect } from 'react-redux'


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

function Categorias(props) {
  const classes = useStyles();
  return (
    <List className={classes.root}>
      {props.categorias.categorias.map((value) => {
        const labelId = `checkbox-list-label-${value.name}`
        return (
          <ListItem key={value} dense button onClick={e => props.handleToggle(e, value)}>
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={props.checked.indexOf(value.id) !== -1}
                disableRipple
                inputProps={{ 'aria-labelledby': labelId }}
              />
            </ListItemIcon>
            <ListItemText id={labelId} primary={`${value.name}`} />
            <ListItemSecondaryAction>
            </ListItemSecondaryAction>
          </ListItem>
        );
      })}
    </List>
  );
}

const mapStateToProps = ({ categorias }) => ({
  categorias
})


export default connect(mapStateToProps, null)(Categorias)