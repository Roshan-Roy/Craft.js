import { createElement } from "react"
import { Box, Chip, Grid, Typography, Button } from "@mui/material"
import { useEditor } from "@craftjs/core"

export const SettingsPanel = () => {
    const { actions, selected } = useEditor((state, query) => {
        const [currentNodeId]: any = state.events.selected;
        let selected;

        if (currentNodeId) {
            selected = {
                id: currentNodeId,
                name: state.nodes[currentNodeId].data.name,
                settings: state.nodes[currentNodeId].related && state.nodes[currentNodeId].related.settings,
                isDeletable: query.node(currentNodeId).isDeletable()
            };
        }

        return {
            selected
        }
    });

    return selected ? (
        <Box bgcolor="rgba(0, 0, 0, 0.06)" px={3} py={3}>
            <Grid container direction="column" spacing={0}>
                <Grid item>
                    <Box mb={3}>
                        <Grid container alignItems="center">
                            <Grid item xs><Typography variant="subtitle1">Selected</Typography></Grid>
                            <Grid item><Chip size="small" color="primary" label={selected.name} /></Grid>
                        </Grid>
                    </Box>
                </Grid>
                {
                    selected.settings && createElement(selected.settings)
                }
                {
                    selected.isDeletable ? (
                        <Button
                            variant="contained"
                            color="warning"
                            onClick={() => {
                                actions.delete(selected.id);
                            }}
                        >
                            Delete
                        </Button>
                    ) : null
                }
            </Grid>
        </Box>
    ) : <Box bgcolor="rgba(0, 0, 0, 0.06)" px={3} py={3}>
        <Typography align="center">Nothing selected</Typography>
    </Box>
}