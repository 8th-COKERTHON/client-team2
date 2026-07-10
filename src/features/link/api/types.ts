export type TagResponse = {
  tagId: number;
  name: string;
};

export type BookmarkRequest = {
  title: string;
  url: string;
  remindAt: string;
  tags: string[];
};

export type BookmarkResponse = {
  bookmarkId: number;
  title: string;
  url: string;
  viewCount: number;
  visitedAt?: string;
  remindAt?: string;
  isActive: boolean;
  tags: TagResponse[];
  createdAt: string;
  updatedAt: string;
};

export type CreateChecklistRequest = {
  content: string;
};

export type ChecklistResponse = {
  checklistId: number;
  bookmarkId: number;
  content: string;
  isChecked: boolean;
  createdAt: string;
};

export type ChecklistCheckResponse = {
  checklistId: number;
  bookmarkId: number;
  content: string;
  isChecked: boolean;
  updatedAt: string;
};

export type BookmarkDetailResponse = {
  bookmarkId: number;
  title: string;
  url: string;
  remindAt?: string;
  totalScore: number;
  tags: TagResponse[];
  checklists: ChecklistResponse[];
};
