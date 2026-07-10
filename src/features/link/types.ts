export type Tag = {
  id: string;
  name: string;
};

export type ChecklistItem = {
  id: string;
  title: string;
  isCompleted: boolean;
};

export type Bookmark = {
  id: string;
  title: string;
  url: string;
  domain: string;
  purpose: string;
  reminderAt: string;
  score: number;
  viewedAt?: string;
  tags: Tag[];
  checklist: ChecklistItem[];
};

export type CollectionDetail = {
  tag: Tag;
  bookmarks: Bookmark[];
};
