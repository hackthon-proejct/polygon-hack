export function getImageUrlFromYoutube(url: string) {
  var youtube_video_id = url.match(/youtube\.com.*(\?v=|\/embed\/)(.{11})/);

  if (youtube_video_id && youtube_video_id.length > 0) {
    return `//img.youtube.com/vi/${youtube_video_id.pop()}/mqdefault.jpg`;
  }
  return null;
}
