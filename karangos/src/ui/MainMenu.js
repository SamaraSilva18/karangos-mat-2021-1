import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
    menuButton: {
      marginRight: theme.spacing(2),
    },
    menuLink: {
      color: theme.palette.text.primary,
      textDecoration: 'none' // Tirando o sublinhado
    }
  }));
  

export default function MainMenu() {
  const classes = useStyles()

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>

      <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
            <MenuIcon />
      </IconButton>

      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
          <Link to="/list" className={classes.menuLink}>Listar Karangos</Link>
          </MenuItem>
        
        <MenuItem onClick={handleClose}>
          <Link to="/new" className={classes.menuLink}>Cadastrar Novo Karango</Link>
          </MenuItem>
        
        <MenuItem onClick={handleClose}>
          <Link to="/listc" className={classes.menuLink}>Listar Clientes</Link>
          </MenuItem>
      </Menu>
    </div>
  );
}