import { Typography, Toolbar } from "@material-ui/core";

export default function FooterBar() {
    return (
        <Toolbar>
            <Typography variant="caption" display="block">
                &copy; 2021 by <a href="mailto:samarasilvacandy@gmail.com">Samara Silva</a>
            </Typography>
        </Toolbar> 
    )
}