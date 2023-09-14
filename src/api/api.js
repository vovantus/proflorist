import { Server } from '../utils/config';
import { Client, Databases } from 'appwrite';

let api = {
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
};

export default api;
