export interface RawExhibitionItem {
  seq: string;
  title: string;
  place: string;
  startDate: string;
  endDate: string;
  realmName: string;
  thumbnail: string;
  area: string;
  sigungu: string;
  gpsY: string;
  gpsX: string;
}

export interface ExhibitionBody {
  items: {
    item: RawExhibitionItem | RawExhibitionItem[];
  };
  numOfrows: string;
  pageNo: string;
  totalCount: string;
}

export interface PublicApiExhibitionResponse {
  response: {
    header: {
      resultCode: string;
      resultMsg: string;
    };
    body: ExhibitionBody;
  };
}
