export interface Article {
  id: string;
  title: string;
  content: string;
  slug: string;
  cover_image_url: string;
  status: 'draft' | 'published';
  author_id: string;
  published_at: Date | null;
  created_at: Date;
  updated_at: Date;
}

export interface CreateArticleViewModel {
  title: string;
  content: string;
  slug: string;
  cover_image_url: string;
  status: 'draft' | 'published';
  author_id: string;
}

export interface UpdateArticleViewModel {
  authorId: string;
  articleId: string;
  title?: string;
  content?: string;
  slug?: string;
  cover_image_url?: string;
  status?: 'draft' | 'published';
}
