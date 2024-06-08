import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const DistributionChart = ({ data }) => {
  const svgRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current).attr('width', 600).attr('height', 400);

    const margin = { top: 20, right: 30, bottom: 40, left: 40 };
    const width = +svg.attr('width') - margin.left - margin.right;
    const height = +svg.attr('height') - margin.top - margin.bottom;

    const x = d3
      .scaleBand()
      .domain(data.map((d) => d.id))
      .range([0, width])
      .padding(0.1);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.distributedAmount)])
      .nice()
      .range([height, 0]);

    const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

    g.append('g')
      .attr('class', 'axis axis--x')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x));

    g.append('g').attr('class', 'axis axis--y').call(d3.axisLeft(y).ticks(10));

    g.selectAll('.bar')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', (d) => x(d.id))
      .attr('y', (d) => y(d.distributedAmount))
      .attr('width', x.bandwidth())
      .attr('height', (d) => height - y(d.distributedAmount));
  }, [data]);

  return <svg ref={svgRef}></svg>;
};

export default DistributionChart;
