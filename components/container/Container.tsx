import React, { useCallback } from "react"
import { Paper } from "@mui/material"
import { useNode } from "@craftjs/core"
import { FormControlLabel, FormControl, FormLabel, RadioGroup, Radio, Slider } from "@mui/material"
import Ind from "../indicator/Ind"

export const Container = ({ background, padding, my, children }: {
  background: string;
  my: number;
  padding: number;
  children: React.ReactNode
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
      <Paper ref={ref} sx={{ background, padding: `${padding}px`, marginY: `${my}px`, visibility: "visible" }}>
        {children}
      </Paper>
    </Ind>
  )
}

export const ContainerSettings = () => {
  const { actions: { setProp }, background, padding } = useNode(node => ({
    background: node.data.props.background,
    padding: node.data.props.padding
  }));
  return (
    <div>
      <FormControl component="fieldset">
        <FormLabel component="legend">Color</FormLabel>
        <RadioGroup defaultValue={background} onChange={(e) => setProp((props: any) => props.background = e.target.value)}>
          <FormControlLabel label="Red" value="red" control={<Radio size="small" color="primary" />} />
          <FormControlLabel label="Green" value="green" control={<Radio size="small" color="primary" />} />
          <FormControlLabel label="Blue" value="blue" control={<Radio size="small" color="primary" />} />
        </RadioGroup>
      </FormControl>
      <FormControl fullWidth={true} margin="normal" component="fieldset">
        <FormLabel component="legend">Padding</FormLabel>
        <Slider defaultValue={padding} onChange={(_, value) => setProp((props: any) => props.padding = value)} />
      </FormControl>
    </div>
  )
}
Container.craft = {
  related: {
    settings: ContainerSettings
  }
}