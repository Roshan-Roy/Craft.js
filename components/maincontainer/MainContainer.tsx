import { useNode } from "@craftjs/core"
import { FormControlLabel, FormControl, FormLabel, RadioGroup, Radio, Slider } from "@mui/material"

export const MainContainer = ({ background, px, py, children }: {
    background: string;
    px: number;
    py: number;
    children: React.ReactNode;
}) => {
    const { connectors: { connect } } = useNode();

    return (
        <div ref={connect as React.Ref<HTMLDivElement>} style={{ background, padding: `${py}px ${px}px`, border: "1px solid #ccc", visibility: "visible" }}>
            {children}
        </div>
    )
}

export const MainContainerSettings = () => {
    const { actions: { setProp }, background, px, py } = useNode(node => ({
        background: node.data.props.background,
        px: node.data.props.px,
        py: node.data.props.py
    }));
    return (
        <div>
            <FormControl component="fieldset">
                <FormLabel component="legend">Theme</FormLabel>
                <RadioGroup defaultValue={background} onChange={(e) => setProp((props: any) => props.background = e.target.value)}>
                    <FormControlLabel label="light" value="#fff" control={<Radio size="small" color="primary" />} />
                    <FormControlLabel label="dark" value="#444" control={<Radio size="small" color="primary" />} />
                </RadioGroup>
            </FormControl>
            <FormControl fullWidth={true} margin="normal" component="fieldset">
                <FormLabel component="legend">Padding X</FormLabel>
                <Slider defaultValue={px} max={80} onChange={(_, value) => setProp((props: any) => props.px = value)} />
            </FormControl>
            <FormControl fullWidth={true} margin="normal" component="fieldset">
                <FormLabel component="legend">Padding Y</FormLabel>
                <Slider defaultValue={py} max={80} onChange={(_, value) => setProp((props: any) => props.py = value)} />
            </FormControl>
        </div>
    )
}
MainContainer.craft = {
    related: {
        settings: MainContainerSettings
    }
}


