import React from 'react'
import { TextField, MenuItem } from '@material-ui/core';
import { useField } from 'formik';

export const FormikField = ({ fieldType, selectors, prefix, ...props }) => {
    const [field, meta] = useField(props)
    let helperText = null
    let error = false
    if (meta.touched && meta.error) {
        helperText = meta.error
        error = true
    }
    switch (fieldType) {
        case 'selector':
            return (
                <TextField
                    select
                    helperText={helperText}
                    error={error}
                    {...field}
                    {...props}
                    margin='dense'
                >
                    {selectors.map(option => {
                        return <MenuItem key={prefix + '_' + option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    })}
                </TextField>
            )
        default:
            return (
                <TextField
                    helperText={helperText}
                    error={error}
                    {...field}
                    {...props}
                    margin='dense'
                />
            )
    }
}             