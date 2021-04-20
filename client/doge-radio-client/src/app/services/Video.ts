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

export function ParseToVideo(object: any): Video {
    return {type: 'video', song_id: object['song_id'], title: object['title'], publishedTime: object['publishedtime'], 
            duration: object['duration'], viewCount: {text: object['viewcount_long'], short: object['viewcount_short']}, 
            thumbnails: [{url: object['thumbnail_url'], width: 0, height: 0}], 
            descriptionSnippet: [{text: object['description']}],
            channel: {name: "", id: object['channel_id'], thumbnails: [{url: "", width: 0, height: 0}], link: ""},
            accessibility: {title: "", duration: ""}, link: "", shelfTitle: ""};
}



