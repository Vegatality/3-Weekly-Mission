export interface CreateFolder {
  id: number;
  created_at: string;
  favorite: boolean;
  name: string;
}

export interface EditFolder extends CreateFolder {
  user_id: number;
}

export interface EditFolderNameParam {
  folderId: number;
  name: string;
}

/**
 * 폴더 조회(링크 정보는 없음)
 */
export type FolderInfo = EditFolder;

/**
 * 유저의 모든 폴더 조회
 */
export interface FolderCategoryData extends CreateFolder {
  link_count: number;
}
