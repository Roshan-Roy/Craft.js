import React, { useCallback } from "react"
import { useNode } from "@craftjs/core"
import { Grid, FormControl, FormLabel, Slider } from "@mui/material"
import { GridItem } from "./GridItem"
import { Element } from "@craftjs/core"
import { Card } from "../card/Card"
import Ind from "../indicator/Ind"

export const GridContainer = ({ padding, my }: {
    my: number;
    padding: number;
}) => {
    const { isHovered, name, connectors: { connect, drag } } = useNode((node) => ({
        isHovered: node.events.hovered,
        name: node.data.name
    }));

    const ref = useCallback((node: HTMLDivElement | null) => {
        if (node) {
            connect(drag(node));
        }
    }, [connect, drag]);

    return (
        <Ind hovered={isHovered} name={name} block={true}>
            <Grid container ref={ref} gap={2} padding={padding} my={my} bgcolor={"#f5f5f5"} visibility={"visible"}>
                <Element is={GridItem} id="one" canvas>
                    <Card background="#ddd" padding={20} my={0} />
                </Element>
                <Element is={GridItem} id="two" canvas>
                    <Card background="#ddd" padding={20} my={0} />
                </Element>
                <Element is={GridItem} id="three" canvas>
                    <Card background="#ddd" padding={20} my={0} />
                </Element>
            </Grid>
        </Ind>
    )
}

export const GridContainerSettings = () => {
    const { actions: { setProp }, padding, my } = useNode(node => ({
        padding: node.data.props.padding,
        my: node.data.props.my
    }));
    return (
        <div>
            <FormControl fullWidth={true} margin="normal" component="fieldset">
                <FormLabel component="legend">Padding</FormLabel>
                <Slider max={10} defaultValue={padding} onChange={(_, value) => setProp((props: any) => props.padding = value)} />
            </FormControl>
            <FormControl fullWidth={true} margin="normal" component="fieldset">
                <FormLabel component="legend">Margin Y</FormLabel>
                <Slider max={10} defaultValue={my} onChange={(_, value) => setProp((props: any) => props.my = value)} />
            </FormControl>
        </div>
    )
}
GridContainer.craft = {
    related: {
        settings: GridContainerSettings
    }
}