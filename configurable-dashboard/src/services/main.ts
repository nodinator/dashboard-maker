import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const mainApi: any = createApi({
  reducerPath: "mainApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:7000" }),
  endpoints: (build) => ({


    getParts: build.query({
      query: () => `completedParts`,
    }),
    getEngines: build.query({
      query: () => `completedEngines`,
    }),
    getMaterials: build.query({
      query: () => `rawMaterialsInventory`
    }),
    getMfgLines: build.query({
      query: () => `manufacturingLines`
    }),
    getShipments: build.query({
      query: () => `shipmentRecords`
    }),
  }),
});

export const { useGetPartsQuery, useGetEnginesQuery, useGetMaterialsQuery, useGetMfgLinesQuery, useGetShipmentsQuery } = mainApi;
