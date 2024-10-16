export interface CatalogItem {
    fields: {
      Name?: string;
      Notes?: string;
      Assignee?: string;
      Price?: string;
      Gender?: string;
      Styles?: string;
      Link?: string;
      'Age Group'?: string[];
      Model?: Attachment[];
      Front?: Attachment[];
      Images?: string;
      'Size (General)'?: string[];
      'Size (Numeric)'?: string[];
      Fit?: string;
      'Fit (Detailed)'?: string;
      Season?: string[];
      Category?: string;
      'Product Details'?: string;
    };
  }
  
  interface Attachment {
    id: string;
    url: string;
    filename: string;
    size: number;
    type: string;
    width?: number;
    height?: number;
    thumbnails?: {
      small: ThumbnailInfo;
      large: ThumbnailInfo;
      full: ThumbnailInfo;
    };
  }
  
  interface ThumbnailInfo {
    url: string;
    width: number;
    height: number;
  }