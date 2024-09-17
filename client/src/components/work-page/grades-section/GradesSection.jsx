import '../../text-styling/text-styling.scss'
import './GradesSection.scss'
import GradesData from '../../../data/grades.json'
import RadarChart from './RadarChart'
import { useState, useEffect } from "react";


function GradeSection(params) {

    const [chartData, setChartData] = useState({
        labels: ['Grade 5', 'Grade 4', 'Grade 3'],  // Labels are consistent across charts
        datasets: []  // Initialize datasets as empty
    });

    // On component mount, populate the chart data
    useEffect(() => {
        const datasets = GradesData.map((gradeObj) => ({
            label: `Grade distribution (${gradeObj.course_code})`,
            data: gradeObj.grade_distribution,
            fill: true,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgb(255, 99, 132)',
            pointBackgroundColor: '#fff',
            pointBorderColor: 'rgb(255, 99, 132)',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgb(255, 99, 132)'
        }));

        // Set the chart data with labels and datasets
        setChartData((prevData) => ({
            ...prevData,  // Keep the existing labels
            datasets: datasets  // Update datasets
        }));
    }, []);  // Empty dependency array ensures this runs once

    return (
        
        <div className='GradesSection'>
            <p className='heading-2'>Grades</p>
            <div className='my_grades'>
            {/* {GradesData.map((gradeObj) => console.log(gradeObj.grade_distribution.filter(grade => grade > 0)))} */}
                {GradesData.map((grade, index) => (
                <div className="grade_cell" id={index}>
                    <p id="title">{grade.course_code} - {grade.course}</p>
                    <RadarChart 
                        key={index} 
                        id={"chart-"+index} 
                        className="chart" 
                        chartData={{
                            labels: chartData.labels,  // Pass consistent labels
                            datasets: [chartData.datasets[index]]  // Pass the specific dataset for this grade
                        }} 
                        idx={index}>
                    </RadarChart>
                    <p id="subtitle_1">ECTS Credits {grade.credits} • Grade: {grade.grade}</p>
                </div>
                ))}
            </div>
        </div>
    );
    
}

export default GradeSection;