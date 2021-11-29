import express from "express";

const router = express.Router();
import request from "request";

router.route("/").get((req, res, next) => {
  var data = {
    template: { shortid: "rkJTnK2ce" },
    data: {
      number: "1",
      student: {
        name: "Sam Davis Omekara",
        major: "Computer Science",
        graduation: "May, 2022",
        id: "97457",
      },
      courses: [
        {
          name: "Programming I",
          status: "✅",
        },
        {
          name: "Programming II",
          status: "❌",
        },
        {
          name: "Calculus I",
          status: "🚧",
        },
        {
          name: "Calculus II",
          status: "❌",
        },
        {
          name: "Applied Computer Science",
          status: "✅",
        },
        {
          name: "Object Oriented Programming",
          status: "🚧",
        },
      ],
    },
    // options: {
    //   preview: false,
    // },
  };
  var options = {
    uri: "http://localhost:8001/api/report",
    method: "POST",
    json: data,
  };


  request(options).pipe(res);
});

export default router;
