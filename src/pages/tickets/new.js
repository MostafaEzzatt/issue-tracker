import { useState } from "react";
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

// Redux
import { useSelector } from "react-redux";

// Firebase
import { addDoc, collection, doc } from "firebase/firestore";
import { firestore } from "../../firebase";

// React Toastify
import { toast } from "react-toastify";

const New = () => {
  const [project, setProject] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [source, setSource] = useState("");
  const [priority, setPriority] = useState("");
  const [assignedTo, setAssignedTo] = useState([]);
  const [disabledForm, setDisabledForm] = useState(false);
  const users = useSelector((state) => state.users.users);
  const auth = useSelector((state) => state.auth);
  const projects = useSelector((state) => state.projects);

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
      source,
    };

    if (assignedTo.length > 0) {
      ticketObject.assignedTo = assignedTo.map((user) =>
        doc(firestore, "Users", user)
      );
    }

    addDoc(addTicketDocRef, ticketObject)
      .then(() => {
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
            className="px-2 py-1 rounded bg-dodger-blue hover:bg-moody-blue transition-colors text-white disabled:bg-scorpion"
            onClick={handleSubmit}
            disabled={disabledForm}
          >
            {disabledForm ? <Loading className="w-6 h-6" /> : "Add Ticket"}
          </button>
        </div>

        <div className="mb-10px">
          <span className="font-medium text-sm block">Project</span>
          <DropdownInput
            list={projects.data}
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
