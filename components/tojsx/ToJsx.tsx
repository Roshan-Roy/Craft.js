import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

type NodeType = {
    type: { resolvedName: string };
    isCanvas: boolean;
    props: any;
    displayName: string;
    custom: Record<string, any>;
    hidden: boolean;
    nodes: string[];
    linkedNodes: Record<string, string>;
    parent?: string;
};

type JSONData = {
    [key: string]: NodeType;
};

interface ComponentRendererProps {
    data: JSONData;
    root: string;
}

const ComponentRenderer: React.FC<ComponentRendererProps> = ({ data, root }) => {
    const renderNode = (nodeId: string, indentLevel: number = 0): string => {
        const node = data[nodeId];
        if (!node || node.hidden) return '';

        const { type, props, nodes, linkedNodes } = node;
        const Tag = type.resolvedName;

        const propsString = Object.entries(props)
            .map(([key, value]) => `${key}={${JSON.stringify(value)}}`)
            .join(' ');

        const indent = '  '.repeat(indentLevel);
        let jsx = `${indent}<${Tag} ${propsString}`;
        const childNodes = nodes.map((childId) => renderNode(childId, indentLevel + 1)).join('\n');
        const linkedNodesContent = Object.values(linkedNodes)
            .map((linkedNodeId) => renderNode(linkedNodeId, indentLevel + 1))
            .join('\n');

        if (childNodes || linkedNodesContent) {
            jsx += `>\n${childNodes}${linkedNodesContent}\n${indent}</${Tag}>`;
        } else {
            jsx += ' />';
        }

        return jsx;
    };

    return <>{renderNode(root)}</>;
};

const ToJsx = (json: JSONData) => {
    const imports = `import React from 'react';<br/>`;
    const componentImports = new Set<string>();

    const collectImports = (nodeId: string) => {
        const node = json[nodeId];
        if (!node || node.hidden) return;

        componentImports.add(node.type.resolvedName);

        node.nodes.forEach(collectImports);
        Object.values(node.linkedNodes).forEach(collectImports);
    };

    collectImports('ROOT');

    const importStatements = Array.from(componentImports)
        .map((component) => `import ${component} from './components/${component}';`)
        .join('<br/>');

    const jsx = renderToStaticMarkup(<ComponentRenderer data={json} root="ROOT" />);

    const finalCode = `${imports}${importStatements}<br/><br/>const MyComponent = () => {<br/>  return (<br/>${jsx}<br/>  );<br/>};<br/><br/>export default MyComponent;`;
    console.log(finalCode)
    return finalCode;
};

export default ToJsx;

