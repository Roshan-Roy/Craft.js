import React, { useCallback } from "react"
import { useNode } from "@craftjs/core"
import { Typography, FormControl, FormLabel, FormControlLabel, RadioGroup, Radio, Slider, TextField, Box } from "@mui/material"
import Ind from "../indicator/Ind"

export const Heading = ({ text, variant, mt, mb, color, align }: {
    text: string;
    variant: any;
    mt: number;
    mb: number;
    color: string;
    align: any;
}) => {
    const { name, isHovered, connectors: { connect, drag } } = useNode((node) => ({
        name: node.data.name,
        isHovered: node.events.hovered
    }));

    const ref = useCallback((node: HTMLDivElement | null) => {
        if (node) {
            connect(drag(node));
        }
    }, [connect, drag]);

    return (
        <Ind name={name} hovered={isHovered} block={true}>
            <div ref={ref} style={{ visibility: "visible" }}>
                <Typography variant={variant} sx={{
                    marginTop: `${mt}px`,
                    marginBottom: `${mb}px`,
                    color,
                    visibility: "visible"
                }} align={align}>{text}</Typography>
            </div>
        </Ind>
    )
}
const HeadingSettings = () => {
    const { actions: { setProp }, text, variant, mt, mb, color, align } = useNode((node) => ({
        text: node.data.props.text,
        variant: node.data.props.variant,
        mt: node.data.props.mt,
        mb: node.data.props.mb,
        color: node.data.props.color,
        align: node.data.props.align,
    }));

    return (
        <div>
            <FormControl fullWidth={true} component="fieldset">
                <FormLabel component="legend">Text</FormLabel>
                <TextField placeholder="Text" value={text} sx={{ margin: "5px 0 10px 0" }} onChange={(e) => { setProp((props: any) => props.text = e.target.value) }} />
            </FormControl>
            <FormControl fullWidth={true} component="fieldset">
                <FormLabel component="legend">Align</FormLabel>
                <RadioGroup defaultValue={align} onChange={(e) => setProp((props: any) => props.align = e.target.value)}>
                    <FormControlLabel label="Left" value="left" control={<Radio size="small" color="primary" />} />
                    <FormControlLabel label="Right" value="right" control={<Radio size="small" color="primary" />} />
                    <FormControlLabel label="Center" value="center" control={<Radio size="small" color="primary" />} />
                </RadioGroup>
            </FormControl>
            <FormControl fullWidth={true} component="fieldset">
                <FormLabel component="legend">Variant</FormLabel>
                <RadioGroup defaultValue={variant} onChange={(e) => setProp((props: any) => props.variant = e.target.value)}>
                    <FormControlLabel label="h1" value="h1" control={<Radio size="small" color="primary" />} />
                    <FormControlLabel label="h2" value="h2" control={<Radio size="small" color="primary" />} />
                    <FormControlLabel label="h3" value="h3" control={<Radio size="small" color="primary" />} />
                    <FormControlLabel label="h4" value="h4" control={<Radio size="small" color="primary" />} />
                    <FormControlLabel label="h5" value="h5" control={<Radio size="small" color="primary" />} />
                    <FormControlLabel label="h6" value="h6" control={<Radio size="small" color="primary" />} />
                </RadioGroup>
            </FormControl>
            <FormControl component="fieldset" fullWidth={true}>
                <FormLabel component="legend">Color</FormLabel>
                <RadioGroup defaultValue={color} onChange={(e) => setProp((props: any) => props.color = e.target.value)}>
                    <FormControlLabel label="white" value="#fff" control={<Radio size="small" color="primary" />} />
                    <FormControlLabel label="black" value="#000" control={<Radio size="small" color="primary" />} />
                </RadioGroup>
            </FormControl>
            <FormControl fullWidth={true} margin="normal" component="fieldset">
                <FormLabel component="legend">Margin top</FormLabel>
                <Slider defaultValue={mt} max={80} onChange={(_, value) => setProp((props: any) => props.mt = value)} />
            </FormControl>
            <FormControl fullWidth={true} margin="normal" component="fieldset">
                <FormLabel component="legend">Margin bottom</FormLabel>
                <Slider defaultValue={mb} max={80} onChange={(_, value) => setProp((props: any) => props.mb = value)} />
            </FormControl>
        </div>
    )
}

Heading.craft = {
    related: {
        settings: HeadingSettings
    }
}