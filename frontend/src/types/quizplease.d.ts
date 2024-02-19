export type TQuizPleaseOption = {
  id?: number;
  correct?: boolean;
  value?: number;
  image?: string;
  text?: string;
  pair?: string;
  text_answer?: string;
  image_answer?: string;
};

// export type TQuizPleaseOptionCompare = {

// };

export type TQuestionType = 'match' | 'simple';

export type TQuizPleaseQuestion = {
  _id?: number;
  title?: string;
  options: TQuizPleaseOption[];
  text?: string;
  subtext?: string;
  images_answer?: string[];
  text_answer?: string;
  order?: number;
  type: string;
  images?: string[];
  need_pairs?: number;
};

export type TQuizPleaseResult = {
  title?: string;
  subtitle?: string;
  text?: string;
  image?: string;
  maxvalue?: number;
  minvalue?: number;
};

export type TQuizPleaseType = 'test' | 'step-by-step';

export type TQuizPlease = {
  [key: string]: {
    _id?: number;
    slug: string;
    name: string;
    background_image?: string;
    questions: TQuizPleaseQuestion[];
    type: TQuizPleaseType;
    color?: string;
    text_before?: string;
    text_after?: string;
    order?: number;
    result?: TQuizPleaseResult[];
  };
};
