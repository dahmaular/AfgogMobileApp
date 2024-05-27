export type FileType = {
  uri?: string | undefined;
  base64?: string;
  uris?: (string | undefined)[];
  fileName?: string;
  type: string;
  isEmpty?: boolean;
};

// export interface ImageLibraryOptions {
//   selectionLimit?: number;
//   mediaType: 'photo';
//   quality: 0.5;
// }
