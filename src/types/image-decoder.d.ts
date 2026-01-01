/**
 * Type declarations for the ImageDecoder WebCodecs API
 * https://developer.mozilla.org/en-US/docs/Web/API/ImageDecoder
 */

interface ImageDecoderInit {
  type: string;
  data: ArrayBuffer | ReadableStream<Uint8Array>;
  colorSpaceConversion?: 'default' | 'none';
  desiredHeight?: number;
  desiredWidth?: number;
  preferAnimation?: boolean;
}

interface ImageDecodeOptions {
  frameIndex?: number;
  completeFramesOnly?: boolean;
}

interface ImageDecodeResult {
  image: VideoFrame;
  complete: boolean;
  duration?: number;
}

interface ImageTrack {
  animated: boolean;
  frameCount: number;
  repetitionCount: number;
  selected: boolean;
}

interface ImageTrackList {
  ready: Promise<undefined>;
  selectedIndex: number;
  selectedTrack: ImageTrack | null;
  length: number;
  [index: number]: ImageTrack;
}

declare class ImageDecoder {
  constructor(init: ImageDecoderInit);
  readonly complete: boolean;
  readonly completed: Promise<undefined>;
  readonly tracks: ImageTrackList;
  readonly type: string;
  close(): void;
  decode(options?: ImageDecodeOptions): Promise<ImageDecodeResult>;
  reset(): void;
  static isTypeSupported(type: string): Promise<boolean>;
}

interface VideoFrame {
  readonly codedHeight: number;
  readonly codedRect: DOMRectReadOnly | null;
  readonly codedWidth: number;
  readonly colorSpace: VideoColorSpace;
  readonly displayHeight: number;
  readonly displayWidth: number;
  readonly duration: number | null;
  readonly format: VideoPixelFormat | null;
  readonly timestamp: number;
  readonly visibleRect: DOMRectReadOnly | null;
  allocationSize(options?: VideoFrameCopyToOptions): number;
  clone(): VideoFrame;
  close(): void;
  copyTo(destination: BufferSource, options?: VideoFrameCopyToOptions): Promise<PlaneLayout[]>;
}

interface VideoColorSpace {
  readonly fullRange: boolean | null;
  readonly matrix: VideoMatrixCoefficients | null;
  readonly primaries: VideoColorPrimaries | null;
  readonly transfer: VideoTransferCharacteristics | null;
  toJSON(): VideoColorSpaceInit;
}

interface VideoColorSpaceInit {
  fullRange?: boolean | null;
  matrix?: VideoMatrixCoefficients | null;
  primaries?: VideoColorPrimaries | null;
  transfer?: VideoTransferCharacteristics | null;
}

interface VideoFrameCopyToOptions {
  rect?: DOMRectInit;
  layout?: PlaneLayout[];
}

interface PlaneLayout {
  offset: number;
  stride: number;
}

type VideoPixelFormat =
  | 'I420'
  | 'I420A'
  | 'I422'
  | 'I444'
  | 'NV12'
  | 'RGBA'
  | 'RGBX'
  | 'BGRA'
  | 'BGRX';

type VideoMatrixCoefficients = 'rgb' | 'bt709' | 'bt470bg' | 'smpte170m' | 'bt2020-ncl';

type VideoColorPrimaries = 'bt709' | 'bt470bg' | 'smpte170m' | 'bt2020' | 'smpte432';

type VideoTransferCharacteristics =
  | 'bt709'
  | 'smpte170m'
  | 'iec61966-2-1'
  | 'linear'
  | 'pq'
  | 'hlg';
