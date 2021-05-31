import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import * as ApexCharts from 'apexcharts';
import {ChartComponent} from "ng-apexcharts";

@Component({
    selector:'app-home-page',
    templateUrl:"./home-page.component.html",
    styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements AfterViewInit{
    public languages: {img: string, title: string}[];

    @ViewChild('cv',{read:ElementRef}) canvas:ElementRef;
    @ViewChild('app_chart',{read:ChartComponent}) appChart: ChartComponent;

    constructor() {
      this.languages = [
        {img: '/assets/angular_logo.png', title: 'Angular'},
        {img: '/assets/react_logo.png', title: 'React'},
        {img: '/assets/vuejs_logo.png', title: 'Vue JS'},
      ];
    }

    ngAfterViewInit():void{
        const options = {
          series: ['176','163','67','196'],
          chart: {
            height: 350,
            type: 'radialBar',
          },
          plotOptions: {
            radialBar: {
              offsetY: 0,
              startAngle: 0,
              endAngle: 270,
              hollow: {
                margin: 5,
                size: '30%',
                background: 'transparent',
                image: undefined,
              },
              dataLabels: {
                name: {
                  show: false,
                },
                value: {
                  show: false,
                }
              }
            }
          },
          colors: ['#f8bb30', '#6995b8', '#2c2c31', '#ec4545'],
          labels: ['Java','Python','C#','JavaScript'],
          legend: {
            show: true,
            floating: true,
            fontSize: '16px',
            position: 'bottom',
            labels: {
              useSeriesColors: true,
            },
            markers: {
              size: 0
            },
            formatter: function(seriesName, opts) {
              return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex]
            },
            itemMargin: {
              vertical: 3
            }
          },
          responsive: [{
            breakpoint: 480,
            options: {
              legend: {
                show: false
              }
            }
          }]
        };

        Object.entries(options).forEach(([k, v]) => {
           this.appChart[k] = v;
        });
    }
}
