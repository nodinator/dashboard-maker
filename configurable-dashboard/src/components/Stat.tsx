import { Typography, Popper, Fade, Box, Switch, Slider, TextField, Stack, IconButton, Backdrop } from "@mui/material";
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import { useState } from "react";


export default function Stat() {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [titleText, setTitleText] = useState("Sandwich Revenue")
  const [titleSwitch, setTitleSwitch] = useState(true)
  const [titleSize, setTitleSize] = useState(22)
  const [dataSwitch, setDataSwitch] = useState(true)
  const [dataSize, setDataSize] = useState(36)
  const [subtitleText, setSubtitleText] = useState("This Month")
  const [subtitleSwitch, setSubtitleSwitch] = useState(true)
  const [subtitleSize, setSubtitleSize] = useState(18)

  const handleTitleSizeField = (event: React.ChangeEvent<HTMLInputElement>) => {
      setTitleSize(parseInt(event.target.value));
  }
  const handleTitleSizeSlider = (event: Event, newValue: number | number[]) => {
    setTitleSize(newValue as number);
  };
  const handleTitleSwitch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitleSwitch(event.target.checked);
  };

  const handleDataSizeField = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDataSize(parseInt(event.target.value));
  }
  const handleDataSizeSlider = (event: Event, newValue: number | number[]) => {
    setDataSize(newValue as number);
  };
  const handleDataSwitch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDataSwitch(event.target.checked);
  };
  
  const handleSubtitleSizeField = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSubtitleSize(parseInt(event.target.value));
  }
  const handleSubtitleSizeSlider = (event: Event, newValue: number | number[]) => {
    setSubtitleSize(newValue as number);
  };
  const handleSubtitleSwitch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSubtitleSwitch(event.target.checked);
  };

  const handlePopperClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setOpen((previousOpen) => !previousOpen);
  };
  const canBeOpen = open && Boolean(anchorEl);
  const id = canBeOpen ? 'transition-popper' : undefined;

  return (
    <>
      <Stack justifyContent={"start"} flexDirection={"row"}>
        <IconButton onClick={handlePopperClick}>
          <SettingsSuggestIcon />
        </IconButton>
      </Stack>
      <Popper
        id={id}
        open={open}
        anchorEl={anchorEl} transition
        placement="left-start"
        disablePortal={false}
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
          <Box sx={{ border: 2, borderRadius: 5, p: 1, bgcolor: 'background.paper' }}>
            <Stack direction="row">
              <Typography variant="h5">Title</Typography>
              <Switch checked={titleSwitch} onChange={handleTitleSwitch}/>
            </Stack>
            {titleSwitch && 
              <Stack direction="column" spacing={1} alignItems="center">
                <TextField 
                  value={titleText}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setTitleText(event.target.value);
                  }}
                />
                <Stack direction="row" spacing={1} alignItems={"center"}>
                  <Slider value={titleSize} onChange={handleTitleSizeSlider} min={10} max={70}/>
                  <TextField
                    label="Font Size"
                    type={"number"} 
                    value={titleSize}
                    inputProps={{ type: 'number'}}
                    onChange={handleTitleSizeField}
                  />
                </Stack>
              </Stack>}
              
              <Stack direction="row">
                <Typography variant="h5">Data</Typography>
                <Switch checked={dataSwitch} onChange={handleDataSwitch}/>
              </Stack>
              {dataSwitch && 
              <Stack direction="column" spacing={1} alignItems="center">
                {/* Autocomplete (searchable select box) with grouped categories for different parts of api */}
                <Stack direction="row" spacing={1} alignItems={"center"}>
                  <Slider value={dataSize} onChange={handleDataSizeSlider} min={10} max={70}/>
                  <TextField
                    label="Font Size"
                    type={"number"} 
                    value={dataSize}
                    inputProps={{ type: 'number'}}
                    onChange={handleDataSizeField}
                  />
                </Stack>
              </Stack>} 



              <Stack direction="row">
                <Typography variant="h5">Subtitle</Typography>
                <Switch checked={subtitleSwitch} onChange={handleSubtitleSwitch}/>
              </Stack>
              {subtitleSwitch && 
                <Stack direction="column" spacing={1} alignItems="center">
                  <TextField 
                    value={subtitleText}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      setSubtitleText(event.target.value);
                    }}
                  />
                  <Stack direction="row" spacing={1} alignItems={"center"}>
                    <Slider value={subtitleSize} onChange={handleSubtitleSizeSlider} min={10} max={70}/>
                    <TextField
                      label="Font Size"
                      type={"number"} 
                      value={subtitleSize}
                      inputProps={{ type: 'number'}}
                      onChange={handleSubtitleSizeField}
                    />
                  </Stack>
                </Stack>}

            {/* COLOR PICKER */}
          </Box>
        </Fade>
      )}
      </Popper>



      {titleSwitch && 
      <Typography style={{fontSize: titleSize}}     variant="h6" color="primary" gutterBottom>
        {titleText}
      </Typography>}
      {dataSwitch &&
      <Typography style={{fontSize: dataSize}} variant="h4">
        $3,024
      </Typography>}
      {subtitleSwitch &&
      <Typography style={{fontSize: subtitleSize}} variant="subtitle1">
        {subtitleText}
      </Typography>}
    </>
  );
}


// function StatMenu() {
 
//   return (
//     <div>
//       <Popper
//         id={id}
//         open={open}
//         anchorEl={anchorEl} transition
//         placement="right-start"
//         disablePortal={false}
//         modifiers={[
//           {
//             name: 'flip',
//             enabled: true,
//             options: {
//               altBoundary: true,
//               rootBoundary: 'document',
//               padding: 8,
//             },
//           },
//           {
//             name: 'preventOverflow',
//             enabled: false,
//             options: {
//               altAxis: true,
//               altBoundary: true,
//               tether: true,
//               rootBoundary: 'document',
//               padding: 8,
//             },
//           },
//         ]}
//       >{({ TransitionProps }) => (
//         <Fade {...TransitionProps} timeout={350}>
//           <Box sx={{ border: 1, p: 1, bgcolor: 'background.paper' }}>
//             The content of the Popper.
//           </Box>
//         </Fade>
//       )}
//       </Popper>
//     </div>

//   )
// }
