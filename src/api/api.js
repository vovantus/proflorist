import { Server } from '../utils/config';
import {
  Client,
  Databases,
  Account,
  Permission,
  Role,
  Teams,
  Storage,
} from 'appwrite';

const api = {
  sdk: null,

  provider: () => {
    if (api.sdk) {
      return api.sdk;
    }
    const client = new Client();
    client.setEndpoint(Server.endpoint).setProject(Server.project);
    const databases = new Databases(client);
    const account = new Account(client);
    const teams = new Teams(client);
    const storage = new Storage(client);
    api.sdk = { databases, account, teams, storage };
    return api.sdk;
  },

  createAccount: (email, password, name) => {
    return api.provider().account.create('unique()', email, password, name);
  },

  getAccount: () => {
    let account = api.provider().account;
    return account.get();
  },

  createSession: (email, password) => {
    return api.provider().account.createEmailSession(email, password);
  },

  getCurrentSession: () => {
    return api.provider().account.getSession('current');
  },

  deleteCurrentSession: () => {
    return api.provider().account.deleteSession('current');
  },

  listDocuments: (databaseId, collectionID) => {
    return api.provider().databases.listDocuments(databaseId, collectionID);
  },

  getDocument: (databaseId, collectionID, documentId) => {
    return api
      .provider()
      .databases.getDocument(databaseId, collectionID, documentId);
  },

  createDocument: async (databaseId, collectionId, data) => {
    const teamsList = await api.provider().teams.list();
    const userTeam = teamsList.teams[0];
    console.log('user team:', userTeam);
    return api
      .provider()
      .databases.createDocument(databaseId, collectionId, 'unique()', data, [
        Permission.read(Role.any()),
        Permission.write(Role.team(userTeam.$id)),
      ]);
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
  // for rtk query
  fetchBouquetsService: async () => {
    try {
      const data = await api.listDocuments(
        Server.databaseID,
        Server.collectionID,
      );
      console.log('api call', data.documents);
      return { data: data.documents };
    } catch (e) {
      console.log('error', e);
      return { error: e };
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
      throw e;
    }
  },

  createBouquet: async (bouquet) => {
    try {
      const data = await api.createDocument(
        Server.databaseID,
        Server.collectionID,
        bouquet,
      );
      return data;
    } catch (e) {
      console.error('Error adding bouquet');
      console.log('error', e);
      throw e;
    }
  },

  uploadFile: (file) => {
    return api.provider().storage.createFile(Server.bucketID, 'unique()', file);
  },

  getFile: async (fileId) => {
    return api.provider().storage.getFileView(Server.bucketID, fileId);
  },
};

export default api;
