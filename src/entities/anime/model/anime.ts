export interface ImageSet {
  image_url?: string;
  small_image_url?: string;
  large_image_url?: string;
  medium_image_url?: string;
  maximum_image_url?: string;
}

export interface ImageWrappers {
  jpg?: Partial<ImageSet>;
  webp?: Partial<ImageSet>;
}

export interface GenericNamed {
  mal_id?: number;
  type?: string;
  name?: string;
  url?: string;
}

export interface Anime {
  mal_id: number;
  url?: string;
  images?: ImageWrappers;
  trailer?: {
    youtube_id?: string | null;
    url?: string | null;
    embed_url?: string | null;
    images?: Partial<ImageSet>;
  } | null;
  approved?: boolean;
  titles?: { type?: string; title?: string }[];
  title?: string;
  title_english?: string | null;
  title_japanese?: string | null;
  title_synonyms?: string[];
  type?: string | null;
  source?: string | null;
  episodes?: number | null;
  status?: string;
  airing?: boolean;
  aired?: {
    from?: string | null;
    to?: string | null;
    prop?: {
      from?: { day?: number | null; month?: number | null; year?: number | null };
      to?: { day?: number | null; month?: number | null; year?: number | null };
      string?: string | null;
    };
  };
  duration?: string | null;
  rating?: string | null;
  score?: number | null;
  scored_by?: number | null;
  rank?: number | null;
  popularity?: number | null;
  members?: number | null;
  favorites?: number | null;
  synopsis?: string | null;
  background?: string | null;
  season?: string | null;
  year?: number | null;
  broadcast?: {
    day?: string | null;
    time?: string | null;
    timezone?: string | null;
    string?: string | null;
  };
  producers?: GenericNamed[];
  licensors?: GenericNamed[];
  studios?: GenericNamed[];
  genres?: GenericNamed[];
  explicit_genres?: GenericNamed[];
  themes?: GenericNamed[];
  demographics?: GenericNamed[];
  relations?: { relation?: string; entry?: GenericNamed[] }[];
  theme?: { openings?: string[]; endings?: string[] };
  external?: { name?: string; url?: string }[];
  streaming?: { name?: string; url?: string }[];
  staff?: AnimeStaff[] | { data?: AnimeStaff[] } | any;
}

export interface AnimeCharacter {
  character?: {
    mal_id?: number;
    url?: string;
    images?: ImageWrappers;
    name?: string;
  };
  role?: string;
  voice_actors?: {
    person?: {
      mal_id?: number;
      url?: string;
      images?: { jpg?: { image_url?: string; small_image_url?: string } };
      name?: string;
    };
    language?: string;
  }[];
}

export interface AnimePicture {
  images?: { jpg?: { image_url?: string } };
}

export interface AnimeRecommendation {
  entry?: {
    mal_id?: number;
    url?: string;
    images?: ImageWrappers;
    title?: string;
    name?: string;
  };
  votes?: number | null;
  recommendation_count?: number | null;
}

export interface AnimeStaff {
  mal_id?: number;
  person?: {
    mal_id?: number;
    url?: string;
    images?: ImageWrappers;
    name?: string;
  };
  name?: string;
  positions?: string[];
  role?: string;
  image_url?: string;
}
