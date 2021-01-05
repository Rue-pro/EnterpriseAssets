import React from 'react'
import {
  Dialog, Slide, Container
} from '@material-ui/core'
import { FormikField } from '../../common/formFields'
import { AssetEditorHeader } from './AssetEditorHeader'
import { Formik, Form } from 'formik'
import { assetFieldValidation } from '../../config/formFieldsValidation'

export const AssetEditor = (props) => {
  const { currentConfig } = props
  let { asset } = props
  let prefix = ''
  const headerData = {
    headerName: (asset && asset.name !== '') ? (asset.name ? 'Актив ' + asset.name : 'Актив ' + asset.id) : 'Создание нового актива',
    handleClose: props.handleClose
  }
  if (currentConfig === null) {
    return <div>Данной коллекции не существует</div>
  } else if ((currentConfig !== null) && (!asset)) {
    // делаем пустые поля в объекте или начальное значение в валюте (ругается material-ui)
    let emptyAsset = {}
    let currentConfigKeys = Object.keys(currentConfig)
    prefix = currentConfigKeys.indexOf( 'units' ) == -1 ? 'money': 'nonmoney'
    for (let i = 0; i < currentConfigKeys.length; i++) {
      let fieldIndex = currentConfigKeys[i]
      if (fieldIndex === 'currency') {
        emptyAsset[fieldIndex] = 'RUB'
      } else {
        emptyAsset[fieldIndex] = ''
      }
    }
    asset = emptyAsset
  }
  let mergedFields = [] // поля, которые уже не нужно выводить
  return (
    <>
      <Dialog fullScreen open={props.open} onClose={props.handleClose} TransitionComponent={Transition}>
        <Formik
          initialValues={{
            ...asset
          }}
          onSubmit={(values) => {
            switch (props.mode) {
              case 'edit':
                props.updateEnterpriseAsset(values.id, values, props.currentAssetsCollection)
                props.handleClose()
                break
              default:
                props.addEnterpriseAsset(values, props.currentAssetsCollection)
                props.handleClose()
            }
          }}
          validate={values => assetFieldValidation(values)}
        >
          <Form>
            <AssetEditorHeader {...headerData} />
            <Container maxWidth='lg'>
              {Object.keys(currentConfig).map((fieldIndex, i) => {
                let field = currentConfig[fieldIndex]
                if (mergedFields.indexOf(field.id) === -1) {
                  let fullWidth = true
                  let addedFields
                  if (field.merge) {
                    fullWidth = false
                    addedFields = field.merge.map(el => { // выводим все поля, которые должны быть рядом
                      mergedFields.push(el)
                      return <FormikField
                        key={prefix + '_' + currentConfig[el].fieldType + '_' + el + '_' + i}
                        fieldType={currentConfig[el].fieldType}
                        name={el}
                        type='text'
                        label={currentConfig[el].label}
                        autoComplete='off'
                        fullWidth={false}
                        selectors={currentConfig[el].selectors}
                        prefix={prefix}
                      />
                    })
                  }
                  return <>
                    <FormikField
                      key={prefix + '_' + field.fieldType + '_' + field.id + '_'+ i}
                      fieldType={field.fieldType}
                      name={field.id}
                      type='text'
                      label={field.label}
                      autoComplete='off'
                      fullWidth={fullWidth}
                      selectors={field.selectors}
                      prefix={prefix}
                    />
                    {addedFields && addedFields}
                  </>
                }
                return <></>
              })
              }
            </Container>
          </Form>
        </Formik>
      </Dialog>
    </>
  )
}

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />
})