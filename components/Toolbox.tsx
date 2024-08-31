import React from "react"
import { useEditor } from "@craftjs/core"
import { Box } from "@mui/material"
import { Btn } from "./button/Btn"
import { Card } from "./card/Card"
import { Heading } from "./text/Heading"
import Dropdown from "./dropdown/Dropdown"
import { Text } from "./text/Text"

const boxStyle = { textAlign: "center", padding: "10px 0", border: "1px solid #ccc", background: "white" }


export const Toolbox = () => {

    const { connectors } = useEditor()

    return (
        <Box bgcolor="rgba(0, 0, 0, 0.06)" px={3} py={3}>
            <Dropdown category="Text">
                <Box ref={(ref) => {
                    if (ref instanceof HTMLElement)
                        connectors.create(ref, <Heading text="Heading" variant="h2" mt={0} mb={0} color="black" align="left" />);
                }} sx={boxStyle}>
                    Heading
                </Box>
                <Box ref={(ref) => {
                    if (ref instanceof HTMLElement)
                        connectors.create(ref, <Text text="Normal Text" color="#000" fontSize={16} />);
                }} sx={boxStyle}>
                    Normal Text
                </Box>
            </Dropdown>
            <Dropdown category="Button">
                <Box ref={(ref) => {
                    if (ref instanceof HTMLElement)
                        connectors.create(ref, <Btn size="small" variant="text" color="primary" text="button" mx={0} my={0} />);
                }} sx={boxStyle}>
                    Text
                </Box>
                <Box ref={(ref) => {
                    if (ref instanceof HTMLElement)
                        connectors.create(ref, <Btn size="small" variant="outlined" color="primary" text="button" mx={0} my={0} />);
                }} sx={boxStyle}>
                    Outline
                </Box>
                <Box ref={(ref) => {
                    if (ref instanceof HTMLElement)
                        connectors.create(ref, <Btn size="small" variant="contained" color="primary" text="button" mx={0} my={0} />);
                }} sx={boxStyle}>
                    Contained
                </Box>
            </Dropdown>
            <Dropdown category="Card">
                <Box ref={(ref) => {
                    if (ref instanceof HTMLElement)
                        connectors.create(ref, <Card background="red" padding={20} />);
                }} sx={boxStyle}>
                    Card
                </Box>
            </Dropdown>
        </Box>
    )
};