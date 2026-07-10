export type TodayArchiveItemResponse = {
  bookmarkId: number;
  title: string;
  url: string;
  tags: string[];
  checkedCount: number;
  totalChecklistCount: number;
};

export type TagCollectionResponse = {
  tagName: string;
  bookmarkCount: number;
};

export type HomeResponse = {
  nickname: string;
  totalScore: number;
  todayArchive: TodayArchiveItemResponse[];
  collections: TagCollectionResponse[];
};

export type HomeArchiveItem = {
  id: string;
  title: string;
  url: string;
  domain: string;
  tags: string[];
  checkedCount: number;
  totalChecklistCount: number;
};

export type HomeCollection = {
  tagName: string;
  bookmarkCount: number;
};

export type HomeData = {
  nickname: string;
  totalScore: number;
  todayArchive: HomeArchiveItem[];
  collections: HomeCollection[];
};
