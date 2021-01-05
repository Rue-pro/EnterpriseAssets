import firebase from '../config/fbConfig.js'

const MONETARY_ASSETS_COLLECTION = 'monetaryAssets'
const NON_MONETARY_ASSETS_COLLECTION = 'nonMonetaryAssets'

let db = firebase.firestore();

const getResult = ( resultCode = 0 , message = null, error =null, data = null) => {
    return {
        resultCode, // 1 - есть ошибки; 0 - запрос выполнен успешно
        message,
        error,
        data // данные возвращаемые с сервера
    }
}
const getDocRef = (type) => {
    switch (type) {
        case MONETARY_ASSETS_COLLECTION:
            return db.collection(MONETARY_ASSETS_COLLECTION)
        case NON_MONETARY_ASSETS_COLLECTION:
            return db.collection(NON_MONETARY_ASSETS_COLLECTION)
        default:
            return null
    }
}

export const assetsAPI = {
    getAssets(type) {
        let docRef = getDocRef(type)
        if(docRef === null) {
            Promise.resolve(getResult(
                1,
                null,
                'Ошибка при обращении к api: указанной коллекции не существует',
                null
            ))
        }
        return (
            docRef.get()
            .then (querySnapshot => {
                let message = null
                let assets = null
                if (querySnapshot.docs.length !== 0) {
                    assets = querySnapshot.docs.map((asset) => {
                        if(asset.exists) return {...asset.data(), id:asset.id}
                        return {}
                    })
                    message = `Получены все активы в коллекции «${type}»`
                } else {
                    message = `Нет активов в коллекции «${type}»`
                }
                return getResult(
                    0,
                    message,
                    null,
                    assets
                )
            })
            .catch(error => {
                return getResult(
                    1,
                    null,
                    'Ошибка при получении активов: '+error,
                    null
                )
            })
        )
    },
    addAsset(assetData, type) {
        let docRef = getDocRef(type)
        if(docRef === null) {
            Promise.resolve(getResult(
                1,
                null,
                'Ошибка при обращении к api: указанной коллекции не существует',
                null
            ))
        }
        return (
            docRef.add(assetData)
            .then(documentReference => {
                return getResult(
                    0,
                    'Актив успешно добавлен',
                    null,
                    documentReference.id
                )
            })
            .catch(error => {
                return getResult(
                    1,
                    null,
                    'Ошибка при добавлении актива: ' + error,
                    null
                )
            })
        )
    },
    updateAsset(assetId
        , assetData, type) {
        let docRef = getDocRef(type)
        if(docRef === null) {
            Promise.resolve(getResult(
                1,
                null,
                'Ошибка при обращении к api: указанной коллекции не существует',
                null
            ))
        }
        return (
            docRef.doc(assetId).set(assetData)
            .then(response => {
                return getResult(
                    0,
                    'Актив успешно обновлен',
                    null,
                    null
                )
            })
            .catch(error => {
                return getResult(
                    1,
                    null,
                    'Ошибка при обновлении актива: ' + error,
                    null
                )
            })
        )
    },
    deleteAsset(assetId, type) {
        let docRef = getDocRef(type)
        if(docRef === null) {
            Promise.resolve(getResult(
                1,
                null,
                'Ошибка при обращении к api: указанной коллекции не существует',
                null
            ))
        }
        return (
            docRef.doc(assetId).delete()
            .then(response => {
                return getResult(
                    0,
                    'Актив успешно удален',
                    null,
                    null
                )
            })
            .catch(error => {
                return getResult(
                    1,
                    null,
                    'Ошибка при удалении актива: ' + error,
                    null
                )
            })
        )
    }
}