import React, { useCallback, useState } from "react"
import { useNode } from "@craftjs/core"
import ContentEditable from 'react-contenteditable'
import { useEffect } from "react"
import { FormControl, FormLabel, Slider, Radio, RadioGroup, FormControlLabel } from "@mui/material"
import Ind from "../indicator/Ind"

export const Text = ({ text, color, fontSize }: {
    text: string;
    color: string;
    fontSize: number;
}) => {
    const { connectors: { connect, drag }, isActive, name, isHovered, actions: { setProp } } = useNode((node) => ({
        isActive: node.events.selected,
        isHovered: node.events.hovered,
        name: node.data.name
    }));

    const [editable, setEditable] = useState(false)

    const ref = useCallback((node: HTMLDivElement | null) => {
        if (node) {
            connect(drag(node));
        }
    }, [connect, drag]);

    useEffect(() => {
        !isActive && setEditable(false)
    }, [isActive]);

    return (
        <Ind name={name} hovered={isHovered} block={true}>
            <div ref={ref} onClick={e => setEditable(true)} style={{ visibility: "visible" }}>
                <ContentEditable
                    disabled={!editable}
                    html={text}
                    onChange={e =>
                        setProp((props: any) =>
                            props.text = e.target.value
                        )
                    }
                    tagName="p"
                    style={{ fontSize: `${fontSize}px`, color }}
                />
            </div>
        </Ind>
    );
}

const TextSettings = () => {
    const { actions: { setProp }, fontSize, color } = useNode((node) => ({
        fontSize: node.data.props.fontSize,
        color: node.data.props.color
    }));

    return (
        <div>
            <FormControl component="fieldset" fullWidth={true}>
                <FormLabel component="legend">Color</FormLabel>
                <RadioGroup defaultValue={color} onChange={(e) => setProp((props: any) => props.color = e.target.value)}>
                    <FormControlLabel label="white" value="#fff" control={<Radio size="small" color="primary" />} />
                    <FormControlLabel label="black" value="#000" control={<Radio size="small" color="primary" />} />
                </RadioGroup>
            </FormControl>
            <FormControl size="small" component="fieldset" fullWidth={true}>
                <FormLabel component="legend">Font size</FormLabel>
                <Slider
                    value={fontSize}
                    step={1}
                    min={1}
                    max={50}
                    onChange={(_, value) => {
                        setProp((props: any) => props.fontSize = value);
                    }}
                />
            </FormControl>
        </div>
    )
}

Text.craft = {
    related: {
        settings: TextSettings
    }
}