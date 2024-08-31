import React, { useState } from "react"
import { Box, FormControlLabel, Switch, Grid, Button as MaterialButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField, Snackbar, Typography } from "@mui/material"
import { useEditor } from "@craftjs/core"
import lz from "lzutf8"
import copy from 'copy-to-clipboard'
import ToJsx from "./tojsx/ToJsx"

export const Topbar = () => {
    const { actions, query, enabled } = useEditor((state) => ({
        enabled: state.options.enabled
    }));

    const [snackbarMessage, setSnackbarMessage] = useState<string | null>(null)
    const [dialogOpenOne, setDialogOpenOne] = useState(false)
    const [dialogOpenTwo, setDialogOpenTwo] = useState(false)
    const [stateToLoad, setStateToLoad] = useState<string>("")
    const [currentComponent, setCurrentComponent] = useState<string>(ToJsx(JSON.parse(query.serialize())))

    return (
        <Box px={1} py={1} mb={2} bgcolor="grey">
            <Grid container alignItems="center">
                <Grid item>
                    <FormControlLabel
                        control={<Switch color="secondary" checked={enabled} onChange={(_, value) => actions.setOptions(options => options.enabled = value)} />}
                        label="Enable editing"
                    />
                </Grid>
                <MaterialButton variant="outlined" color="secondary" onClick={() => {
                    setCurrentComponent(ToJsx(JSON.parse(query.serialize())))
                    setDialogOpenTwo(true)
                }}>&lt; / &gt;</MaterialButton>
                <Grid item xs>
                    <Typography variant="h6" color="secondary" align="center">Page Editor</Typography>
                </Grid>
                <Grid item>
                    <MaterialButton
                        sx={{ marginX: "10px" }}
                        size="small"
                        variant="outlined"
                        color="secondary"
                        onClick={() => {
                            const json = query.serialize()
                            copy(lz.encodeBase64(lz.compress(json)));
                            setSnackbarMessage("State copied to clipboard")
                        }}
                    >
                        Copy current state
                    </MaterialButton>
                    <MaterialButton
                        className="load-state-btn"
                        size="small"
                        variant="outlined"
                        color="secondary"
                        onClick={() => setDialogOpenOne(true)}
                    >
                        Load
                    </MaterialButton>
                    <Dialog
                        open={dialogOpenOne}
                        onClose={() => setDialogOpenOne(false)}
                        fullWidth
                        maxWidth="md"
                    >
                        <DialogTitle id="alert-dialog-title">Load state</DialogTitle>
                        <DialogContent>
                            <TextField
                                multiline
                                fullWidth
                                placeholder='Paste the contents that was copied from the "Copy Current State" button'
                                size="small"
                                value={stateToLoad}
                                onChange={e => setStateToLoad(e.target.value)}
                            />
                        </DialogContent>
                        <DialogActions>
                            <MaterialButton onClick={() => setDialogOpenOne(false)} color="primary">
                                Cancel
                            </MaterialButton>
                            <MaterialButton
                                onClick={() => {
                                    setDialogOpenOne(false);
                                    const json = lz.decompress(lz.decodeBase64(stateToLoad));
                                    actions.deserialize(json);
                                    setSnackbarMessage("State loaded")
                                }}
                                color="primary"
                                autoFocus
                            >
                                Load
                            </MaterialButton>
                        </DialogActions>
                    </Dialog>
                    <Dialog
                        open={dialogOpenTwo}
                        onClose={() => setDialogOpenTwo(false)}
                        fullWidth
                        maxWidth="md"
                    >
                        <DialogContent sx={{ background: "#222", color: "#ddd" }}>
                            <p dangerouslySetInnerHTML={{ __html: currentComponent }} />
                        </DialogContent>
                        <DialogActions sx={{ background: "#222" }}>
                            <MaterialButton onClick={() => {
                                const cleanStr = currentComponent.replace(/&gt;/g, '>').replace(/&lt;/g, '<').replace(/&quot;/g, '"').replace(/<br\s*\/?>/gi, '').replace(/\n/g, '')
                                copy(cleanStr)
                            }} color="secondary" variant="contained">
                                COPY TO CLIPBOARD
                            </MaterialButton>
                            <MaterialButton
                                onClick={() => setDialogOpenTwo(false)}
                                color="secondary"
                                variant="contained"
                            >
                                CANCEL
                            </MaterialButton>
                        </DialogActions>
                    </Dialog>
                    <Snackbar
                        autoHideDuration={1000}
                        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                        open={!!snackbarMessage}
                        onClose={() => setSnackbarMessage(null)}
                        message={<span>{snackbarMessage}</span>}
                    />
                </Grid>
            </Grid>
        </Box>
    )
};