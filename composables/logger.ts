/* eslint-disable no-console */
const styles = `
  font-weight: bold;
  background-color: #39e26c;
  color: black;
  border-radius: 6px;
  padding: 2px 5px;
  padding-top: 4px;
`;

const infoStyles = `
  font-weight: bold;
  background-color: #3977e2;
  color: black;
  border-radius: 6px;
  padding: 2px 5px;
  padding-top: 4px;
`;

const errorStyles = `
  font-weight: bold;
  background-color: #e23939;
  color: black;
  border-radius: 6px;
  padding: 2px 5px;
  padding-top: 4px;
`;

export const logger = {
  log: (msg: string | any, module = "Talker") => {
    console.log("%c%s", styles, module, msg);
  },
  info: (msg: string) => {
    console.info("%cTalker", infoStyles, msg);
  },
  error: (msg: string) => {
    console.error("%cTalker", errorStyles, msg);
  },
};
