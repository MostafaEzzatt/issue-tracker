import { useState, useEffect } from "react";
import Router from "next/router";

//Assets
import Loading from "../../assets/loading.svg";

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

// Redux
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../redux/features/users/userSlice";

// Firebase / Storage
import { storage, firestore } from "../../firebase";
import { addDoc, collection, doc, setDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import RadioInput from "../../components/form/RadioInput";

const New = () => {
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
  const [disabledForm, setDisabledForm] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const dateInit = new Date();
    const month =
      dateInit.getMonth() + 1 < 10
        ? `0${dateInit.getMonth() + 1}`
        : dateInit.getMonth() + 1;

    const todayDate = `${dateInit.getFullYear()}-${month}-${dateInit.getDate()}`;
    setToday(todayDate.toString());
    setDate(todayDate.toString());

    dispatch(getUsers());
  }, []);

  useEffect(() => {
    setFilteredUsers(users.users);
  }, [users]);

  const handleTitle = (e) => {
    const value = e.target.value.trim();
    setTitle(value);
  };

  const handleDescription = (e) => {
    const value = e.target.value.trim();
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

  const uploadImage = (projectID) => {
    const storageRef = ref(storage, projectID);
    const uploadTask = uploadBytesResumable(storageRef, projectIcon);
    uploadTask.on(
      "state_change",
      (snapshot) => {
        // const prog = Math.round(
        //   (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        // );
        // console.log("PROG ", prog);
      },
      (err) => setError(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          const documnetRef = doc(firestore, "Projects", projectID);
          setDoc(documnetRef, { icon: url }, { merge: true });
        });
      }
    );
  };

  const addProject = async () => {
    if (!manager) return;
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
      state,
    });

    return insertDoc.id;
  };

  const handleSubmit = async () => {
    if ((title.length < 10 || description.length < 10, !manager)) return;

    try {
      const projectId = await addProject();

      if (projectIcon) {
        await uploadImage(projectId);
      }

      Router.push("/dashboard");
    } catch (error) {
      console.log(error);
    }
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
            {disabledForm ? <Loading className="w-6 h-6" /> : "Add Project"}
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
        <DropdownInput list={users.users} setData={setManager} />

        <SectionTitle title="State" />
        <RadioInput list={["open", "close"]} prefix="state" store={setState} />

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

export default New;
