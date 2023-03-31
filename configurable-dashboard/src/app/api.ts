import { useGetPartsQuery, useGetEnginesQuery, useGetMaterialsQuery, useGetMfgLinesQuery, useGetShipmentsQuery } from "../services/main";
import { serverUpdated } from "./serverSlice";
import { useDispatch } from "react-redux";


export default function PollServer() {
  const dispatch = useDispatch()

  const pollingInterval = 1000//ms

  const { data: materialsData, error: materialsError, isLoading: materialsIsLoading } = useGetMaterialsQuery(null, {
    pollingInterval: pollingInterval,
  })
  const { data: partsData, error: partsError, isLoading: partsIsLoading } = useGetPartsQuery(null, {
    pollingInterval: pollingInterval,
  })
  const { data: enginesData, error: enginesError, isLoading: enginesIsLoading } = useGetEnginesQuery(null, {
    pollingInterval: pollingInterval,
  })
  const { data: mfgLinesData, error: mfgLinesError, isLoading: mfgLinesIsLoading } = useGetMfgLinesQuery(null, {
    pollingInterval: pollingInterval,
  })
  const { data: shipmentsData, error: shipmentsError, isLoading: shipmentsIsLoading } = useGetShipmentsQuery(null, {
    pollingInterval: pollingInterval,
  })

  type MaterialsArray = Array<{ tag: string, name: string, quantity: number }>;
  let materialsArray: MaterialsArray = []

  type PartsArray = Array<{ tag: string, name: string, quantity: number, partNumber: string }>;
  let partsArray: PartsArray = [] //these have to stay arrays for the autocomplete components to function (options prop must be an array) and all must have name category

  type EnginesArray = Array<{ tag: string, name: string, quantity: number }>;
  let enginesArray: EnginesArray = []

  type MfgLinesArray = Array<{ tag: string, name: string, status: string }>;
  let mfgLinesArray: MfgLinesArray = []

  let shipmentsArray: string[] = []

  try {
    if (!materialsIsLoading) {
      materialsData.forEach((element: { name: string, quantity: number }) => {
        materialsArray.push({ tag: `${element.name} - qty ${element.quantity}`, name: element.name, quantity: element.quantity })
      });
    }
  } catch (e) { console.log(materialsError, e) }
  try {
    if (!partsIsLoading) {
      partsData.forEach((element: { name: string, partNumber: string, quantity: number }) => {
        partsArray.push({ tag: `${element.partNumber} - ${element.name} - qty ${element.quantity}`, name: element.name, quantity: element.quantity, partNumber: element.partNumber });
      })
    }
  } catch (e) { console.log(partsError, e) }
  try {
    if (!enginesIsLoading) {
      enginesData.forEach((element: { name: string, quantity: number }) => {
        enginesArray.push({ tag: `${element.name} - qty ${element.quantity}`, name: element.name, quantity: element.quantity })
      });
    }
  } catch (e) { console.log(enginesError, e) }
  try {
    if (!mfgLinesIsLoading) {
      mfgLinesData.forEach((element: { name: string, status: string }) => {
        mfgLinesArray.push({ tag: `${element.name} - ${element.status}`, name: element.name, status: element.status })
      });
    }
  } catch (e) { console.log(mfgLinesError, e) }
  try {
    if (!shipmentsIsLoading) {
      shipmentsData.forEach((element: any) => {
        shipmentsArray.push(`${element.date} - ${element.company} - ${element.product} - qty ${element.quantity}`)
      });
    }
  } catch (e) { console.log(shipmentsError, e) }

  setTimeout(() => { //without setTimeout the rendering of App overlaps with updating the initial Stat component
    dispatch(serverUpdated(({ "Raw Materials Inventory": materialsArray, "Parts Inventory": partsArray, "Engines Inventory": enginesArray, "Manufacturing Lines": mfgLinesArray, "Shipment Records": shipmentsArray })))
  })

}