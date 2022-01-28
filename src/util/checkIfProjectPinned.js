const checkIfProjectPinned = (project, pinnedProjectsList) => {
  const isProjectAlreadyPinned = pinnedProjectsList.findIndex(
    (actionProject) => actionProject.action.id == project
  );

  return isProjectAlreadyPinned !== -1 ? true : false;
};

export default checkIfProjectPinned;
