import s from "./mainpage.module.scss";

import Tasklist from '@/components/tasklist/Tasklist';

function Main() {
  return (
    <div className={`${s.customClass}`}>
      <Tasklist />
    </div>
  );
}

export default Main;
