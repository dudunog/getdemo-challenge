import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import { demosApi } from '@/modules/demos/services/demos-api'
import { framesApi } from '@/modules/demos/services/frames-api'

export const store = configureStore({
  reducer: {
    [demosApi.reducerPath]: demosApi.reducer,
    [framesApi.reducerPath]: framesApi.reducer,
  },
  middleware: (gDM) => gDM().concat(demosApi.middleware, framesApi.middleware),
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
