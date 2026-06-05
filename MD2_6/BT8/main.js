async function runTask() {
  try {
    const result = await simulateTask(); // Dùng lại hàm bài 7
    console.log(result);
  } catch (error) {
    console.error("Bắt lỗi:", error);
  }
}
runTask();
