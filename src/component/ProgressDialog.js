import React from 'react';
import { Dialog, CircularProgress } from '@material-ui/core';


const ProgressDialog = ({ open = false, text }) => (
    <Dialog open={open} fullWidth={true} maxWidth='sm'>
        <div style={{ alignItems: 'center', margin:'auto',padding:36 }}>
            <CircularProgress style={{width:64,height:64}}/>
            {text && <p>{text}</p>}
        </div>
    </Dialog>
);

export default ProgressDialog;