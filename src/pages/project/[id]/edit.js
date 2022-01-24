import { useState, useEffect } from "react";
import { useRouter } from "next/router";

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

const Edit = () => {
  const router = useRouter();
  const { id } = router.query;
  const { project, loading, error: projectError } = useGetProject(id);
  const uploadImage = useUploadImage();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [manager, setManager] = useState(null);
  const [state, setState] = useState(null);
  const [date, setDate] = useState("");
  const [today, setToday] = useState("");
  const [membersFilter, setMembersFilter] = useState("");
  const users = useSelector((state) => state.users);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [projectMembers, setProjectMembers] = useState([]);
  const [projectIcon, setProjectIcon] = useState(null);
  const [projectIconURL, setProjectIconURL] = useState("");
  const [disabledForm, setDisabledForm] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (project) {
      setToday(getToday());
      setTitle(project?.title);
      setDescription(project?.description);
      setDate(project?.timeEstimated);
      setManager(project?.manager);
      setState(project.state);
      setFilteredUsers(users.users);
      const projectMembersId = project.members.map((member) => member.uuid);
      setProjectMembers(projectMembersId);
      setProjectIconURL(project.icon);
    }
  }, [project, users]);

  const addRemoveMemberFromProject = (userId) => {
    const isIncluded = projectMembers.includes(userId);
    if (isIncluded) {
      setProjectMembers(projectMembers.filter((user) => user !== userId));
    } else {
      setProjectMembers([...projectMembers, userId]);
    }
  };

  const handleMembersFilter = (e) => {
    const value = e.target.value;
    setMembersFilter(value);

    if (value) {
      const tempFilteredUser = users.users.filter((user) =>
        user.displayName.toLowerCase().match(`.*${value}.*`)
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

    setDoc(projectDocRef, projectObject, { merge: true }).then(() => {
      setDisabledForm(false);
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

  if (loading) return <Loading />;
  return (
    <Layout>
      <div className="mr-10px">
        <div className="flex justify-end">
          <button
            className="px-2 py-1 rounded bg-dodger-blue hover:bg-moody-blue transition-colors text-white disabled:bg-scorpion"
            onClick={handleSubmit}
            disabled={disabledForm}
          >
            {disabledForm ? (
              <LoadingSVG className="w-6 h-6" />
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

        <SectionTitle title="Manager" />
        <DropdownInput
          list={users.users}
          setData={setManager}
          selectedInput={manager?.displayName}
        />

        <SectionTitle title="State" />
        <RadioInput
          list={["open", "close"]}
          prefix="state"
          store={setState}
          checked={state}
        />

        <SectionTitle title="Members" />
        <TextInput
          label="Filter"
          error=""
          value={membersFilter}
          handleChange={handleMembersFilter}
        />

        <ContentGrid>
          {filteredUsers.length > 0 &&
            filteredUsers.map((user) => (
              <UserBlock
                user={user}
                key={user.uuid}
                addRemove={addRemoveMemberFromProject}
                onList={projectMembers.includes(user.uuid)}
              />
            ))}
        </ContentGrid>
      </div>
    </Layout>
  );
};

export default Edit;
