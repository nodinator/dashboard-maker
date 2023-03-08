import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type Sandwich from "../types/sandwich";

export const mainApi = createApi({
  reducerPath: "mainApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000" }),
  endpoints: (build) => ({
    getRandom: build.query({
      query: (name: string) => `random/${name}`,
    }),
    // getSandwichByProtein: build.query<Sandwich, string>({
    //     query: (protein) => `sandwich/${protein}`,
    // }),
    // getBeverageByTemperature: build.query({
    //     query: (temperature) => `beverage/${temperature}`,
    // }),
    // updateBeverageQuantity: build.mutation({
    //     query:({beverageName, ...patch}) => ({
    //         url: `beverage/${beverageName}`,
    //         put: 'PATCH',
    //         body: patch
    //     })
    // }),
  }),
});

// export const { useGetSandwichByProteinQuery } = mainApi
// export const { useGetBeverageByTemperatureQuery } = mainApi
export const { useGetRandomQuery } = mainApi;
