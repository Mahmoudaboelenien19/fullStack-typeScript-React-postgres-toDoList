import React, { useEffect, useState } from "react";
import Options from "./Options";
import { AnimatePresence, motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "../customHooks/reduxTypes";
import { getAllTodos } from "../redux/Taskslice";

import Task from "./Task";

const Tasks: React.FC = () => {
  const { tasks, isChanged } = useAppSelector((state) => state.tasks);
  const disptch = useAppDispatch();
  const [dataShown, setDataShown] = useState(tasks);
  const [option, setOption] = useState("all");

  useEffect(() => {
    disptch(getAllTodos());
    document.title = `to do`;
  }, []);

  useEffect(() => {
    if (option === "all") {
      setDataShown(tasks);
    } else if (option === "pending") {
      setDataShown(tasks?.filter((e) => e.isCompleted === false));
    } else if (option === "completed") {
      setDataShown(tasks?.filter((e) => e.isCompleted === true));
    } else {
      setDataShown(tasks?.filter((e) => e.state === "updated"));
    }
  }, [isChanged, option]);

  return (
    <AnimatePresence mode="wait">
      {tasks.length > 0 ? (
        <motion.div
          className="tasks-cont"
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
          }}
          transition={{ type: "tween", duration: 1, delay: 1.5 }}
          exit={{
            height: 0,
            overflow: "hidden",
            transition: { height: { delay: 3 }, overflow: { delay: 0 } },
          }}
        >
          <>
            <Options setOption={setOption} option={option} />
            <motion.div id="tasks" key={"tasks"}>
              {dataShown.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                    transition: { delay: 0.2, duration: 0.4 },
                  }}
                  className="no-data "
                >
                  no {option} todos to show
                </motion.div>
              ) : (
                dataShown?.map((e, index) => {
                  return <Task key={e._id!} {...e} index={index} />;
                })
              )}
            </motion.div>
          </>
        </motion.div>
      ) : (
        <motion.div
          key={"no-data"}
          initial={{ height: 0 }}
          animate={{
            height: 100,
          }}
          transition={{ delay: 2, duration: 1 }}
          exit={{ height: 0, transition: { delay: 0.5, duration: 1 } }}
          className="no-data"
        >
          <motion.span
            initial={{ opacity: 0, scale: 1 }}
            animate={{
              opacity: 1,
              scale: 1.2,
              transition: {
                delay: 2.5,
                duration: 1,
              },
            }}
            exit={{
              opacity: 0,
              scale: 1,
              transition: {
                duration: 0.5,
              },
            }}
          >
            No todos to show
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Tasks;
