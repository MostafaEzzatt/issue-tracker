const getToday = () => {
  const dateInit = new Date();
  const month =
    dateInit.getMonth() + 1 < 10
      ? `0${dateInit.getMonth() + 1}`
      : dateInit.getMonth() + 1;

  const todayDate = `${dateInit.getFullYear()}-${month}-${dateInit.getDate()}`;

  return todayDate;
};

export default getToday;
