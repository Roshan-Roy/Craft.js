import { useNode } from "@craftjs/core"
import { Card } from "../card/Card"
import { Grid } from "@mui/material"

export const GridItem = ({ children }: {
    children: React.ReactNode
}) => {
    const { connectors: { connect } } = useNode();
    return (
        <Grid item xs ref={connect as React.Ref<HTMLDivElement>}>
            {children}
        </Grid>
    )
}

GridItem.craft = {
    rules: {
        canMoveIn: (incomingNodes: any) => incomingNodes.every((incomingNode: any) => incomingNode.data.type === Card)
    }
}