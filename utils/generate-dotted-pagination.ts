export function generateDottedPages({
                                      page = 1,
                                      totalPages,
                                      radius = 2,
                                      dotRepresentation = "...",
                                    }: GenerateDottedPagesParams): PageListType {
  const first = 1;
  const last = totalPages;

  if (first >= totalPages) return [1];

  const middle = generateMiddle({
    page,
    totalPages,
  });
  const { afterDots, beforeDots } = generateDots({
    middle,
    totalPages,
  });

  function generateMiddle({ page, totalPages }: GenerateMiddleParams) {
    let middle = [];

    for (let i = page - radius; i <= page; i++)
      if (i < totalPages && i > 1) middle.push(i); // append if number is greater than 1 but less that page & totalPages

    for (let i = page + 1; i <= page + radius; i++)
      if (i < totalPages) middle.push(i); // append if number is greater than page but less than totalPages

    return middle;
  }

  function generateDots({ middle, totalPages }: GenerateDotsParams) {
    const middleLen = middle.length;
    let beforeDots: PageListType = [],
      afterDots: PageListType = [];

    if (middle[0] > first + 1) beforeDots = [dotRepresentation]; // if middle starts from number > 2
    if (middle[middleLen - 1] < totalPages - 1) afterDots = [dotRepresentation]; // if middle ends with number < totalPages

    return { beforeDots, afterDots };
  }

  return [first, ...beforeDots, ...middle, ...afterDots, last];
}

type GenerateDottedPagesParams = {
  totalPages: number;
  radius?: number;
  page?: number;
  dotRepresentation?: string;
};

type GenerateDotsParams = {
  middle: PageListType;
  totalPages: number;
};

type GenerateMiddleParams = {
  page: number;
  totalPages: number;
};

type PageListType = Array<string | number>;
