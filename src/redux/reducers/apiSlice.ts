// Import the RTK Query methods from the React-specific entry point
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API_BASE_URL } from '../../services/axios'

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),

  endpoints: (builder) => ({
    getPosts: builder.query({
      query: ({ page, limit, isPublished, query }) => {
        const params = {
          _page: page && page > 0 ? page : 1,
          _sort: 'createdAt',
          _order: 'desc',
          _limit: limit && limit > 0 ? limit : 5,
          isPublished: isPublished || false,
          q: query || '',
        }

        return `/posts?${new URLSearchParams(params)}`
      },
    }),
  }),
})

export const { useGetPostsQuery } = apiSlice
