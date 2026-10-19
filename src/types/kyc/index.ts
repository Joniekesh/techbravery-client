import { ICountry } from "../country";
import { ImageAsset } from "../image-asset";

export const IdentityDocumentType = {
  PASSPORT: "PASSPORT",
  NATIONAL_ID: "NATIONAL_ID",
  DRIVERS_LICENSE: "DRIVERS_LICENSE",
  VOTER_CARD: "VOTER_CARD",
  OTHER: "OTHER",
} as const;

export type IdentityDocumentType =
  (typeof IdentityDocumentType)[keyof typeof IdentityDocumentType];

export const KycStatus = {
  NOT_STARTED: "NOT_STARTED",
  PENDING: "PENDING",
  APPROVED: "APPROVED",
  REJECTED: "REJECTED",
  MORE_INFORMATION: "MORE_INFORMATION",
} as const;

export type KycStatus = (typeof KycStatus)[keyof typeof KycStatus];

export const KycDocumentAssetType = {
  FRONT_DOCUMENT: "FRONT_DOCUMENT",
  BACK_DOCUMENT: "BACK_DOCUMENT",
  SELFIE: "SELFIE",
} as const;

export type KycDocumentAssetType =
  (typeof KycDocumentAssetType)[keyof typeof KycDocumentAssetType];

export const ReviewAction = {
  APPROVE: "APPROVE",
  REJECT: "REJECT",
  MORE_INFORMATION: "MORE_INFORMATION",
} as const;

export type ReviewAction = (typeof ReviewAction)[keyof typeof ReviewAction];

export interface KycDocumentAsset {
  id: string;
  kycId: string;
  assetId: string;
  type: KycDocumentAssetType;
  asset: ImageAsset;
}

export interface KycRecord {
  id: string;
  status: KycStatus;
  dateOfBirth: string | null;
  countryOfOrigin?: ICountry | null;
  countryOfResidence?: ICountry | null;
  issuingCountry?: ICountry | null;
  residentialAddress: string | null;
  city: string | null;
  state: string | null;
  phone: string | null;
  reviewNote?: string | null;
  documentType: IdentityDocumentType | null;
  documentNumberLast4: string | null;
  expiryDate: string | null;
  isPoliticallyExposed: boolean | null;
  frontDocumentAssetId: string | null;
  backDocumentAssetId: string | null;
  selfieAssetId: string | null;
  documents: KycDocumentAsset[];
  user: KycUser;
  reviews: AdminKycReview[];
  submittedAt?: string | null;
  reviewedAt?: string | null;
  rejectionReason?: string | null;
  informationRequest?: string | null;
  rejectedAt?: string | null;
  resubmittedAt?: string | null;
  createdAt?: string | null;
  approvedAt?: string | null;
  moreInformationRequestedAt?: string | null;
}

export interface AdminKycResponse {
  data: KycRecord[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export interface SaveKycDraftPayload {
  dateOfBirth?: string;
  residentialAddress?: string;
  city?: string;
  state?: string;
  phone?: string;
  documentType?: string;
  documentNumber?: string;
  issuingCountryId?: string;
  countryOfOriginId?: string;
  countryOfResidenceId?: string;
  expiryDate?: string;
  isPoliticallyExposed?: boolean | null;
  frontDocumentAssetId?: string | null;
  backDocumentAssetId?: string | null;
  selfieAssetId?: string | null;
}

export interface KycUser {
  id: string;
  firstName: string | null;
  middleName: string | null;
  lastName: string | null;
  email: string;
  phone: string | null;

  country: {
    id: string;
    name: string;
    iso2: string;
  } | null;

  nationality: {
    id: string;
    name: string;
    iso2: string;
  } | null;
}

export interface AdminKycAsset {
  id: string;
  assetId: string;
  type: KycDocumentAssetType;

  asset: {
    id: string;
    userId?: string;
    fileId: string;
    fileName: string;
    mimeType: string;
    size?: number;
    purpose?: string;
    status?: string;
    url: string;
    createdAt?: string;
    updatedAt?: string;
  };
}

export interface AdminKycReview {
  id: string;
  reviewerId: string | null;
  action: string;
  fromStatus: KycStatus;
  toStatus: KycStatus;
  note: string | null;
  createdAt: string;

  reviewer: {
    id: string;
    firstName: string | null;
    lastName: string | null;
    email: string;
  } | null;
}

// export interface AdminKycDetail {
//   id: string;
//   userId: string;
//   status: KycStatus;

//   dateOfBirth: string | null;
//   residentialAddress: string | null;
//   city: string | null;
//   state: string | null;

//   documentType: string | null;
//   documentNumberLast4: string | null;

//   issuingCountry: {
//     id: string;
//     name: string;
//     iso2: string;
//     iso3?: string;
//     dialCode?: string;
//   } | null;

//   expiryDate: string | null;
//   isPoliticallyExposed: boolean | null;

//   submittedAt: string | null;
//   reviewedAt: string | null;
//   createdAt: string;
//   updatedAt: string;

//   approvedAt: string | null;
//   rejectedAt: string | null;
//   moreInformationRequestedAt: string | null;

//   rejectionReason: string | null;
//   informationRequest: string | null;
//   reviewNote: string | null;

//   user: KycUser;

//   documents: AdminKycAsset[];
//   reviews: AdminKycReview[];
// }
