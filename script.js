// ===============================
// 1. هيكلة بيانات الطالب (Class & Constructor)
// ===============================
class Student {
  constructor(id, name, grades, attendance) {
    this.id = id;                 // رقم الجلوس
    this.name = name;             // الاسم
    this.grades = grades;         // مصفوفة درجات 3 مواد
    this.attendance = attendance; // نسبة الحضور
  }

  // ===============================
  // 2. دوال التحليل الأكاديمي (Methods)
  // ===============================

  // حساب المتوسط باستخدام reduce
  calculateAverage() {
    const total = this.grades.reduce((sum, grade) => sum + grade, 0);
    return total / this.grades.length;
  }

  // التقدير بالحروف باستخدام if / else
  getGrade(average) {
    if (average >= 90) {
      return "A";
    } else if (average >= 80) {
      return "B";
    } else if (average >= 70) {
      return "C";
    } else if (average >= 60) {
      return "D";
    } else if (average >= 50) {
      return "E";
    } else {
      return "F";
    }
  }

  // النتيجة النهائية: متوسط >= 50 && حضور >= 75
  getFinalResult() {
    const average = this.calculateAverage();
    if (average >= 50 && this.attendance >= 75) {
      return "ناجح";
    } else {
      return "يحتاج مراجعة";
    }
  }
}

// ===============================
// 3. نظام تشغيل الجامعة (Objects Array)
// ===============================
const studentsList = [
  new Student(1001, "أحمد محمد", [90, 85, 95], 90),   // متوسط 90 - ناجح
  new Student(1002, "سارة علي", [45, 42, 48], 80),    // متوسط 45 - متعثرة
  new Student(1003, "محمود حسن", [40, 50, 46], 70),   // متوسط 45.33 - متعثر
  new Student(1004, "منى خالد", [70, 65, 60], 60),    // متوسط 65 - حضور ضعيف
];

// ===============================
// 4. لجنة الرأفة (Array Methods)
// ===============================
const MERCY_POINTS = 5;

// الاستخراج: الطلاب اللي متوسطهم بين 40 و 49
const strugglingStudents = studentsList.filter((student) => {
  const avg = student.calculateAverage();
  return avg >= 40 && avg <= 49;
});

// المعالجة: إضافة 5 درجات رأفة للمتوسط (بدون تعديل الكائنات الأصلية)
const mercyResults = strugglingStudents.map((student) => {
  const originalAverage = student.calculateAverage();
  return {
    id: student.id,
    name: student.name,
    originalAverage: Number(originalAverage.toFixed(2)),
    newAverage: Number((originalAverage + MERCY_POINTS).toFixed(2)),
  };
});

// التحليل: جمع المتوسطات الجديدة باستخدام reduce
const totalNewAverages = mercyResults.reduce(
  (sum, student) => sum + student.newAverage,
  0
);

// متوسط الرأفة مع "درع الحماية" ضد القسمة على صفر
const mercyAverage =
  mercyResults.length === 0 ? 0 : totalNewAverages / mercyResults.length;

// ===============================
// 5. المخرجات (Console Logging)
// ===============================
console.log("===== تقرير نتائج الطلاب =====");
studentsList.forEach((student) => {
  const average = student.calculateAverage();
  console.log(
    `الاسم: ${student.name} | المتوسط: ${average.toFixed(2)} | التقدير: ${student.getGrade(average)} | النتيجة: ${student.getFinalResult()}`
  );
});

console.log("===== الطلاب المتعثرون الذين شملتهم الرأفة =====");
console.log(mercyResults);

console.log("===== متوسط درجات الطلاب المتعثرين بعد التعديل =====");
console.log(mercyAverage.toFixed(2));
