function simulateTask() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const success = true; // Đổi thành false để test lỗi
      if (success) resolve("Task Completed!");
      else reject("Lỗi xảy ra!");
    }, 2000);
  });
}

simulateTask()
  .then((msg) => console.log(msg))
  .catch((err) => console.error(err));
