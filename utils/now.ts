import dayjs from "dayjs";

const now = () => dayjs().add(9, "hour").toDate();

export default now;
