import { useState, useEffect } from "react";
import Router, { useRouter } from "next/router";

// Components
import Layout from "../../../components/layout";
import TextInput from "../../../components/form/TextInput";
import Textarea from "../../../components/form/TextareaInput";
import DateInput from "../../../components/form/DateInput";
import SectionTitle from "../../../components/SectionTitle";
import UserBlock from "../../../components/user/UserBlock";
import ContentGrid from "../../../components/ContentGrid";
import FileUploader from "../../../components/form/FileUploader";
import DropdownInput from "../../../components/form/DropdownInput";
import RadioInput from "../../../components/form/RadioInput";
import Loading from "../../../components/layout/Loading";

// Assets
import LoadingSVG from "../../../assets/loading.svg";

// Custom Hooks
import useGetProject from "../../../hooks/useGetProject";
import useUploadImage from "../../../hooks/useUploadImage";

// Util
import getToday from "../../../util/getToday";

// Redux
import { useSelector } from "react-redux";

// Firebase
import { firestore } from "../../../firebase";
import { doc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";

const Edit = () => {
  const router = useRouter();
  const { id } = router.query;
  const { project, loading: projectLoading, error } = useGetProject(id);
  const uploadImage = useUploadImage();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [manager, setManager] = useState(null);
  const [state, setState] = useState(null);
  const [date, setDate] = useState("");
  const [today, setToday] = useState("");
  const [membersFilter, setMembersFilter] = useState("");
  const [managerList, setManagerList] = useState([]);
  const users = useSelector((state) => state.users);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [projectMembers, setProjectMembers] = useState([]);
  const [projectIcon, setProjectIcon] = useState(null);
  const [projectIconURL, setProjectIconURL] = useState("");
  const [disabledForm, setDisabledForm] = useState(false);
  const auth = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (project && auth.user.role !== "member") {
      setToday(getToday());
      setTitle(project?.title);
      setDescription(project?.description);
      setDate(project?.timeEstimated);
      setManager(project?.manager);
      setState(project.state);
      setFilteredUsers(users.users);
      const projectMembersId = project.members.map((member) => member.uuid);
      setProjectMembers(projectMembersId);
      setProjectIconURL(project.icon || "");
    }
    setManagerList(users.users.filter((user) => user.role == "manager"));

    if (auth.isLoggedIn && auth.user.role == "member") {
      toast.info("Manager And Admin only Can Do This", {
        toastId: "Error Manager Or Admin Can Do The change",
      });
      Router.push(`/project/${id}`);
    } else {
      setLoading(false);
    }
  }, [project, users, auth]);

  const handleMembersFilter = (e) => {
    const value = e.target.value;
    setMembersFilter(value);

    if (value) {
      const tempFilteredUser = users.users.filter((user) =>
        user.displayName.toLowerCase().match(`.*${value.toLowerCase()}.*`)
      );
      setFilteredUsers(tempFilteredUser);
    } else {
      setFilteredUsers(users.users);
    }
  };

  const updateProject = () => {
    const projectDocRef = doc(firestore, "Projects", id);

    const projectObject = {
      title,
      description,
      state,
      icon: projectIconURL,
      manager: doc(firestore, "Users", manager.uuid),
      timeEstimated: date,
      createdAt: project.createdAt,
      members: projectMembers.map((member) => doc(firestore, "Users", member)),
    };

    setDoc(projectDocRef, projectObject, { merge: true })
      .then(() => {
        setDisabledForm(false);
        toast.success("Project Updated", { toastId: "Project Updated" });
        Router.push(`/project/${id}`);
      })
      .catch(() => {
        toast.error("Something Went Wrong While Updating The Project", {
          toastId: "Error While Updating The Project",
        });
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !description || !manager || !state) return;
    setDisabledForm(true);

    updateProject();

    if (projectIcon) {
      uploadImage(id, projectIcon);
    }
  };

  if (projectLoading || loading || router.isFallback) return <Loading />;
  return (
    <Layout>
      <div className="px-3">
        <div className="flex justify-end">
          <button
            className="bg-dodger-blue hover:bg-moody-blue disabled:bg-scorpion rounded px-2 py-1 text-white transition-colors"
            onClick={handleSubmit}
            disabled={disabledForm}
          >
            {disabledForm ? (
              <LoadingSVG className="h-6 w-6" />
            ) : (
              "Update Project"
            )}
          </button>
        </div>
        <TextInput
          label="Title"
          error=""
          value={title}
          handleChange={(e) => setTitle(e.target.value)}
        />

        <Textarea
          label="Description"
          error=""
          value={description}
          handleChange={(e) => setDescription(e.target.value)}
        />

        <FileUploader
          file={projectIcon}
          setFile={setProjectIcon}
          url={projectIconURL}
        />

        <DateInput
          label="Time Estimated"
          error=""
          value={date}
          min={today}
          handleChange={(e) => setDate(e.target.value)}
        />
      </div>

      <div className="mt-8">
        <SectionTitle title="Manager" />
        <div className="px-3">
          <DropdownInput
            list={managerList}
            setData={setManager}
            selectedInput={manager?.displayName}
            field="displayName"
            idField="uuid"
          />
        </div>
      </div>

      <div className="mt-8">
        <SectionTitle title="State" />
        <div className="px-3">
          <RadioInput
            list={["open", "close"]}
            prefix="state"
            store={setState}
            checked={state}
          />
        </div>
      </div>

      <div className="mt-8">
        <SectionTitle title="Members" />
        <div className="px-3">
          <TextInput
            label="Filter"
            error=""
            value={membersFilter}
            handleChange={handleMembersFilter}
          />
        </div>

        <ContentGrid>
          {filteredUsers.length > 0 &&
            filteredUsers.map((user) => (
              <UserBlock
                usersList={projectMembers}
                setUsersList={setProjectMembers}
                user={user}
                key={user.uuid}
              />
            ))}
        </ContentGrid>
      </div>
    </Layout>
  );
};

export default Edit;
