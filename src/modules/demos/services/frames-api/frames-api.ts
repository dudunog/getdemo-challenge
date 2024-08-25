import { Frame } from '@/entities/Frame';
import { baseURL } from '@/shared/constants/base-url';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export type FramesResponse = Frame[]

export const framesApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
  reducerPath: 'framesApi',
  tagTypes: ['Frames'],
  endpoints: (build) => ({
    updateFrame: build.mutation<FramesResponse, Partial<Frame>>({
      query: (body) => ({
        url: `frames/${body.id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Frames'],
    }),
  }),
})

export const { useUpdateFrameMutation } = framesApi
