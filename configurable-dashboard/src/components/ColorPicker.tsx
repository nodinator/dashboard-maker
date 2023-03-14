import { Typography, Popper, Fade, Paper, ClickAwayListener } from "@mui/material";
import { useState, useRef } from "react";
import { SketchPicker } from "react-color";
import { useDispatch } from "react-redux";
import { colorUpdated } from "./stylingAndDataSlice";

export default function ColorPicker({ id, type, color }: any) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [pickerPopper, setPickerPopper] = useState(false)
  const dialogRef = useRef<HTMLInputElement>(null);

  const dispatch = useDispatch()
  const handlePopperClick = (event: React.MouseEvent<HTMLElement>) => {
    const target = event.currentTarget
    setAnchorEl(target);
    setPickerPopper(pickerPopper => !pickerPopper)
  };
  const handleChange = (color: any) => {
    dispatch(colorUpdated({ id: id, type: type, color: color.hex }))

  };
  const handleClickAway = (event: any) => {
    if (dialogRef.current && !dialogRef.current.contains(event.target)) {
      setPickerPopper(false)
    }

  };

  function getTextColorForBackground(backgroundColor: string) {
    const hexColor = backgroundColor.replace('#', '');
    const red = parseInt(hexColor.substring(0, 2), 16);
    const green = parseInt(hexColor.substring(2, 4), 16);
    const blue = parseInt(hexColor.substring(4, 6), 16);

    const luminance = (0.299 * red + 0.587 * green + 0.114 * blue) / 255;

    return luminance > 0.5 ? 'black' : 'white';
  }
  const textColor = getTextColorForBackground(color)

  return (
    <>
      <div style={{ width: 80, height: 20, backgroundColor: color, cursor: "pointer" }} onClick={handlePopperClick} >
        <Typography sx={{ color: textColor }}>{color}</Typography>
      </div>
      {pickerPopper &&
        <ClickAwayListener onClickAway={handleClickAway}>

          <Popper
            ref={dialogRef}
            open={pickerPopper}
            anchorEl={anchorEl} transition
            placement="bottom"
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
              <Paper><SketchPicker color={color} onChange={handleChange} /></Paper>
            </Fade>)}
          </Popper>
        </ClickAwayListener>
      }
    </>
  )
}