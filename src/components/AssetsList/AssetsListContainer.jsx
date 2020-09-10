import React, { useState, useEffect } from 'react'
import AssetsList from './AssetsList'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { deleteEnterpriseAsset } from '../../redux/enterpriseAssetsReducer'
import { MONETARY_ASSETS_FIELDS, NON_MONETARY_ASSETS_FIELDS} from '../../config/assetsTableFields'
import {
    Typography, Box, Container
} from '@material-ui/core'
import AssetEditorControls from '../AssetEditor/AssetEditorControls/AssetEditorControls'

const AssetsListContainer = (props) => {
    const [assets, setAssets] = useState(props.assets)
    const [openEditPopup, setOpenEditPopup] = useState(false)
    const [mode, setMode] = useState('add') // режим для popup (редактирование или добавление)
    const [currentAsset, setCurrentAsset] = useState(null) // текущий актив для popup и api
    const [currentAssetsCollection] = useState(props.assetsCollection) // текущая коллекция для popup и api
    let currentConfig // список полей для таблицы

    useEffect(() => {
        setAssets(props.assets)
    })
    // открыть popup, установка текущего актива и режима заполнения формы
    const handleClickOpen = (asset, mode='add') => {
        setCurrentAsset(asset)
        setMode(mode)
        setOpenEditPopup(true)
    }
    const handleClose = () => {
        setOpenEditPopup(false)
        setCurrentAsset(null)
    }
    const handleClickDelete = (assetId) => {
        props.deleteEnterpriseAsset(assetId, props.assetsCollection)
    }
    // получение полей для отображения в таблице
    switch(props.assetsCollection) {
        case 'nonMonetaryAssets':
            currentConfig = NON_MONETARY_ASSETS_FIELDS
            break
        case 'monetaryAssets':
            currentConfig = MONETARY_ASSETS_FIELDS
            break
        default:
            currentConfig = null
    }
    if(currentConfig === null) {
        return <div>Данной коллекции не существует</div>
    }
    // методы и данные для popup и кнопки добавления
    let assetEditorControlsProps = {
        mode,
        open: openEditPopup,
        currentAssetsCollection,
        currentAsset,
        handleClickOpen,
        handleClose
    }
    if(assets) {
        return (
            <>
                <AssetsList 
                    allAssets = {assets}
                    currentFields = {currentConfig}
                    handleClickOpen = {handleClickOpen}
                    handleClickDelete = {handleClickDelete}
                />
                <AssetEditorControls 
                    {...assetEditorControlsProps}
                />
            </>
        )
    }else{
        return (
            <Container>
                <Box p={3}>
                    <Typography>Активов данного типа нет</Typography>
                </Box>
                <AssetEditorControls 
                    {...assetEditorControlsProps}
                />
            </Container>
        )
    }
   
}
let mstp = (state, props) => {
    return {
        assets: state.enterpriseAssetsReducer[props.assetsCollection]
    }
}
export default compose(
    connect(mstp, {
        deleteEnterpriseAsset
    })
)(AssetsListContainer)