import { Component, OnInit, Input } from '@angular/core';
import { Renderer } from "./renderer.interface";
import { CQL_AST } from "../../../modules/cql_ast.module";
import { ChartGenerator } from "./chart-generator";

@Component({
    selector: 'line-renderer',
    template: `<div style="width: 100%;height:400px;" [chart]="option"></div>`
})

export class LineRendererComponent implements OnInit, Renderer {
    constructor() { }

    option: any;

    render(cql_ast: CQL_AST, data: any, title?: string): void {
        let chartGen = new ChartGenerator(cql_ast,data);
        let option = {
            title: {
                text: title || ''
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: chartGen.legend
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: chartGen.xAxis
            },
            yAxis: {
                type: 'value'
            },
            series: [ ]
        };
        for(let key in chartGen.series){
            let data = chartGen.series[key];
            option.series.push({
                name: key,
                type: 'line',
                data: data
            });
        }
        this.option = option;
    }

    ngOnInit() { }
}