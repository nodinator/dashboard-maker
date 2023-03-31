import { Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { selectServer } from "../../app/serverSlice";

export default function StatContent({ statId }: { statId: string }) {

  const stylingAndData = useSelector((state: any) => //should use RootState here instead of any
    state.stylingAndData.find((stylingAndData: any) => stylingAndData.id === statId)
  )

  const server = useSelector(selectServer)

  const displayData = () => {
    let specificOption = server[stylingAndData.data.category].find((item: any) => item.name === stylingAndData.data.specificOption)
    if (specificOption.hasOwnProperty('quantity')) {
      return specificOption.quantity
    } else if (specificOption.hasOwnProperty("status")) {
      return specificOption.status
    }
  }

  return (
    <>
      {
        stylingAndData.enabled.title &&
        <Typography style={{ fontSize: stylingAndData.size.title }} variant="h6" color={stylingAndData.color.title} >
          {stylingAndData.text.title}
        </Typography>
      }
      {
        stylingAndData.enabled.data &&
        <Typography style={{ fontSize: stylingAndData.size.data }} variant="h4" color={stylingAndData.color.data}>
          {stylingAndData.data.specificOption ? displayData() : "$3,024"} {/* displayData returns quantity or status */}
        </Typography>
      }
      {
        stylingAndData.enabled.subtitle &&
        <Typography style={{ fontSize: stylingAndData.size.subtitle }} variant="subtitle1" color={stylingAndData.color.subtitle}>
          {stylingAndData.text.subtitle}
        </Typography>
      }
    </>
  )
}