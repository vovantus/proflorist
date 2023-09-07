import { Server } from "../utils/config";
import { Client, Databases } from 'appwrite';



let api = {
    sdk : null,

    provider: () => {
        if (api.sdk) {
            return api.sdk;
        };
        const client = new Client();
        client.setEndpoint(Server.endpoint).setProject(Server.project);
        const databases = new Databases(client);
        api.sdk = {databases};
        return api.sdk;
    },


    listDocuments: (databaseId, collectionID) => {
        return api.provider().databases.listDocuments(databaseId, collectionID);
    }




};

export default api;