import React, { useRef, useState } from "react";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import toast from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "../../states/Hooks";
import { sendInvitation } from "../../states/Room";
import style from "../../CSS/modal/Invitation.module.css";

const Invitation = (): React.JSX.Element => {
  const dispatch = useAppDispatch();
  const [emailAddress, setEmailAddress] = useState<string[]>([]);
  const [sending, setSending] = useState<boolean>(false);
  const classId = useAppSelector(
    (state) => state.userInterface.classroomDetail?.classId
  );
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleEmailAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    const value = inputRef.current?.value?.trim() || "";

    if (!value) return;
    if (emailAddress.length >= 10)
      return toast.error("You can invite up to 10 people only.");

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(value)) {
      toast.error("Enter a valid email address.");
      return;
    }

    if (!emailAddress.includes(value)) {
      setEmailAddress([...emailAddress, value]);
      inputRef.current!.value = "";
    } else toast("Already added!");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (emailAddress.length === 0)
      return toast.error("Add at least one email address.");

    if (!classId) return toast.error("Class ID not found.");

    setSending(true);
    const resp = await dispatch(
      sendInvitation({ classId, emails: emailAddress })
    );
    setSending(false);

    if (resp.payload?.success) {
      toast.success("Invitations sent successfully!");
      setEmailAddress([]);
    } else toast.error("Failed to send invitations.");
  };

  const removeMail = (mail: string) =>
    setEmailAddress(emailAddress.filter((m) => m !== mail));

  return (
    <div className={style.wrapper}>
      <div className={style.card}>
        <h1 className={style.heading}>Invite Collaborators</h1>
        <p className={style.subtitle}>
          Share your classroom with others — learning is better together!
        </p>

        <form className={style.form} onSubmit={handleSubmit}>
          <div className={style.inputGroup}>
            <input
              ref={inputRef}
              type="email"
              placeholder="Enter email address"
              className={style.input}
              disabled={sending}
            />
            <button
              onClick={handleEmailAdd}
              className={style.addBtn}
              disabled={emailAddress.length >= 10 || sending}
            >
              Add
            </button>
          </div>

          <Stack
            spacing={{ xs: 1, sm: 2 }}
            direction="row"
            useFlexGap
            flexWrap="wrap"
            className={style.chips}
          >
            {emailAddress.map((email) => (
              <Chip
                key={email}
                label={email}
                onDelete={() => removeMail(email)}
                className={style.chip}
              />
            ))}
          </Stack>

          <button
            type="submit"
            className={style.submitBtn}
            disabled={emailAddress.length === 0 || sending}
          >
            {sending ? "Sending..." : "Send Invitations"}
          </button>
        </form>

        <ul className={style.guidelines}>
          <li>Invite friends or colleagues to join your classroom.</li>
          <li>Enter valid email addresses (e.g., friend@example.com).</li>
          <li>You can invite up to 10 people at once.</li>
        </ul>
      </div>
    </div>
  );
};

export default Invitation;
