import { registerPlugin } from '@capacitor/core';

export interface MediaStoreWriterPlugin {
  /**
   * Save a file into the user's Documents directory.
   *
   * `data` can be raw base64 (no data: prefix) OR a data URL.
   */
  saveToDocuments(options: {
    filename: string;
    data: string;
    mimeType?: string;
    subdir?: string;
  }): Promise<{ uri?: string; path?: string; displayName: string }>;
}

export const MediaStoreWriter = registerPlugin<MediaStoreWriterPlugin>('MediaStoreWriter');

export async function saveBase64ToDocuments(opts: {
  filename: string;
  base64: string;
  mimeType?: string;
  subdir?: string;
}) {
  return MediaStoreWriter.saveToDocuments({
    filename: opts.filename,
    data: opts.base64,
    mimeType: opts.mimeType,
    subdir: opts.subdir,
  });
}
