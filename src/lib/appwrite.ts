import { Client, Account, Databases} from 'appwrite';

export const client = new Client();

client
    .setEndpoint('https://onmangeou.sygix.fr/v1')
    .setProject('onmangeou');

export const account = new Account(client);
export const databases = new Databases(client);
export { ID } from 'appwrite';