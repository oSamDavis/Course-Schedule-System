const csDegree= [
    {
      "courseId": "CSCI-143",
      "courseName": "Applied Computer Science",
      "prerequisite": [],
      "consent": false
    },
    {
      "courseId": "CSCI-123",
      "courseName": "Programming I",
      "prerequisite": ["CSCI-103"],
      "consent": true
    },
    {
      "courseId": "CSCI-153",
      "courseName": "Programming II",
      "prerequisite": ["CSCI-123"],
      "consent": true
    },
    {
      "courseId": "CSCI-203",
      "courseName": "Data Structures",
      "prerequisite": [],
      "consent": false
    },
    {
      "courseId": "CSCI-243",
      "courseName": "Object-Oriented Programming",
      "prerequisite": ["CSCI-123", "CSCI-153"],
      "consent": false
    }, 
    {
     "courseId": "CSCI-202",
     "courseName": "Internet Resources-Hybrid",
     "prerequisite": [],
     "consent": false
   },
    {
      "courseId": "CSCI-223",
      "courseName": "Introduction to Computer System",
      "prerequisite": ["CSCI-123"],
      "consent": false
    },
    {
      "courseId": "CSCI-303",
      "courseName": "Operating Systems",
      "prerequisite": ["CSCI-203", "CSCI-233", "Consent"],
      "consent": false
    },
    {
      "courseId": "CSCI-333",
      "courseName": "Computer Organization I",
      "prerequisite": ["CSCI-223"],
      "consent": false
    },
    {
      "courseId": "CSCI-353",
      "courseName": "Software Engineering",
      "prerequisite": ["CSCI-303"],
      "consent": false
    },
    {
      "courseId": "CSCI-323",
      "courseName": "Algorithm Analysis and Design",
      "prerequisite": [],
      "consent": false
    },
    {
      "courseId": "CSCI-413",
      "courseName": "Networking",
      "prerequisite": ["CSCI-303", "CSCI-333"],
      "consent": false
    },
    {
      "courseId": "CSCI-433",
      "courseName": "Programming Languages",
      "prerequisite": ["CSCI-303"],
      "consent": false
    },
    {
      "courseId": "CSCI-403",
      "courseName": "Introduction to Database",
      "prerequisite": [],
      "consent": false
    },
    {
      "courseId": "CSCI-453",
      "courseName": "Computer Science Research",
      "prerequisite": ["Senior standing and completion of all core courses below the 400 level"],
      "consent": false
    },
    {
      "courseId": "CSCI-473",
      "courseName": "Computer Security and Privacy",
      "prerequisite": ["CSCI-303", "CSCI-353", "MTH-353"],
      "consent": false
    },
    {
      "courseId": "CSCI-463",
      "courseName": "CS Capstone Project",
      "prerequisite": ["CSCI-353"],
      "consent": false
    },
    {
      "courseId": "MTH-215",
      "courseName": "Calculus I",
      "prerequisite": ["MTH-143","appropriate score on Placement Test"],
      "consent": true 
    },
    {
      "courseId": "MTH-225",
      "courseName": "Calculus II",
      "prerequisite": ["MTH-215"],
      "consent": false
    },
    {
      "courseId": "MTH-353",
      "courseName": "Discrete Mathematics",
      "prerequisite": ["MTH-133"],
      "consent": false
    },
    {
      "courseId": "MTH-303",
      "courseName": "Linear Algebra",
      "prerequisite": ["MTH-143"],
      "consent": false
    },
    {
      "courseId": "MTH-133",
      "courseName": "College Algebra",
      "prerequisite": ["MTH-114", "ACT Score of 19"],
      "consent": false
    },
    {
      "courseId": "MTH-143",
      "courseName": "College Trigonometry",
      "prerequisite": ["MTH-133"],
      "consent": false
    },
    {
      "courseId": "CHM-134",
      "courseName": "College Chemistry I",
      "prerequisite": [],
      "consent": false
    },
    {
      "courseId": "CHM-144",
      "courseName": "College Chemistry II",
      "prerequisite": [],
      "consent": false
    },
    {
      "courseId": "PHY-214",
      "courseName": "General Physics I",
      "prerequisite": ["MTH-133", "MTH-143"],
      "consent": false
    },
    {
      "courseId": "PHY-224",
      "courseName": "General Physics II",
      "prerequisite": ["MTH-133", "MTH-143"],
      "consent": false
    }
   ]

   export default csDegree