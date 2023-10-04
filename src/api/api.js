import { Server } from '../utils/config';
import { Client, Databases } from 'appwrite';

const api = {
  sdk: null,

  provider: () => {
    if (api.sdk) {
      return api.sdk;
    }
    const client = new Client();
    client.setEndpoint(Server.endpoint).setProject(Server.project);
    const databases = new Databases(client);
    api.sdk = { databases };
    return api.sdk;
  },

  listDocuments: (databaseId, collectionID) => {
    return api.provider().databases.listDocuments(databaseId, collectionID);
  },

  getDocument: (databaseId, collectionID, documentId) => {
    return api
      .provider()
      .databases.getDocument(databaseId, collectionID, documentId);
  },

  updateEmptyFields: (databaseId, collectionID, fieldName) => {
    api
      .listDocuments(databaseId, collectionID)
      .then((response) => {
        const docs = response.documents;

        docs.forEach((doc) => {
          const docId = doc['$id'];
          const updatedData = {
            [fieldName]: 'test' + fieldName,
          };

          api
            .provider()
            .databases.updateDocument(
              databaseId,
              collectionID,
              docId,
              updatedData,
            )
            .then(() => {
              console.log(`doc updated ${docId}`);
            })
            .catch((error) => {
              console.error(`Error updating document ${docId}: ${error}`);
            });
        });
      })
      .catch((error) => {
        console.error('Error listing documents: ', error);
      });
  },

  fetchBouquets: async () => {
    try {
      const data = await api.listDocuments(
        Server.databaseID,
        Server.collectionID,
      );
      return data.documents;
    } catch (e) {
      console.log('error', e);
      throw e;
    }
  },

  fetchBouquetInfo: async (bouquetID) => {
    try {
      const data = await api.getDocument(
        Server.databaseID,
        Server.collectionID,
        bouquetID,
      );
      return data;
    } catch (e) {
      console.log('error', e);
    }
  },
};

export default api;
