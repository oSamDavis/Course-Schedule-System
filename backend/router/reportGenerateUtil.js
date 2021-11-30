import fsp from "fs/promises";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const formatReport = async (id) => {
  let jsonData;
  try {
    jsonData = await fsp.readFile(
      path.join(__dirname, "reports", id + ".json")
    );
  } catch (e) {
    console.log(e);
    return [];
  }

  var jsonObject = JSON.parse(jsonData);
  let courseRes = [];

  // // taken - grade or WIP  ✅ 🚧 ❌
  for (var i = 0; i < jsonObject.taken.length; i++) {
    if (jsonObject.taken[i].courseGrade === "WIP") {
      courseRes.push({ name: jsonObject.taken[i].courseName, status: "🚧" });
    } else {
      courseRes.push({ name: jsonObject.taken[i].courseName, status: "✅" });
    }
  }

  // honors
  for (var i = 0; i < jsonObject.honors.length; i++) {
    if (jsonObject.honors[i].courseGrade === "WIP") {
      courseRes.push({ name: jsonObject.honors[i].courseName, status: "🚧" });
    } else {
      courseRes.push({ name: jsonObject.honors[i].courseName, status: "✅" });
    }
  }

  // others
  for (var i = 0; i < jsonObject.others.length; i++) {
    if (jsonObject.others[i].courseGrade === "WIP") {
      courseRes.push({ name: jsonObject.others[i].courseName, status: "🚧" });
    } else {
      courseRes.push({ name: jsonObject.others[i].courseName, status: "✅" });
    }
  }

  // not taken
  for (var i = 0; i < jsonObject.notTaken.length; i++) {
    courseRes.push({ name: jsonObject.notTaken[i].courseName, status: "❌" });
  }

  return courseRes;
};

export default formatReport;
