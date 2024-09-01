"use client"

import React from 'react'
import { Typography, Paper, Grid, Box } from '@mui/material'
import { Toolbox } from './Toolbox'
import { SettingsPanel } from './SettingsPanel'
import { Container } from './container/Container'
import { MainContainer } from './maincontainer/MainContainer'
import { Btn } from './button/Btn'
import { Card } from './card/Card'
import { CardTop } from './card/CardTop'
import { CardBottom } from './card/CardBottom'
import { Text } from '@/components/text/Text'
import { Editor, Frame, Element } from "@craftjs/core"
import { Heading } from './text/Heading'
import { Layers } from "@craftjs/layers"
import { Topbar } from './Topbar'
import { GridContainer } from './gridcontainer/GridContainer'
import { GridItem } from './gridcontainer/GridItem'

const Main = () => {
    return (
        <Editor resolver={{ MainContainer, Card, Btn, Text, Heading, Container, CardTop, CardBottom, GridContainer, GridItem }} indicator={{ success: "blue" }}>
            <Topbar />
            <Grid container spacing={2}>
                <Grid item xs={2}>
                    <Paper>
                        <Toolbox />
                    </Paper>
                </Grid>
                <Grid item xs>
                    <Frame>
                        <Element is={MainContainer} px={20} py={20} background="#fff" canvas>
                            <Heading text="Welcome" variant="h4" mb={0} mt={0} color="#000" align="left" />
                        </Element>
                    </Frame>
                </Grid>
                <Grid item xs={2}>
                    <Paper>
                        <SettingsPanel />
                        <Layers />
                    </Paper>
                </Grid>
            </Grid>
        </Editor>
    )
}

export default Main
