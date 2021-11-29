import fs from "fs";
import fsp from "fs/promises";
import PDFParser from "pdf2json";
import path from "path";

import geneds from "./catalog-files/geneds.json";
import csDegree from "./catalog-files/csDegree.json";
import mainHonors from "./catalog-files/mainHonors.json"

const COURSENUMBER = "CourseNumberTitleCRTypeGradeRptHrsErnHrsGpaQualPtsGPAHrsAtt",
    PAGELINE = "Page",
    TERMTOTALS = "TermTotals:",
    ACADEMICYEAR = "AcademicYear",
    DEGREEINFORMATION = "DegreeInformation:"

const LenAcademicYear = ACADEMICYEAR.length;

function cleanUp(lines) {
    var cleaned = {
        id: 0,
        courses: []
    };
    cleaned.id = lines[0].slice(3);

    var i = 1;
    var foundTermTotal = true;

    while (lines[i] !== COURSENUMBER) {
        i++;
    }
    i++;

    while (lines[i] !== DEGREEINFORMATION) {

        if (foundTermTotal && lines[i].slice(9, 9 + LenAcademicYear) === ACADEMICYEAR) {
            foundTermTotal = false;
            i++;
        } else if (lines[i].slice(lines[i].length - 11) === TERMTOTALS) {
            // if the line is a termtotal, skip until another academicyear + 1
            while (lines[i].slice(9, 9 + LenAcademicYear) !== ACADEMICYEAR) {
                i++;
            }
            // this is the end of a semester
            foundTermTotal = true;
        } else if (lines[i].slice(0, 4) === PAGELINE) {
            // if the line is a page, skip until academicyear+1
            while (lines[i].slice(9, 9 + LenAcademicYear) !== ACADEMICYEAR) {
                i++;
            }
            i++;
        } else {
            // add
            cleaned.courses.push(lines[i]);
            i++
        }
    }

    return cleaned;
}

function extractCoursesAndGrade(lines) {
    var cleaned = cleanUp(lines);
    var json = {
        studentId: cleaned.id,
        coursesAndGrade: []
    }

    cleaned.courses.forEach(course => {
        // check for two changes
        var i = 0;
        var courseId = "", courseGrade = "WIP";

        while (!(course[i] >= '0' && course[i] <= '9')) { // while not number
            i++;
        }
        courseId = course.slice(0, i + 3);
        i += 3;

        while (!(course[i] >= '0' && course[i] <= '9')) { // while not number
            i++;
        }
        i--;

        if (course.slice(i - 2, i + 1) == "WIP") {
            courseGrade = "WIP";
        } else {
            courseGrade = course[i];
        }

        json.coursesAndGrade.push({ courseId: courseId, courseGrade: courseGrade });
    });

    return json;
}

function getJsonFromPdf(filePath, resultFileDir, ) {
    const pdfParser = new PDFParser(this, 1);
    pdfParser.on("pdfParser_dataError", errData => console.error(errData.parserError));
    pdfParser.on("pdfParser_dataReady", pdfData => {

        // get text
        var lines = [];
        var pdfStr = pdfParser.getRawTextContent();
        var temp = "";
        for (var i = 0; i < pdfStr.length; i++) {
            if (pdfStr[i] != "\n")
                temp += pdfStr[i];
            else {
                lines.push(temp.replace(/\s/g, ''));
                temp = "";
            }
        }

        // convert to json using another procedure
        var fileJson = extractCoursesAndGrade(lines);

        var report = generateSingleReport(fileJson);

        // write to resultFile
        fsp.writeFile(
            path.join(resultFileDir, fileJson.studentId + ".json"),
            JSON.stringify(report),
            'utf8'
        );
    });

    pdfParser.loadPDF(filePath);
}

function generateSingleReport(transcript) {

    // honors map
    var honorsCourses = new Map();
    mainHonors.forEach(course => {
        honorsCourses.set(course.courseId, 1);
    });

    // student course map and check is student is an honors student
    var studentCourses = new Map(), isHonors = false;
    transcript.coursesAndGrade.forEach(course => {
        studentCourses.set(course.courseId, course.courseGrade);
        if (honorsCourses.has(course.courseId)) {
            isHonors = true;
        }
    });

    // combining all geneds and cs courses into one
    var allCourses = new Map();
    geneds.forEach(course => {
        allCourses.set(course.courseId, 1);
    });
    csDegree.forEach(course => {
        allCourses.set(course.courseId, 1);
    });
    mainHonors.forEach(course => {
        allCourses.set(course.courseId, 1);
    });

    // analysis
    var taken = [], notTaken = [], honors = [], others = [];

    geneds.forEach(course => {
        if (studentCourses.has(course.courseId)) {
            taken.push({ courseId: course.courseId, courseGrade: studentCourses.get(course.courseId) });
        } else if (honorsCourses.has(course.honorsEqual)) { // this course has a honors equal
            honors.push({ courseId: course.honorsEqual, courseGrade: studentCourses.get(course.honorsEqual) });
        } else {
            notTaken.push({ courseId: course.courseId, courseGrade: "N/A" });
        }
    });

    csDegree.forEach(course => {
        if (studentCourses.has(course.courseId)) {
            taken.push({ courseId: course.courseId, courseGrade: studentCourses.get(course.courseId) });
        } else {
            notTaken.push({ courseId: course.courseId, courseGrade: "N/A" });
        }
    });

    transcript.coursesAndGrade.forEach(course => {
        if (!allCourses.has(course.courseId)) {
            others.push(course);
        }
    });

    return {
        studentId: transcript.studentId,
        taken: taken,
        honors: honors,
        others: others,
        notTaken: notTaken
    }
}

function generateManyReports(transcripts) {
    var reports = [];
    transcripts.forEach(transcript => {
        reports.push(generateSingleReport(transcript));
    });
    return reports;
}

export { getJsonFromPdf, generateSingleReport, generateManyReports };