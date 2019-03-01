<template>
  <div>
    <h2>Welcome, Kenneth!</h2>
    <p>Keep it up, you're doing great!</p>
    <div class="chart-area">
      <div class="chart-container">
        <a href="/combined.html">
          <div class="medium-chart chart-wrapper">
            <canvas id="totalProgress" class="chart" data-chart="all"></canvas>
          </div>
        </a>
      </div>
      <div class="chart-container">
        <a href="/combined.html">
          <div class="medium-chart chart-wrapper">
            <canvas class="chart" data-chart="week"></canvas>
          </div>
        </a>
      </div>
      <div class="chart-container">
        <a href="/classes/english.html">
          <div class="medium-chart chart-wrapper">
            <canvas class="chart" data-chart="english"></canvas>
          </div>
        </a>
      </div>
      <div class="chart-container">
        <a href="/classes/math.html">
          <div class="medium-chart chart-wrapper">
            <canvas class="chart" data-chart="math"></canvas>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

var style = getComputedStyle(document.body);
var primaryColor = style.getPropertyValue('--orange');
var dangerColor = style.getPropertyValue('--red');
var successColor = style.getPropertyValue('--success');

async function initCharts() {
  let charts = document.querySelectorAll(".chart");
  for (var chart of charts) {
    let dataSet = chart.dataset.chart;
    try {
      initChart(chart.getContext("2d"), await getData(dataSet));
    } catch (e) {
      console.log(e);
      console.log("Error.");
    }
  }
}

async function getData(className) {
  var url = webpackHotUpdate
    ? "http://localhost:3000/tasks/"
    : "http://taskburner.kennethchristensen.me/api/tasks/";
  var result = await fetch(url + className);
  if (!result.ok) {
    console.log("Error fetching information.");
  }

  var classData = await result.json();

  var total = 0;
  var complete = 0;

  for (var task of classData.tasks) {
    if (task.complete) {
      complete++;
    }

    total++;
  }

  var percent = complete / total;

  return {
    datasets: [
      {
        label: classData.name + " Progress",
        data: [percent, 1 - percent],
        backgroundColor: [successColor, primaryColor]
      }
    ],
    labels: ["Complete", "Incomplete"]
  };
}

function initChart(context, dataset) {
  console.log(context);
  console.log(dataset);
  new Chart(context, {
    type: "pie",
    data: dataset,
    options: {
      title: {
        display: true,
        text: dataset.datasets[0].label,
        fontSize: 24
      },
      maintainAspectRatio: false
    }
  });
}

// window.onload = initCharts;

@Component
export default class Dashboard extends Vue {
  //   @Prop() private msg!: string;
  mounted() {
    initCharts();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
:root {
  --primary-color: var(--orange);
  --accent-color: var(--red);
  --logo-font: "CharBB";
}
.primary-bg {
  background-color: var(--primary-color);
}


.chart-container {
    text-align: center;
    display: inline;
}

.medium-chart {
    width: 400px;
    height: 400px;
    position: relative;
}

.chart-area {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
}

.chart-area a, .chart-container {
    flex: 1 0 auto;
    min-width: 25vw;
    display: flex;
    justify-content: center;
    padding: 20px;
}

.flex-entry {
    display: flex;
    flex-flow: row nowrap;
}

</style>
