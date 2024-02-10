import React from 'react'
import { Box, Typography } from '@mui/material'

const Disclaimer = () => {
    return (
        <div> <Box style={{ 'backgroundColor': '#dedede', 'borderRadius': '10px', 'paddingBottom': '10px', 'paddingTop': '10px' }}
            sx={{ ml: { xs: '25px', md: '400px', lg: '400px' }, mt: { xs: '10px', md: '50px', lg: '80px' }, width: { xs: '350px', md: '375px', lg: '500px' }, height: { xs: '300px', md: '200px', lg: '200px' } }}>

            <Typography style={{ 'color': 'black', 'fontSize': '15px', 'fontWeight': '300', margin: '10px' }}>The data collected will be used for research purposes only and will be kept confidential. The data will be used to study the effects of language on the brain and the human body. By clicking on the "I agree" button, you agree to the terms and conditions of this data collection platform.</Typography>
        </Box></div>
    )
}

export default Disclaimer