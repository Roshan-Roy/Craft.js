const Ind = ({ name, children, hovered, block }: { name: string; children: React.ReactNode; hovered: boolean; block: boolean; }) => {
    return (
        <div style={{
            border: "1px dashed #222",
            position: "relative",
            display: `${block ? "block" : "inline-block"}`,
            visibility: `${hovered ? "visible" : "hidden"}`
        }}>
            <span style={{
                position: "absolute",
                top: "0",
                right: "-1px",
                transform: "translateY(-100%)",
                background: "#222",
                color: "white",
                fontSize: "12px",
                padding: "2px 12px"
            }}>{name}</span>
            {children}
        </div>
    )
}

export default Ind