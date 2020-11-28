import React from 'react'
import { TextField } from '@material-ui/core'

function Input({ label, type, name, value, onChange }) {
    return (
        <TextField id="outlined-basic"
            name={name}
            label={label}
            variant="outlined"
            fullWidth
            size="small"
            type={type}
            defaultValue={value}
            onChange={(e) => onChange(e)}
        />
    )
}

export default Input
