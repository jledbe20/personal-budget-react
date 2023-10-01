import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { fetchBudgetData } from '../Data/Data';

function D3PieChart() {
    const ref = useRef();
    const [budgetItems, setBudgetItems] = useState(null);

    useEffect(() => {
        // get budget data via axios (in the Data component)
        fetchBudgetData()
            .then(data => {
                setBudgetItems(data.budget_items);
                console.log("data.budget_items: ", data.budget_items)
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    useEffect(() => {
        if (budgetItems) {
            const width = 500;
            const height = 500;
            const radius = Math.min(width, height) / 2;

            const svg = d3.select(ref.current)
                .attr("width", width)
                .attr("height", height)
                .append("g")
                .attr("transform", `translate(${width / 2},${height / 2})`)

            const color = d3.scaleOrdinal(d3.schemeCategory10);

            const pie = d3.pie().value(d => d.cost);
            const arcs = pie(budgetItems);

            const arcGenerator = d3.arc().innerRadius(0).outerRadius(radius);

            svg.selectAll("path")
                .data(arcs)
                .enter()
                .append("path")
                .attr("d", arcGenerator)
                .attr("fill", (d, i) => color(i));

            svg.selectAll("text")
                .data(arcs)
                .enter()
                .append("text")
                .attr("transform", d => `translate(${arcGenerator.centroid(d)})`)
                .text(d => d.data.item)
                .style("text-anchor", "middle")
                .style("font-size", 14);
                
        }
    }, [budgetItems]);

    if (!budgetItems) {
        return <div>Loading...</div>;
    }

    return (
        <div className="chartDiv" style={{ width: 650, textAlign: "center" }}>
            <h1 style={{ fontFamily: "monospace" }}>
                Budget Distribution
            </h1>
            <svg ref={ref}></svg>
        </div>
    );
}

export default D3PieChart;