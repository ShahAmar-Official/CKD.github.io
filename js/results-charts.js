const accuracyCtx = document.getElementById("accuracyChart");
const confusionCtx = document.getElementById("confusionChart");

if (accuracyCtx) {
  new Chart(accuracyCtx, {
    type: "bar",
    data: {
      labels: ["Random Forest", "SVM", "Logistic Regression"],
      datasets: [{
        label: "Accuracy (%)",
        data: [94, 91, 88],
        backgroundColor: ["#00aeff", "#6c63ff", "#00c2a8"]
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false } }
    }
  });
}

if (confusionCtx) {
  new Chart(confusionCtx, {
    type: "doughnut",
    data: {
      labels: ["True Positive", "True Negative", "False Positive", "False Negative"],
      datasets: [{
        data: [52, 48, 6, 4],
        backgroundColor: ["#00aeff", "#00c2a8", "#ffb86b", "#ff6b6b"]
      }]
    },
    options: { responsive: true }
  });
}