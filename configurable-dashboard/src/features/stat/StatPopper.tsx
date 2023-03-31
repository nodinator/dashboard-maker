import { Typography, Switch, Slider, TextField, Stack, Autocomplete, Popper } from "@mui/material";
import { useDispatch } from "react-redux";
import React, { forwardRef, useEffect, useState } from 'react'
import { textUpdated, enabledUpdated, dataUpdated, sizeUpdated } from "../../app/stylingAndDataSlice";
import ColorPicker from "../../common/ColorPicker";
import { useSelector } from "react-redux";
import { selectServer } from "../../app/serverSlice";

const StatPopper = forwardRef((props: any, ref) => {

  const { statId } = props
  const categories = ["Raw Materials Inventory", "Parts Inventory", "Engines Inventory", "Manufacturing Lines"]

  const dispatch = useDispatch()
  const server = useSelector(selectServer)
  const stylingAndData = useSelector((state: any) => //should use RootState here instead any
    state.stylingAndData.find((stylingAndData: any) => stylingAndData.id === statId)
  )

  const [firstValue, setFirstValue] = useState<null | any>(null);

  const [secondValue, setSecondValue] = useState<null | any>(null);


  const handleAutocomplete1Changed = (event: any, newValue: any) => {
    setFirstValue(newValue);
    setSecondValue(null)
  };
  const handleAutocomplete2Changed = (event: any, newValue: any) => {
    setSecondValue(newValue);
  };

  const handleSizeField = (type: any, event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    dispatch(sizeUpdated({ id: statId, type: type, size: parseInt(event.target.value) }))
  }
  const handleSizeSlider = (type: any, event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(sizeUpdated({ id: statId, type: type, size: parseInt(event.target.value) }))
  }

  useEffect(() => {
    dispatch(dataUpdated({ id: statId, category: firstValue, specificOption: secondValue }))
  }, [secondValue])// eslint-disable-line


  return (
    // @ts-ignore
    <div ref={ref}>

      {/****************  TITLE SECTION ***************/}

      <Stack direction="row" sx={{ paddingTop: 2, paddingBottom: 2, alignItems: "center" }}>
        <Typography variant="h5">Title</Typography>
        <Switch checked={stylingAndData.enabled.title} onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          dispatch(enabledUpdated({ id: statId, type: "title", enabled: event.target.checked }))} />
        {stylingAndData.enabled.title && <ColorPicker id={statId} type="title" color={stylingAndData.color.title} />}
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

      {/****************  DATA SECTION ***************/}

      <Stack direction="row" sx={{ paddingTop: 4, paddingBottom: 2, alignItems: "center" }} >
        <Typography variant="h5">Data</Typography>
        <Switch checked={stylingAndData.enabled.data} onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          dispatch(enabledUpdated({ id: statId, type: "data", enabled: event.target.checked }))} />
        {stylingAndData.enabled.data && <ColorPicker id={statId} type="data" color={stylingAndData.color.data} />}
      </Stack>
      {stylingAndData.enabled.data &&
        <Stack direction="column" alignItems="flex-start" marginLeft={2}>
          <Autocomplete
            disablePortal
            disableClearable
            options={categories}
            sx={{ width: 250, marginBottom: 2, backgroundColor: firstValue === null ? "#FFFBD6" : null }}
            value={firstValue}
            onChange={handleAutocomplete1Changed}
            getOptionLabel={(option: string) => option}
            renderInput={(params) => <TextField {...params} label="Select Data Category" />}

          />

          <Autocomplete
            disablePortal
            disabled={firstValue === null}
            sx={{ width: 250, marginBottom: 2, backgroundColor: secondValue === null ? "#FFFBD6" : null }}
            // converts server[firstValue], which is an array of objects, into an array of strings (the name values)
            options={firstValue !== null ? Array.from(new Set(server[firstValue].map((item: { name: string }) => item.name))) : []}
            getOptionLabel={(option: any) => option}
            value={secondValue}
            onChange={handleAutocomplete2Changed}
            renderInput={(params) => <TextField {...params} label="Select Data from API" />}
          />
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

      {/****************  SUBTITLE SECTION ***************/}

      <Stack direction="row" sx={{ paddingTop: 4, paddingBottom: 2, alignItems: "center" }}>
        <Typography variant="h5" >Subtitle</Typography>
        <Switch checked={stylingAndData.enabled.subtitle} onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          dispatch(enabledUpdated({ id: statId, type: "subtitle", enabled: event.target.checked }))} />
        {stylingAndData.enabled.subtitle && <ColorPicker id={statId} type="subtitle" color={stylingAndData.color.subtitle} />}
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
    </div>
  );
})
export default StatPopper;