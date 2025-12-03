export interface ExhibitionDetail {
  seq: string;
  title: string;
  startDate: string;
  endDate: string;
  place: string;
  realmName: string;
  area: string;
  price: string;
  contents1: string;
  url: string;
  phone: string;
  gpsX: string;
  gpsY: string;
  imgUrl: string;
  placeUrl: string;
  placeAddr: string;
  placeSeq: string;
  sigungu: string;
}

export interface ExhibitionDetailBody {
  items: {
    item: ExhibitionDetail;
  };
}

export interface PublicApiExhibitionDetailResponse {
  response: {
    header: {
      resultCode: string;
      resultMsg: string;
    };
    body: ExhibitionDetailBody;
  };
}
