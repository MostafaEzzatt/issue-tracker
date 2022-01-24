const calcEstimatedDays = (createdAt, endAt) => {
  const createdAtArray = createdAt.split("-");
  const createdAtYear = +createdAtArray[0];
  const createdAtMonth = +createdAtArray[1];
  const createdAtDay = +createdAtArray[2];

  const endAtArray = endAt.split("-");
  const endAtYear = +endAtArray[0];
  const endAtMonth = +endAtArray[1];
  const endAtDay = +endAtArray[2];

  const calcYear = createdAtYear - endAtYear;
  const calcMonth = endAtMonth - createdAtMonth;
  const calcDay = endAtDay - createdAtDay;
  let output = [];

  if (calcYear > 0) {
    output.push(calcYear > 1 ? `${calcYear} Years` : "${calcYear} Year");
  }
  if (calcMonth > 0) {
    output.push(`${calcMonth} Month`);
  }

  if (calcDay > 0) {
    output.push(calcDay > 1 ? `${calcDay} Days` : "${calcYear} Day");
  }

  return output.join(" ");
};

export default calcEstimatedDays;
