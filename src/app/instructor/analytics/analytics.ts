import { AfterViewInit, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './analytics.html',
  styleUrls: ['./analytics.css']
})
export class Analytics implements AfterViewInit {

  constructor() {}

  ngAfterViewInit(): void {

    this.loadRevenueChart();
    this.loadEnrollmentChart();
    this.loadQuizChart();

  }

  // ==========================
  // Revenue Line Chart
  // ==========================

  loadRevenueChart() {

    new Chart('revenueChart', {

      type: 'line',

      data: {

        labels: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug'
        ],

        datasets: [

          {

            label: 'Revenue (₹)',

            data: [
              12000,
              18000,
              25000,
              23000,
              31000,
              42000,
              39000,
              52000
            ],

            borderColor: '#2563eb',

            backgroundColor: 'rgba(37,99,235,0.15)',

            fill: true,

            tension: .4,

            borderWidth: 3,

            pointRadius: 5,

            pointHoverRadius: 7

          }

        ]

      },

      options: {

        responsive: true,

        plugins: {

          legend: {

            display: true

          }

        }

      }

    });

  }

  // ==========================
  // Enrollment Chart
  // ==========================

  loadEnrollmentChart() {

    new Chart('enrollmentChart', {

      type: 'bar',

      data: {

        labels: [

          'Angular',

          'Java',

          'Spring',

          'React',

          'Python'

        ],

        datasets: [

          {

            label: 'Students',

            data: [

              420,

              355,

              275,

              190,

              310

            ],

            backgroundColor: [

              '#2563eb',

              '#10b981',

              '#f59e0b',

              '#8b5cf6',

              '#ef4444'

            ],

            borderRadius: 10

          }

        ]

      },

      options: {

        responsive: true,

        plugins: {

          legend: {

            display: false

          }

        }

      }

    });

  }

  // ==========================
  // Quiz Performance
  // ==========================

  loadQuizChart() {

    new Chart('quizChart', {

      type: 'doughnut',

      data: {

        labels: [

          'Passed',

          'Failed',

          'Absent'

        ],

        datasets: [

          {

            data: [

              78,

              14,

              8

            ],

            backgroundColor: [

              '#10b981',

              '#ef4444',

              '#f59e0b'

            ],

            hoverOffset: 12

          }

        ]

      },

      options: {

        responsive: true,

        plugins: {

          legend: {

            position: 'bottom'

          }

        }

      }

    });

  }

}