<template>
    <div class="row">
      <div class="col-lg-4"></div>
      <div class="col-lg-4">
        <div class="card">
          <div class="card-header text-center">
            <h5><b>Thống Kê Khóa Học Được Đánh Giá Tốt Nhất</b></h5>
          </div>
          <div class="card-body">
            <template v-if="hien_chart">
              <Bar id="chart-danh-gia" :options="chartOptions" :data="chartData" />
            </template>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js'
  import { Bar } from 'vue-chartjs'
  import axios from 'axios'
  
  ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend)
  
  export default {
    name: 'ThongKeDanhGia',
    components: {
      Bar
    },
    data() {
      return {
        chartData: {
          labels: [],
          datasets: [{
            label: 'Số lượt đánh giá',
            data: [],
            backgroundColor: ['#ffcc00', '#ff6666', '#66ccff'],
          }]
        },
        chartOptions: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true
            }
          }
        },
        hien_chart: false
      }
    },
    mounted() {
      this.loadChart();
    },
    methods: {
      loadChart() {
        axios
          .get("http://127.0.0.1:8000/api/admin/chart/thong-ke-danh-gia", {
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem("key_admin")
            }
          })
          .then((res) => {
            let danhGia = res.data.labels_x.map((label, index) => ({
              label: label,
              value: res.data.data_x[index]
            }));
            danhGia.sort((a, b) => b.value - a.value);
            danhGia = danhGia.slice(0, 3);
            this.chartData.labels = danhGia.map(item => item.label);
            this.chartData.datasets[0].data = danhGia.map(item => item.value);
            this.hien_chart = true;
          })
          .catch((error) => {
            console.error("Lỗi khi tải dữ liệu thống kê:", error);
          });
      },
    },
  }
  </script>
  