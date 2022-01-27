function getMemberProjects(auth, fetchProjects) {
  const tempProjects = fetchProjects.filter(
    (project) =>
      project.members.findIndex((member) => member.uuid == auth.user.uuid) !==
      -1
  );

  return tempProjects;
}

export default getMemberProjects;
