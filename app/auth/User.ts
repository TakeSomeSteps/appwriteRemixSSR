import { Account, Models, } from "node-appwrite";

export const ROLE_ADMIN = "admin"

export interface UserMetaContext {
  [key: string]: unknown;
}


// TODO: update to appwrite User.
/**
 * The User type is whatever you will store in the session storage to identify the authenticated user. 
 * It can be the complete user data or a string with a token. It is completely configurable.
 */
export type Models = {
  id: string;
  secret: string;
  name?: string;
  username?: string;
  email?: string;
  roles?: string[];
  prefs?: UserMetaContext;
  labels?: string[];
};

// this is a MUST ! so no secret will leak !!
export type UserClientModel = {
  id: string;
  secret: string;
  name?: string;
  username?: string;
  email?: string;
  roles?: string[];
  prefs?: UserMetaContext;
  labels?: string[];
};

export class User {
  id: string;
  name?: string;
  username?: string;
  email?: string;
  roles?: string[];
  prefs?: UserMetaContext;
  labels?: string[] = [];

  constructor(userData: any) {
    this.id = userData.$id;
    this.name = userData.name;
    this.username = userData.name;
    this.email = userData.email;
    this.roles = [];
    this.prefs = userData.prefs;
    this.labels = userData.labels || [];
  }
}

