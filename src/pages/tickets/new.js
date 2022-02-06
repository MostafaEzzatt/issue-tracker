import { useState, useEffect } from "react";
import Router from "next/router";

// Components
import Layout from "../../components/layout";
import TextInput from "../../components/form/TextInput";
import TextareaInput from "../../components/form/TextareaInput";
import RadioInput from "../../components/form/RadioInput";
import SectionTitle from "../../components/SectionTitle";
import ContentGrid from "../../components/ContentGrid";
import UserBlock from "../../components/user/UserBlock";
import DropdownInput from "../../components/form/DropdownInput";

// Assets
import Loading from "../../assets/loading.svg";

// Util
import getToday from "../../util/getToday";
import getManagerProjects from "../../util/getManagerProjects";

// Redux
import { useSelector } from "react-redux";

// Firebase
import { addDoc, collection, doc } from "firebase/firestore";
import { firestore } from "../../firebase";

// React Toastify
import { toast } from "react-toastify";

// Custom Hooks
import useUserVisitedTicketAction from "../../hooks/useUserVisitedTicketAction";
import useGetAllProjects from "../../hooks/useGetAllProjects";

const New = () => {
  const [project, setProject] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [source, setSource] = useState("");
  const [priority, setPriority] = useState("");
  const [assignedTo, setAssignedTo] = useState([]);
  const [disabledForm, setDisabledForm] = useState(false);
  const [projectsList, setProjectsList] = useState([]);
  const users = useSelector((state) => state.users.users);
  const auth = useSelector((state) => state.auth);
  const { projects, loading, error } = useGetAllProjects();
  const visited = useUserVisitedTicketAction();

  useEffect(() => {
    if (projects.length > 0 && !loading) {
      setProjectsList(getManagerProjects(auth, projects));
    }
  }, [projects, loading, auth]);

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

    const addTicketDocRef = collection(firestore, "Tickets");
    const ticketObject = {
      title,
      description,
      priority,
      createdAt: getToday(),
      author: doc(firestore, "Users", auth.user.uuid),
      project: doc(firestore, "Projects", project.id),
      creation: new Date(),
      source,
    };

    if (assignedTo.length > 0) {
      ticketObject.assignedTo = assignedTo.map((user) =>
        doc(firestore, "Users", user)
      );
    }

    addDoc(addTicketDocRef, ticketObject)
      .then((data) => {
        visited(data, auth);
        toast.success("Ticket Created");
        Router.push("/tickets");
      })
      .catch(() => {
        toast.error(
          "Something Went Wrong While Adding Your Ticket Please Try Again Later"
        );
        setDisabledForm(false);
      });
  };

  return (
    <Layout>
      <div className="mr-10px">
        <div className="flex justify-end">
          <button
            className="rounded bg-dodger-blue px-2 py-1 text-white transition-colors hover:bg-moody-blue disabled:bg-scorpion"
            onClick={handleSubmit}
            disabled={disabledForm}
          >
            {disabledForm ? <Loading className="h-6 w-6" /> : "Add Ticket"}
          </button>
        </div>

        <div className="mb-10px">
          <span className="block text-sm font-medium">Project</span>
          <DropdownInput
            list={projectsList}
            setData={setProject}
            field="title"
            idField="id"
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

export default New;
