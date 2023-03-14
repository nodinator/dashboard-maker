import { Typography, Popper, Fade, Box, Switch, Slider, TextField, Stack, IconButton, ClickAwayListener, Button } from "@mui/material";
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { popperOpened, textUpdated, enabledUpdated, sizeUpdated, stylingComponentDeleted } from "./stylingAndDataSlice";
import { layoutComponentDeleted } from "./layoutSlice";
import ColorPicker from "./ColorPicker";


export default function Stat({ toolbar, statId }: any) { //can probably change statId to id so it's more generic for other components
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const dispatch = useDispatch()
  const stylingAndData = useSelector((state: any) => //should use RootState here instead any
    state.stylingAndData.find((stylingAndData: any) => stylingAndData.id === statId)
  )

  const handleSizeField = (type: any, event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    dispatch(sizeUpdated({ id: statId, type: type, size: parseInt(event.target.value) }))
  }
  const handleSizeSlider = (type: any, event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(sizeUpdated({ id: statId, type: type, size: parseInt(event.target.value) }))
  }

  const handleDeleteButton = () => {
    //dispatch a reducer to delete from layout and from stylingAndData
    dispatch(layoutComponentDeleted({ id: statId }))
    dispatch(stylingComponentDeleted({ id: statId }))

    //make confirmationmodal true
  }

  const handleClickAway = () => {
    dispatch(popperOpened({ id: statId, isOpen: false }))
  };
  const handlePopperClick = (event: React.MouseEvent<HTMLElement>) => {
    const target = event.currentTarget
    setAnchorEl(target);
    setTimeout(() => {
      dispatch(popperOpened({ id: statId, isOpen: true })) //be able to explain why setTimeout is necessary here
    })
  };
  const canBeOpen = stylingAndData.isOpen && Boolean(anchorEl);
  const popperId = canBeOpen ? 'transition-popper' : undefined;

  return (
    <>
      {toolbar &&
        <Stack justifyContent={"start"} flexDirection={"row"}>
          <IconButton onClick={handlePopperClick} disabled={stylingAndData.isOpen} style={{ position: "absolute", top: "10px" }} >
            <SettingsSuggestIcon />
          </IconButton>
        </Stack>
      }
      <ClickAwayListener onClickAway={handleClickAway}>
        <Popper
          id={popperId}
          open={stylingAndData.isOpen}
          anchorEl={anchorEl} transition
          placement="left-start"
          disablePortal={false}
          sx={{ zIndex: 3 }}
          modifiers={[
            {
              name: 'flip',
              enabled: true,
              options: {
                altBoundary: true,
                rootBoundary: 'document',
                padding: 8,
              },
            },
            {
              name: 'preventOverflow',
              enabled: false,
              options: {
                altAxis: true,
                altBoundary: true,
                tether: true,
                rootBoundary: 'document',
                padding: 8,
              },
            },
          ]}
        >{({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Box sx={{ border: 2, borderRadius: 5, padding: "20px 30px 20px 20px", bgcolor: 'background.paper' }}>
              <Box justifyContent="center" display="flex" paddingTop={1}>
                <Button style={{ justifySelf: "center" }} variant="contained" color="error" size="small"
                  onClick={() => { handleDeleteButton() }}>Delete</Button>
              </Box>
              <Stack direction="row" sx={{ paddingTop: 2, paddingBottom: 2, alignItems: "center" }}>
                <Typography variant="h5">Title</Typography>
                <Switch checked={stylingAndData.enabled.title} onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  dispatch(enabledUpdated({ id: statId, type: "title", enabled: event.target.checked }))} />
                <ColorPicker id={statId} type="title" color={stylingAndData.color.title} />
              </Stack>
              {stylingAndData.enabled.title &&
                <Stack direction="column" spacing={2} alignItems="flex-start" marginLeft={2}>
                  <TextField
                    label="Title Text"
                    value={stylingAndData.text.title}
                    fullWidth
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      dispatch(textUpdated({ id: statId, type: "title", text: event.target.value }))

                    }}
                  />
                  <Stack direction="row" spacing={1} alignItems={"center"}>
                    <TextField
                      label="Font Size"
                      type={"number"}
                      value={stylingAndData.size.title}
                      inputProps={{ type: 'number' }}
                      onChange={(event) => handleSizeField("title", event)}
                    />
                    <Slider value={stylingAndData.size.title} min={10} max={70}
                      //@ts-ignore
                      onChange={(event) => handleSizeSlider("title", event)} />

                  </Stack>
                </Stack>}

              <Stack direction="row" sx={{ paddingTop: 4, paddingBottom: 2, }} >
                <Typography variant="h5">Data</Typography>
                <Switch checked={stylingAndData.enabled.data} onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  dispatch(enabledUpdated({ id: statId, type: "data", enabled: event.target.checked }))} />
                <ColorPicker id={statId} type="data" color={stylingAndData.color.data} />

              </Stack>
              {stylingAndData.enabled.data &&
                <Stack direction="column" spacing={2} alignItems="flex-start" marginLeft={2}>

                  {/* Autocomplete (searchable select box) with grouped categories for different parts of api */}
                  <Stack direction="row" spacing={1} alignItems={"center"}>
                    <TextField
                      label="Font Size"
                      type={"number"}
                      value={stylingAndData.size.data}
                      inputProps={{ type: 'number' }}
                      onChange={(event) => handleSizeField("data", event)}
                    />
                    <Slider value={stylingAndData.size.data} min={10} max={70}
                      //@ts-ignore
                      onChange={(event) => handleSizeSlider("data", event)} />
                  </Stack>
                </Stack>}
              <Stack direction="row" sx={{ paddingTop: 4, paddingBottom: 2, }}>
                <Typography variant="h5" >Subtitle</Typography>
                <Switch checked={stylingAndData.enabled.subtitle} onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  dispatch(enabledUpdated({ id: statId, type: "subtitle", enabled: event.target.checked }))} />
                <ColorPicker id={statId} type="subtitle" color={stylingAndData.color.subtitle} />

              </Stack>
              {stylingAndData.enabled.subtitle &&
                <Stack direction="column" spacing={2} alignItems="flex-start" marginLeft={2}>
                  <TextField
                    label="Subtitle Text"
                    fullWidth
                    value={stylingAndData.text.subtitle}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      dispatch(textUpdated({ id: statId, type: "subtitle", text: event.target.value }))
                    }}
                  />
                  <Stack direction="row" spacing={1} alignItems={"center"} sx={{ paddingBottom: 2 }}>
                    <TextField
                      label="Font Size"
                      type={"number"}
                      value={stylingAndData.size.subtitle}
                      inputProps={{ type: 'number' }}
                      onChange={(event) => handleSizeField("subtitle", event)}
                    />
                    <Slider value={stylingAndData.size.subtitle} min={10} max={70}
                      //@ts-ignore
                      onChange={(event) => handleSizeSlider("subtitle", event)} />
                  </Stack>
                </Stack>}
            </Box>
          </Fade>)}
        </Popper>
      </ClickAwayListener>
      {stylingAndData.enabled.title &&
        <Typography style={{ fontSize: stylingAndData.size.title }} variant="h6" color={stylingAndData.color.title} >
          {stylingAndData.text.title}
        </Typography>}
      {stylingAndData.enabled.data &&
        <Typography style={{ fontSize: stylingAndData.size.data }} variant="h4" color={stylingAndData.color.data}>
          $3,024
        </Typography>}
      {stylingAndData.enabled.subtitle &&
        <Typography style={{ fontSize: stylingAndData.size.subtitle }} variant="subtitle1" color={stylingAndData.color.subtitle}>
          {stylingAndData.text.subtitle}
        </Typography>}

    </>
  );
}