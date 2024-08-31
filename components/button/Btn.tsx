import React, { useCallback } from "react"
import { useNode } from "@craftjs/core"
import { Button, FormControl, FormLabel, RadioGroup, Radio, FormControlLabel } from "@mui/material"
import { TextField, Slider } from "@mui/material"
import Ind from "../indicator/Ind"

export const Btn = ({ size, variant, color, text, mx, my }: {
    size: any;
    variant: any;
    color: any;
    text: string;
    mx: number;
    my: number;
}) => {
    const { isHovered, name, connectors: { connect, drag } } = useNode((node) => ({
        isHovered: node.events.hovered,
        name: node.data.name
    }));

    const ref = useCallback((node: HTMLButtonElement | null) => {
        if (node) {
            connect(drag(node));
        }
    }, [connect, drag]);

    return (
        <Ind name={name} hovered={isHovered} block={false}>
            <Button ref={ref} size={size} variant={variant} color={color} sx={{ marginX: `${mx}px`, marginY: `${my}px`, visibility: "visible" }}>
                {text}
            </Button>
        </Ind>
    )
}

const ButtonSettings = () => {
    const { actions: { setProp }, props } = useNode((node) => ({
        props: node.data.props
    }));

    return (
        <div>
            <FormControl fullWidth={true} component="fieldset">
                <FormLabel component="legend">Text</FormLabel>
                <TextField placeholder="Text" value={props.text} sx={{ margin: "5px 0 10px 0" }} onChange={(e: any) => { setProp((props: any) => props.text = e.target.value) }} />
            </FormControl>
            <FormControl size="small" component="fieldset">
                <FormLabel component="legend">Size</FormLabel>
                <RadioGroup defaultValue={props.size} onChange={(e) => setProp((props: any) => props.size = e.target.value)}>
                    <FormControlLabel label="Small" value="small" control={<Radio size="small" color="primary" />} />
                    <FormControlLabel label="Medium" value="medium" control={<Radio size="small" color="primary" />} />
                    <FormControlLabel label="Large" value="large" control={<Radio size="small" color="primary" />} />
                </RadioGroup>
            </FormControl>
            <FormControl size="small" component="fieldset">
                <FormLabel component="legend">Variant</FormLabel>
                <RadioGroup defaultValue={props.variant} onChange={(e) => setProp((props: any) => props.variant = e.target.value)}>
                    <FormControlLabel label="Text" value="text" control={<Radio size="small" color="primary" />} />
                    <FormControlLabel label="Outlined" value="outlined" control={<Radio size="small" color="primary" />} />
                    <FormControlLabel label="Contained" value="contained" control={<Radio size="small" color="primary" />} />
                </RadioGroup>
            </FormControl>
            <FormControl component="fieldset">
                <FormLabel component="legend">Color</FormLabel>
                <RadioGroup defaultValue={props.color} onChange={(e) => setProp((props: any) => props.color = e.target.value)}>
                    <FormControlLabel label="Primary" value="primary" control={<Radio size="small" color="primary" />} />
                    <FormControlLabel label="Secondary" value="secondary" control={<Radio size="small" color="primary" />} />
                </RadioGroup>
            </FormControl>
            <FormControl fullWidth={true} margin="normal" component="fieldset">
                <FormLabel component="legend">Margin X</FormLabel>
                <Slider defaultValue={props.mx} max={80} onChange={(_, value) => setProp((props: any) => props.mx = value)} />
            </FormControl>
            <FormControl fullWidth={true} margin="normal" component="fieldset">
                <FormLabel component="legend">Margin Y</FormLabel>
                <Slider defaultValue={props.my} max={80} onChange={(_, value) => setProp((props: any) => props.my = value)} />
            </FormControl>
        </div>
    )
};

Btn.craft = {
    related: {
        settings: ButtonSettings
    }
}