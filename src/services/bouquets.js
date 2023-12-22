// Need to use the React-specific entry point to import createApi
import { createApi } from '@reduxjs/toolkit/query/react';
import api from '../api/api';

// Define a service using a base URL and expected endpoints
export const bouquetsApi = createApi({
  reducerPath: 'bouquetsApi',
  baseQuery: api.fetchBouquetsService,
  endpoints: (build) => ({
    getBouquetsList: build.query({
      queryFn: async () => {
        try {
          const bouquets = await api.fetchBouquetsRTK();
          // Return the result in an object with a `data` field
          return { data: bouquets.data };
        } catch (error) {
          // Catch any errors and return them as an object with an `error` field
          return { error };
        }
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetBouquetsListQuery } = bouquetsApi;
