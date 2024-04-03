// This file spells out the common Data Entities that represent our business
// logic. Since they are used extensively throughout the app we are collecting
// them into a central location where we can easily access them from anywhere.

export type User = {
  id: string;
  email: string;
  name: string;
}

export type Address = {
  address1: string;
  address2: string;
  city: string;
  state: string;
  zip: string;
}

export type Listing = {
  id: string;
  name: string;
  // added the property extensionRequest to have a better way of tracking the form
  extensionRequest: string;
  physicalAddress: Address;
  mailingAddress: Address | null;

}


export type Submission = {
  id?: string;
  listing: Listing;
  createdAt?: string;
  reason?: string;
  extensionRequest?: string;
  submittedAt?: string;
}



