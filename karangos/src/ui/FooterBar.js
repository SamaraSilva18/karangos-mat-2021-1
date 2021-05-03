import { Typography, Toolbar } from "@material-ui/core";
import LocalCafeTwoToneIcon from '@material-ui/icons/LocalCafeTwoTone';
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles((theme) => ({
    toolbar: {
      backgroundColor: theme.palette.background.paper,
      minHeight: '42px',
      width: '100%',
      // Posicionamento do footer na parte inferior da pagina
      position: 'fixed',
      bottom: 0
    },
    text: {
      width: '100%'
    },
    link: {
      color: theme.palette.secondary.light,
      textDecoration: 'none', // Tira o sublinhado do link
      '&:hover': { // Mouse sobre o link
        textDecoration: 'underline' // Retorna o sublinhado
      }
    }
  }));
    
export default function FooterBar() {
    const classes = useStyles();
    return (
        <Toolbar className={classes.toolbar}>
            <Typography className={classes.text} variant="caption" display="block" align="center" color="textSecondary">
                Produzido com <LocalCafeTwoToneIcon fontSize="small"/> 
                por <a className={classes.link} href="mailto:samarasilvacandy@gmail.com">Samara Silva</a>
            </Typography>
        </Toolbar> 
    )
}