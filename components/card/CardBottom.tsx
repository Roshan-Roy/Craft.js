import { useNode } from "@craftjs/core"
import { Btn } from "../button/Btn";

export const CardBottom = ({ children }: {
    children: React.ReactNode
}) => {
    const { connectors: { connect } } = useNode();
    return (
        <div ref={connect as React.Ref<HTMLDivElement>}>
            {children}
        </div>
    )
}

CardBottom.craft = {
    rules: {
        canMoveIn: (incomingNodes: any) => incomingNodes.every((incomingNode: any) => incomingNode.data.type === Btn)
    }
}