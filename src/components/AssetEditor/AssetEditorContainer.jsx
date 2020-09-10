import React from 'react'
import { compose } from 'redux';
import { connect } from 'react-redux';
import { AssetEditor } from './AssetEditor'

// планируется рефакторинг AssetEditor
const AssetEditorContainer = (props) => {
    return (
        <AssetEditor {...props} />
    )
}
export default compose(
    connect(null, null)
)(AssetEditorContainer)