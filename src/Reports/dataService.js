// Importing Firestore functions and db configuration
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

// Function to fetch placed students from Firestore
async function fetchPlacedStudents() {
  const studentsRef = collection(db, 'PlacedStudents'); // Reference to 'PlacedStudents' collection
  const querySnapshot = await getDocs(studentsRef); // Fetching documents from the collection
  const student = querySnapshot.docs.map(doc => doc.data()); // Mapping document data to an array
  console.log("Fetched students data:", student); // Logging fetched data
  return student;
}

// Function to generate reports based on fetched student data
function generateReports(student) {
  const byBatch = {}; // Object to store students count by batch
  const byDepartment = {}; // Object to store students count by department
  const byCompany = {}; // Object to store students count by company

  student.forEach(student => {
    const { sbatch: batch, department, company_name } = student; // Destructuring student data

    // By Batch
    if (!byBatch[batch]) {
      byBatch[batch] = 0;
    }
    byBatch[batch] += 1; // Incrementing count for the batch

    // By Department
    if (!byDepartment[department]) {
      byDepartment[department] = 0;
    }
    byDepartment[department] += 1; // Incrementing count for the department

    // By Company
    if (!byCompany[company_name]) {
      byCompany[company_name] = 0;
    }
    byCompany[company_name] += 1; // Incrementing count for the company
  });

  console.log("Generated reports:", { byBatch, byDepartment, byCompany }); // Logging generated reports
  return { byBatch, byDepartment, byCompany };
}

// Function to get placed students from Firestore
export const getPlacedStudents = async () => {
  const querySnapshot = await getDocs(collection(db, 'PlacedStudents')); // Fetching documents from 'PlacedStudents' collection
  const placedStudents = [];
  querySnapshot.forEach((doc) => {
    placedStudents.push(doc.data()); // Pushing document data to array
  });
  return placedStudents;
};

// Function to process placed students data
export const processPlacedStudentsData = (data, batch) => {
  const departments = [...new Set(data.map((student) => student.department))]; // Extracting unique departments
  const totalStudents = data.filter((student) => student.sbatch === batch).length; // Counting total students in a batch

  const departmentCounts = departments.map((department) => {
    const count = data.filter((student) => student.department === department && student.sbatch === batch).length;
    return {
      department,
      count,
      percentage: ((count / totalStudents) * 100).toFixed(2), // Calculating percentage of students per department
    };
  });

  return departmentCounts;
};

// Function to get distinct batches from Firestore
export const getDistinctBatches = async () => {
  const querySnapshot = await getDocs(collection(db, 'PlacedStudents')); // Fetching documents from 'PlacedStudents' collection
  const batches = new Set();
  querySnapshot.forEach((doc) => {
    batches.add(doc.data().sbatch); // Adding batch to set to ensure uniqueness
  });
  return Array.from(batches); // Converting set to array
};

export { fetchPlacedStudents, generateReports };
