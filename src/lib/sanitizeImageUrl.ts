/** 
 이미지 URL을 정제합니다.
 공공 API에서 중복된 prefix가 포함된 URL을 수정합니다.

 @param url - 정제할 이미지 URL
@returns 정제된 URL 또는 placeholder 이미지 경로

@example
정상적인 URL
sanitizeImageUrl("http://example.com/image.jpg")
→ "http://example.com/image.jpg"

 @example
 중복 prefix가 있는 URL
sanitizeImageUrl("http://www.culture.go.kr/upload/rdf/http://www.kopis.or.kr/image.jpg")
→ "http://www.kopis.or.kr/image.jpg"
 */

const sanitizeImageUrl = (url: string | null | undefined) => {
  if (!url) return "/images/placeholder.svg";

  // http:// 가 2개 이상 있는지 체크
  const matches = url.match(/http:\/\//g);

  if (matches && matches.length >= 2) {
    // 두 번째 http:// 위치 찾기
    const firstIndex = url.indexOf("http://");
    const secondIndex = url.indexOf("http://", firstIndex + 1);

    // 두 번째 http://부터 끝까지 반환
    return url.substring(secondIndex);
  }

  // 정상적인 URL은 그대로 반환
  return url;
};

export default sanitizeImageUrl;
