import { useState, useEffect } from "react";
import Router from "next/router";

//Assets
import LoadingSVG from "../../assets/loading.svg";

// Components
import Layout from "../../components/layout";
import TextInput from "../../components/form/TextInput";
import Textarea from "../../components/form/TextareaInput";
import DateInput from "../../components/form/DateInput";
import SectionTitle from "../../components/SectionTitle";
import UserBlock from "../../components/user/UserBlock";
import ContentGrid from "../../components/ContentGrid";
import FileUploader from "../../components/form/FileUploader";
import DropdownInput from "../../components/form/DropdownInput";
import RadioInput from "../../components/form/RadioInput";
import Loading from "../../components/layout/Loading";

// Util
import getToday from "../../util/getToday";
import checkIfAdmin from "../../util/checkIfAdmin";

// Custom Hooks
import useUploadImage from "../../hooks/useUploadImage";

// Redux
import { useSelector } from "react-redux";

// Firebase / Storage
import { firestore } from "../../firebase";
import { addDoc, collection, doc } from "firebase/firestore";

// React Toastify
import { toast } from "react-toastify";

const New = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [manager, setManager] = useState(null);
  const [managerList, setManagerList] = useState([]);
  const [state, setState] = useState(null);
  const [date, setDate] = useState("");
  const [today, setToday] = useState("");
  const [membersFilter, setMembersFilter] = useState("");
  const users = useSelector((state) => state.users);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [projectMembers, setProjectMembers] = useState([]);
  const [projectIcon, setProjectIcon] = useState(null);
  const [disabledForm, setDisabledForm] = useState(false);
  const uploadImage = useUploadImage();
  const auth = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const todayDate = getToday();
    setToday(todayDate);
    setDate(todayDate);
    if (checkIfAdmin(auth)) {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    setFilteredUsers(users.users);
    setManagerList(users.users.filter((user) => user.role == "manager"));
  }, [users]);

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleDescription = (e) => {
    setDescription(e.target.value);
  };

  const handleDate = (e) => {
    setDate(e.target.value);
  };

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

  const addProject = async () => {
    if (!manager || !title || !description || !state) return;

    setDisabledForm(true);
    const collectionRef = collection(firestore, "Projects");
    const usersCollectionList = projectMembers.map((member) =>
      doc(firestore, "Users", member)
    );
    const managerRef = doc(firestore, "Users", manager.uuid);

    const insertDoc = await addDoc(collectionRef, {
      title,
      description,
      members: usersCollectionList,
      manager: managerRef,
      timeEstimated: date,
      createdAt: today,
      creation: new Date(),
      state,
    });

    return insertDoc.id;
  };

  const handleSubmit = async () => {
    if (
      title.length < 10 ||
      description.length < 10 ||
      !manager ||
      auth.user.role !== "admin"
    )
      return;

    try {
      const projectId = await addProject();

      if (projectIcon) {
        uploadImage(projectId, projectIcon);
      }
      toast.success("Project Created");
      Router.push("/dashboard");
    } catch (error) {
      toast.success("Something When Wrong");
      // console.log(error);
    }
  };

  if (loading) return <Loading />;
  return (
    <Layout>
      <div className="mr-10px">
        <div className="flex justify-end">
          <button
            className="rounded bg-dodger-blue px-2 py-1 text-white transition-colors hover:bg-moody-blue disabled:bg-scorpion"
            onClick={handleSubmit}
            disabled={disabledForm}
          >
            {disabledForm ? <LoadingSVG className="h-6 w-6" /> : "Add Project"}
          </button>
        </div>
        <TextInput
          label="Title"
          error=""
          value={title}
          handleChange={handleTitle}
        />

        <Textarea
          label="Description"
          error=""
          value={description}
          handleChange={handleDescription}
        />

        <FileUploader file={projectIcon} setFile={setProjectIcon} />

        <DateInput
          label="Time Estimated"
          error=""
          value={date}
          min={today}
          handleChange={handleDate}
        />

        <SectionTitle title="Manager" />
        <DropdownInput
          list={managerList}
          setData={setManager}
          field="displayName"
          idField="uuid"
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
                usersList={projectMembers}
                setUsersList={setProjectMembers}
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

export default New;
