import { useNode } from "@craftjs/core"
import { Heading } from "../text/Heading"
import { Text } from "../text/Text"

export const CardTop = ({ children }: {
    children: React.ReactNode
}) => {
    const { connectors: { connect } } = useNode();
    return (
        <div ref={connect as React.Ref<HTMLDivElement>}>
            {children}
        </div>
    )
}

CardTop.craft = {
    rules: {
        canMoveIn: (incomingNodes: any) => incomingNodes.every((incomingNode: any) => incomingNode.data.type === Heading || incomingNode.data.type === Text)
    }
}