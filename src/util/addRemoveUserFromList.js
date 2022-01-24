const addRemoveUserFromList = (userId, list, setList) => {
  const isIncluded = list.includes(userId);
  if (isIncluded) {
    setList(list.filter((user) => user !== userId));
  } else {
    setList([...list, userId]);
  }
};

export default addRemoveUserFromList;
