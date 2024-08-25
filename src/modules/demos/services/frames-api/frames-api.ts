import { Frame } from '@/entities/Frame';
import { baseURL } from '@/shared/constants/base-url';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { demosApi } from '../demos-api';

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
      async onQueryStarted({ id, ...data }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          demosApi.util.updateQueryData('getDemos', undefined, draft => {
            const demo = draft.find(demo => demo.id === id);
            if (demo) {
              const frame = demo.frames.find(frame => frame.id === id);
              if (frame) {
                Object.assign(frame, data);
              }
            }
          })
        );
        try {
          await queryFulfilled
        } catch {
          patchResult.undo()
        }
      },
      invalidatesTags: ['Frames'],
    }),
  }),
})

export const { useUpdateFrameMutation } = framesApi
