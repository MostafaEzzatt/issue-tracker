function getManagerProjects(auth, fetchProjects) {
  const tempProjects = fetchProjects.filter(
    (project) =>
      project.manager.uuid == auth.user.uuid ||
      project.members.findIndex((member) => member.uuid == auth.user.uuid) !==
        -1
  );

  return tempProjects;
}

export default getManagerProjects;
