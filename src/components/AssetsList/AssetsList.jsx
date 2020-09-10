import React from 'react'
import {
    Table, TableBody, TableCell, TableRow,
    TableContainer, Button, Icon
} from '@material-ui/core'
import { AssetsListHeader } from './AssetsListHeader/AssetsListHeader'

const AssetsList = (props) => {
    const { allAssets, currentFields, handleClickOpen, handleClickDelete } = props
    return (
        <TableContainer>
            <Table>
                <AssetsListHeader currentFields={currentFields} />
                <TableBody>
                    {allAssets.map(asset => {
                        return (
                            <TableRow key={asset.id}>
                                {Object.keys(currentFields).map(fieldIndex => {
                                    let field = currentFields[fieldIndex]
                                    return (
                                        <TableCell key={'cell_' + asset.id + '_' + field.id}>
                                            {asset[field.id]}
                                        </TableCell>
                                    )
                                })}
                                <TableCell key={'edit_cell_' + asset.id}>
                                    <Button onClick={() => { handleClickOpen(asset, 'edit') }}><Icon>edit</Icon></Button>
                                    <Button onClick={() => { handleClickDelete(asset.id) }}><Icon>delete</Icon></Button>
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default AssetsList