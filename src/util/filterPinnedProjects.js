const filterPinnedProjects = (actionsList) => {
  const projects = actionsList.filter(
    (project) => project.type == "PINNED-PROJECT"
  );

  return projects;
};

export default filterPinnedProjects;
