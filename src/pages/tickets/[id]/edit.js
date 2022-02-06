import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Router from "next/router";

// Assets
import LoadingSVG from "../../../assets/loading.svg";

// Components
import Layout from "../../../components/layout";
import TextInput from "../../../components/form/TextInput";
import TextareaInput from "../../../components/form/TextareaInput";
import RadioInput from "../../../components/form/RadioInput";
import SectionTitle from "../../../components/SectionTitle";
import ContentGrid from "../../../components/ContentGrid";
import UserBlock from "../../../components/user/UserBlock";
import DropdownInput from "../../../components/form/DropdownInput";
import Loading from "../../../components/layout/Loading";

// Custom Hook
import useGetTicket from "../../../hooks/useGetTicket";
import useGetProject from "../../../hooks/useGetProject";
import useGetAllProjects from "../../../hooks/useGetAllProjects";

// Redux
import { useSelector } from "react-redux";

// Firebase
import { doc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { firestore } from "../../../firebase";

// Utils
import getManagerProjects from "../../../util/getManagerProjects";

const Edit = () => {
  const router = useRouter();
  const { id } = router.query;
  const { ticket, loading, error } = useGetTicket(id);
  const {
    project: getProject,
    loading: projectLoading,
    error: projectError,
  } = useGetProject(ticket?.project.id);
  const [project, setProject] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [source, setSource] = useState("");
  const [priority, setPriority] = useState("");
  const [assignedTo, setAssignedTo] = useState([]);
  const [disabledForm, setDisabledForm] = useState(false);
  const users = useSelector((state) => state.users.users);
  const {
    projects,
    loading: ProjectsLoading,
    error: ProjectsError,
  } = useGetAllProjects();
  const auth = useSelector((state) => state.auth);
  const [projectsList, setProjectsList] = useState([]);

  useEffect(() => {
    if (ticket && auth) {
      if (
        auth.user.role !== "manager" &&
        auth.user.uuid !== ticket.author.uuid &&
        auth.user.role !== "admin"
      ) {
        Router.push(`/tickets/${id}`);
      }
    }
  }, [auth, ticket]);

  useEffect(() => {
    if (getProject && projects.length > 0 && !projectLoading) {
      setProject(getProject);
      setTitle(ticket.title);
      setDescription(ticket.description);
      setSource(ticket.source);
      setPriority(ticket.priority);
      setAssignedTo(ticket.assignedTo.map((user) => user.uuid));
      setProjectsList(getManagerProjects(auth, projects));
    }
  }, [getProject, projectLoading, projects]);

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleDescription = (e) => {
    setDescription(e.target.value);
  };

  const handleSource = (e) => {
    setSource(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      title.trim().length < 10 ||
      description.trim().length < 10 ||
      source.trim().length < 5 ||
      !priority ||
      !project
    )
      return;
    setDisabledForm(true);

    const updateTicketDocRef = doc(firestore, "Tickets", id);
    const ticketObject = {
      title,
      description,
      priority,
      project: doc(firestore, "Projects", project.id),
      source,
    };

    if (assignedTo.length > 0) {
      ticketObject.assignedTo = assignedTo.map((user) =>
        doc(firestore, "Users", user)
      );
    }

    setDoc(updateTicketDocRef, ticketObject, { merge: true })
      .then(() => {
        toast.success("Ticket Updated");
        Router.push("/tickets");
      })
      .catch(() => {
        toast.error("Something Went Wrong While Updating The Ticket");
        disabledForm(false);
      });
  };

  if (!router.isFallback) {
    return <Loading />;
  }
  if (loading && projectLoading && !error && !projectError) return <Loading />;
  if ((!loading && !projectLoading && error) || projectError)
    return (
      <Layout>
        <p className="text-scorpion text-center font-bold">
          Something Went Wrong While Fetching This Ticket Data
        </p>
      </Layout>
    );
  return (
    <Layout>
      <div className="mr-10px">
        <div className="flex justify-end">
          <button
            className="bg-dodger-blue hover:bg-moody-blue disabled:bg-scorpion rounded px-2 py-1 text-white transition-colors"
            onClick={handleSubmit}
            disabled={disabledForm}
          >
            {disabledForm ? (
              <LoadingSVG className="h-6 w-6" />
            ) : (
              "Update Ticket"
            )}
          </button>
        </div>

        <div className="mb-10px">
          <span className="block text-sm font-medium">Project</span>
          <DropdownInput
            list={projectsList}
            setData={setProject}
            field="title"
            idField="id"
            selectedInput={project?.title}
          />
        </div>

        <TextInput label="Title" value={title} handleChange={handleTitle} />

        <TextareaInput
          label="Description"
          value={description}
          handleChange={handleDescription}
        />

        <TextInput label="Source" value={source} handleChange={handleSource} />

        <SectionTitle title="Priority" />

        <RadioInput
          list={["low", "normal", "important", "critical"]}
          prefix="priority"
          store={setPriority}
          checked={priority}
        />

        <SectionTitle title="Assigns To" />

        <ContentGrid>
          {users.length > 0 &&
            users.map((user) => (
              <UserBlock
                usersList={assignedTo}
                setUsersList={setAssignedTo}
                key={user.uuid}
                user={user}
              />
            ))}
        </ContentGrid>
      </div>
    </Layout>
  );
};

export default Edit;
