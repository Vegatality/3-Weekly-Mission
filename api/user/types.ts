export interface CurrentUserProfileData {
  id: number;
  name: string;
  image_source: string;
  email: string;
}

export interface FolderOwnerProfile extends CurrentUserProfileData {
  created_at: string;
}

export type GetCurrentUserProfileDataResponse = CurrentUserProfileData[];

export type FolderOwnerProfileResponse = FolderOwnerProfile[];
