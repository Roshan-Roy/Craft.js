import React from "react"
import { Text } from "../text/Text"
import { Btn } from "../button/Btn"
import { Container } from "../container/Container"
import { Element } from "@craftjs/core"
import { CardTop } from "./CardTop"
import { CardBottom } from "./CardBottom"
import { ContainerSettings } from "../container/Container"
import { Heading } from "../text/Heading"

export const Card = ({ background, padding }: {
    background: string;
    padding: number;
}) => {
    return (
        <Container background={background} padding={padding} my={0}>
            <Element is={CardTop} id="text" canvas>
                <Heading text="Title" variant="h3" mt={10} mb={0} color="black" align="left" />
                <Text text="Description" color="#000" fontSize={16} />
            </Element>
            <Element is={CardBottom} id="buttons" canvas>
                <Btn size="small" variant="text" color="primary" text="button" mx={0} my={0} />
            </Element>
        </Container>
    )
}

Card.craft = {
    related: {
        settings: ContainerSettings
    }
}