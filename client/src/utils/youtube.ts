const regex = /youtube\.com.*(\?v=|\/embed\/)(.{11})/;

export function getImageUrlFromYoutube(url: string) {
  var youtube_video_id = url?.match(regex);

  if (youtube_video_id && youtube_video_id.length > 0) {
    return `https://img.youtube.com/vi/${youtube_video_id.pop()}/mqdefault.jpg`;
  }
  return null;
}

export function getEmbedUrlFromYoutube(url: string) {
  var youtube_video_id = url?.match(regex);

  if (youtube_video_id && youtube_video_id.length > 0) {
    return `https://www.youtube.com/embed/${youtube_video_id.pop()}`;
  }
  return null;
}
