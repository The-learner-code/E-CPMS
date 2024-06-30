import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

async function fetchPlacedStudents() {
  const studentsRef = collection(db, 'PlacedStudents');
  const querySnapshot = await getDocs(studentsRef);
  const student = querySnapshot.docs.map(doc => doc.data());
  console.log("Fetched students data:", student); // Add this line
  return student;
};

function generateReports(student) {
  const byBatch = {};
  const byDepartment = {};
  const byCompany = {};

  student.forEach(student => {
    const { sbatch: batch, department, company_name } = student;

    // By Batch
    if (!byBatch[batch]) {
      byBatch[batch] = 0;
    }
    byBatch[batch] += 1;

    // By Department
    if (!byDepartment[department]) {
      byDepartment[department] = 0;
    }
    byDepartment[department] += 1;

    // By Company
    if (!byCompany[company_name]) {
      byCompany[company_name] = 0;
    }
    byCompany[company_name] += 1;
  });

  console.log("Generated reports:", { byBatch, byDepartment, byCompany }); // Add this line
  return { byBatch, byDepartment, byCompany };
};


export const getPlacedStudents = async () => {
  const querySnapshot = await getDocs(collection(db, 'PlacedStudents'));
  const placedStudents = [];
  querySnapshot.forEach((doc) => {
    placedStudents.push(doc.data());
  });
  return placedStudents;
};

export const processPlacedStudentsData = (data, batch) => {
  const departments = [...new Set(data.map((student) => student.department))];
  const totalStudents = data.filter((student) => student.sbatch === batch).length;

  const departmentCounts = departments.map((department) => {
    const count = data.filter((student) => student.department === department && student.sbatch === batch).length;
    return {
      department,
      count,
      percentage: ((count / totalStudents) * 100).toFixed(2),
    };
  });

  return departmentCounts;
};

export const getDistinctBatches = async () => {
  const querySnapshot = await getDocs(collection(db, 'PlacedStudents'));
  const batches = new Set();
  querySnapshot.forEach((doc) => {
    batches.add(doc.data().sbatch);
  });
  return Array.from(batches);
};

export { fetchPlacedStudents, generateReports }; 