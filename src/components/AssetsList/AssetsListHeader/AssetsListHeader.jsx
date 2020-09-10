import React from 'react'
import { TableHead, TableRow, TableCell } from '@material-ui/core';

export const AssetsListHeader = (props) => {
    let { currentFields } = props
    return (
        <TableHead>
            <TableRow>
                {Object.keys(currentFields).map(fieldHeader => {
                    let field = currentFields[fieldHeader]
                    return (
                        <TableCell key={field.id}>
                            {field.label}
                        </TableCell>
                    )
                })}
                <TableCell key='edit'>
                </TableCell>
            </TableRow>
        </TableHead>
    )
}