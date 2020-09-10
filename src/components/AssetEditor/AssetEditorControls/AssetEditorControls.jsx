import React from 'react'
import AssetEditorContainer from '../AssetEditorContainer'
import { compose } from 'redux'
import { connect } from 'react-redux'
import {
    Icon, Fab
} from '@material-ui/core'
import { addEnterpriseAsset, updateEnterpriseAsset } from '../../../redux/enterpriseAssetsReducer'
import { MONETARY_ASSETS_FIELDS, NON_MONETARY_ASSETS_FIELDS } from '../../../config/assetsTableFields'

const AssetEditorControls = (props) => {
    const { open, mode, currentAsset, handleClose, updateEnterpriseAsset, addEnterpriseAsset, handleClickOpen, currentAssetsCollection } = props
    let currentConfig
    switch (currentAssetsCollection) {
        case 'nonMonetaryAssets':
            currentConfig = NON_MONETARY_ASSETS_FIELDS
            break
        case 'monetaryAssets':
            currentConfig = MONETARY_ASSETS_FIELDS
            break
        default:
            currentConfig = null
    }
    if (open) {
        return (
            <>
                <AssetEditorContainer
                    open={open}
                    mode={mode}
                    asset={currentAsset}
                    currentConfig={currentConfig}
                    currentAssetsCollection={currentAssetsCollection}
                    handleClose={handleClose}
                    updateEnterpriseAsset={updateEnterpriseAsset}
                    addEnterpriseAsset={addEnterpriseAsset} />
                <AddNewAssetBtn handleClickOpen={handleClickOpen} />
            </>
        )
    } else {
        return (
            <AddNewAssetBtn handleClickOpen={handleClickOpen} />
        )
    }
}
const AddNewAssetBtn = (props) => {
    const { handleClickOpen } = props
    return (
        <Fab style={{ position: 'fixed', right: '2%', bottom: '4%' }} color="primary" aria-label="add" onClick={() => { handleClickOpen(null, 'add') }}>
            <Icon>add</Icon>
        </Fab>
    )
}

export default compose(
    connect(null, {
        addEnterpriseAsset,
        updateEnterpriseAsset
    })
)(AssetEditorControls)