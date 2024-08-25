import { Demo } from '@/entities/Demo'
import { baseURL } from '@/shared/constants/base-url'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export type DemosResponse = Demo[]

export const demosApi = createApi({
	baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
	reducerPath: 'demosApi',
	tagTypes: ['Demos'],
	endpoints: build => ({
		getDemos: build.query<DemosResponse, void>({
			query: () => 'demos',
		}),
	}),
})

export const { useGetDemosQuery } = demosApi
