import { Popper, Fade, Stack, IconButton, ClickAwayListener, Box, Button } from "@mui/material";
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { popperOpened, stylingComponentDeleted, } from "./stylingAndDataSlice";
import { layoutComponentDeleted } from "./layoutSlice";
import StatPopper from "../features/stat/StatPopper";
import StatContent from "../features/stat/StatContent";

export default function Component({ toolbar, statId }: any) { //CHANGE STATID TO ID SO IT'S MORE GENERIC FOR OTHER COMPONENTS

  const dispatch = useDispatch()
  const stylingAndData = useSelector((state: any) => //should use RootState here instead any
    state.stylingAndData.find((stylingAndData: any) => stylingAndData.id === statId)
  )
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleDeleteButton = () => {
    dispatch(layoutComponentDeleted({ id: statId }))
    dispatch(stylingComponentDeleted({ id: statId }))
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
        <Popper id={popperId}
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


              {/* LOGIC HERE - RENDER STATPOPPER, OR STATLISTPOPPER OR PIEPOPPER... */}
              {/* DEPENDING ON PREFIX OF THE ID (FORMERLY STATID) */}
              <StatPopper
                statId={statId}
                stylingAndData={stylingAndData}
              />
            </Box>

          </Fade>)}
        </Popper>
      </ClickAwayListener>
      {/* LOGIC HERE - RENDER STATCONTENT, OR STATLISTCONTENT OR PIECONTENT... */}
      {/* DEPENDING ON PREFIX OF THE ID (FORMERLY STATID) */}
      <StatContent statId={statId} />
    </>
  );
}