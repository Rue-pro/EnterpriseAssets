import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AssetsListContainer from '../AssetsList/AssetsListContainer'
import {
    Typography, Tabs, Tab, Box, Container
} from '@material-ui/core'

function TabPanel(props) {
    const { children, value, index, classes, ...rest } = props

    return (
        <div
            role='tabpanel'
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...rest}
        >
            {value === index && (
                <Container>
                    <Box p={3}>
                        <Typography component={'span'}>{children}</Typography>
                    </Box>
                </Container>
            )}
        </div>
    )
}

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    }
}

export default function Assets() {
    const classes = useStyles()
    const [value, setValue] = useState(0)

    const handleChange = (event, newValue) => {
        setValue(newValue)
    }

    return (
        <div className={classes.root}>
            <Tabs
                orientation='vertical'
                variant='scrollable'
                value={value}
                onChange={handleChange}
                aria-label='Vertical tabs assets'
                className={classes.tabs}
                classes={{indicator: classes.indicator}}
            >
                <Tab label='Денежные' {...a11yProps(1)} />
                <Tab label='Неденежные' {...a11yProps(0)} />
            </Tabs>
            <TabPanel value={value} index={0} style = {{maxWidth: 'calc(100% - 200px)'}}>
                <AssetsListContainer assetsCollection='monetaryAssets'/>
            </TabPanel>
            <TabPanel value={value} index={1} style = {{maxWidth: 'calc(100% - 200px)'}}>
                <AssetsListContainer assetsCollection='nonMonetaryAssets'/>
            </TabPanel>
        </div>
    )
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        height: 'calc(100vh - 69.900px)',
    },
    tabs: {
        minWidth: 200,
        borderRight: `1px solid ${theme.palette.divider}`,
    },
    indicator: {
        backgroundColor: `${theme.palette.primary.light}`,
    }
}))