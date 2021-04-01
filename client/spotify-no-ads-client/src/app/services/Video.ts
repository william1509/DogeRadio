export interface ViewCount {
    text: string;
    short: string;
}
export interface Thumbnail {
    url: string;
    width: number;
    height: number;
}
export interface DescriptionSnippet {
    text: string;
}
export interface Thumbnail2 {
    url: string;
    width: number;
    height: number;
}
export interface Channel {
    name: string;
    id: string;
    thumbnails: Thumbnail2[];
    link: string;
}
export interface Accessibility {
    title: string;
    duration: string;
}
export interface Video {
    type: string;
    song_id: string;
    title: string;
    publishedTime: string;
    duration: string;
    viewCount: ViewCount;
    thumbnails: Thumbnail[];
    descriptionSnippet: DescriptionSnippet[];
    channel: Channel;
    accessibility: Accessibility;
    link: string;
    shelfTitle: string;
}

